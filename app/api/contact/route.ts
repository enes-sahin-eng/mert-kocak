import nodemailer from "nodemailer";

// GEÇİCİ: backend hazır olana kadar iletişim formu doğrudan SMTP ile
// gönderiliyor. Backend bağlanınca bu route ve lib/contact.ts'teki
// ilgili kısım kaldırılıp forma tekrar backend kullandırılacak.
export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, phone, message } = body as {
    name: string;
    email: string;
    phone?: string;
    message: string;
  };

  if (!name || !email || !message) {
    return Response.json(
      { errors: { message: ["Ad, e-posta ve mesaj zorunludur."] } },
      { status: 422 },
    );
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.LEAD_TO_EMAIL,
      replyTo: email,
      subject: `[Mert Koçak Sitesi] Yeni İletişim Formu Mesajı — ${name}`,
      text: `Mert Koçak Sitesi - İletişim Formu\n\nAd Soyad: ${name}\nE-posta: ${email}\nTelefon: ${phone ?? "-"}\n\nMesaj:\n${message}`,
    });

    return Response.json({ message: "Mesajınız iletildi." });
  } catch {
    return Response.json(
      { message: "Mesaj gönderilemedi. Lütfen tekrar deneyin." },
      { status: 500 },
    );
  }
}

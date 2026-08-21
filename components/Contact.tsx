"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { z } from "zod";
import type { SiteSettings } from "@/lib/settings";
import { formatTrPhone, submitContact } from "@/lib/contact";
import { track } from "@/lib/tracking";

// Zod validation schema
const contactSchema = z.object({
  name: z.string().min(2, "İsim en az 2 karakter olmalı"),
  email: z.string().email("Geçerli bir e-posta adresi girin"),
  phone: z
    .string()
    .optional()
    .refine((v) => !v || /^0?5\d{9}$/.test(v), "Geçerli bir telefon girin (ör. 0532 332 32 32)"),
  message: z.string().min(10, "Mesaj en az 10 karakter olmalı"),
});

type ContactFormData = z.infer<typeof contactSchema>;
type FormErrors = Partial<Record<keyof ContactFormData, string>>;

const buildContactMethods = (settings: SiteSettings) => [
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
    label: "Telefon",
    value: settings.phone,
    href: `tel:${settings.phoneLink}`,
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
    label: "E-posta",
    value: settings.email,
    href: `mailto:${settings.email}`,
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    label: "Adres",
    value: settings.address,
    href: settings.mapUrl,
    external: true,
  },
];

const buildSocialLinks = (settings: SiteSettings) => [
  {
    name: "Instagram",
    href: settings.social.instagram,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    ),
  },
  // LinkedIn ikonu YouTube ile değiştirildi. backend "social.linkedin" alanı yayınlamaya
  // devam ediyor (bkz. lib/settings.ts), sadece burada gösterilmiyor.
  {
    name: "YouTube",
    href: settings.social.youtube,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22 8.2a3.5 3.5 0 0 0-2.46-2.48C17.7 5.2 12 5.2 12 5.2s-5.7 0-7.54.52A3.5 3.5 0 0 0 2 8.2 36.6 36.6 0 0 0 1.5 12a36.6 36.6 0 0 0 .5 3.8 3.5 3.5 0 0 0 2.46 2.48C6.3 18.8 12 18.8 12 18.8s5.7 0 7.54-.52A3.5 3.5 0 0 0 22 15.8 36.6 36.6 0 0 0 22.5 12a36.6 36.6 0 0 0-.5-3.8Z" />
        <path d="m10 9.8 5 2.2-5 2.2Z" />
      </svg>
    ),
  },
  {
    name: "WhatsApp",
    href: `https://wa.me/${settings.whatsapp}`,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
];

export default function Contact({ settings }: { settings: SiteSettings }) {
  const contactMethods = buildContactMethods(settings);
  const socialLinks = buildSocialLinks(settings);

  const containerRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const validateField = (field: keyof ContactFormData, value: string) => {
    try {
      const fieldSchema = contactSchema.shape[field];
      fieldSchema.parse(value);
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors((prev) => ({ ...prev, [field]: error.issues[0]?.message }));
      }
    }
  };

  const handleChange = (field: keyof ContactFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      validateField(field, value);
    }
  };

  // Telefon: ekranda maskelenir (0532 332 32 32), state'te yalnızca rakamlar tutulur.
  const handlePhoneChange = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 11);
    setFormData((prev) => ({ ...prev, phone: digits }));
    if (errors.phone) {
      validateField("phone", digits);
    }
  };

  const handleBlur = (field: keyof ContactFormData) => {
    validateField(field, formData[field] || "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    // Validate all fields
    const result = contactSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: FormErrors = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof ContactFormData;
        fieldErrors[field] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    const response = await submitContact({
      name: formData.name,
      email: formData.email,
      phone: formData.phone || undefined,
      message: formData.message,
    });
    setIsSubmitting(false);

    if (response.ok) {
      track("contact_form_submit", "contact_section");
      setIsSubmitted(true);
      return;
    }

    if (response.errors) {
      // Sunucu doğrulama hatalarını alanlara eşle
      const fieldErrors: FormErrors = {};
      (Object.keys(response.errors) as (keyof ContactFormData)[]).forEach((field) => {
        if (field in formData) {
          fieldErrors[field] = response.errors![field]?.[0];
        }
      });
      setErrors(fieldErrors);
    }
    setSubmitError(response.message ?? "Mesaj gönderilemedi. Lütfen tekrar deneyin.");
  };

  return (
    <section
      id="contact"
      ref={containerRef}
      className="relative min-h-screen bg-[#f5f3ef] overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          style={{ y }}
          className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full border border-primary/5"
        />
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], [50, -50]) }}
          className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full border border-primary/5"
        />
        <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-accent/30 rounded-full" />
        <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-accent/20 rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-24 md:py-32">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-16 md:mb-24"
        >
          <p className="text-accent text-sm tracking-[0.3em] uppercase mb-4">
            İletişim
          </p>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif text-primary mb-6">
            Birlikte <span className="italic">Başlayalım</span>
          </h2>
          <p className="text-primary/60 text-lg max-w-2xl mx-auto">
            İlk adımı atmak için buradayım. Sorularınız için bana ulaşın veya
            hemen randevu alın.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left side - Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            {/* Contact methods */}
            <div className="space-y-6 mb-12">
              {contactMethods.map((method, index) => (
                <motion.a
                  key={method.label}
                  href={method.href}
                  target={method.external ? "_blank" : undefined}
                  rel={method.external ? "noopener noreferrer" : undefined}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  whileHover={{ x: 10 }}
                  className="group flex items-center gap-6 p-6 rounded-2xl bg-white/50 border border-primary/5 hover:bg-white hover:border-accent/20 transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-full bg-primary/5 flex items-center justify-center text-primary group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                    {method.icon}
                  </div>
                  <div>
                    <p className="text-primary/50 text-sm mb-1">
                      {method.label}
                    </p>
                    <p className="text-primary font-medium text-lg">
                      {method.value}
                    </p>
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="ml-auto text-primary/30 group-hover:text-accent group-hover:translate-x-1 transition-all duration-300"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </motion.a>
              ))}
            </div>

            {/* Working hours */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="p-6 rounded-2xl bg-primary text-white mb-12"
            >
              <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                Çalışma Saatleri
              </h3>
              <div className="space-y-2 text-white/70">
                <div className="flex justify-between">
                  <span>Pazartesi - Cuma</span>
                  <span className="text-accent">09:00 - 20:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Cumartesi</span>
                  <span className="text-accent">10:00 - 16:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Pazar</span>
                  <span className="text-white/40">Kapalı</span>
                </div>
              </div>
            </motion.div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <p className="text-primary/50 text-sm mb-4">Sosyal Medya</p>
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      if (social.name === "WhatsApp") track("whatsapp_click", "contact_section");
                    }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 rounded-full bg-white border border-primary/10 flex items-center justify-center text-primary/60 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300"
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right side - Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl shadow-primary/5 border border-primary/5">
              <h3 className="text-2xl font-serif text-primary mb-2">
                Mesaj Gönderin
              </h3>
              <p className="text-primary/50 text-sm mb-8">
                En kısa sürede size dönüş yapacağım.
              </p>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-accent"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-serif text-primary mb-2">
                    Teşekkürler!
                  </h4>
                  <p className="text-primary/60">
                    Mesajınız alındı. En kısa sürede size dönüş yapacağım.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-primary/70 text-sm mb-2">
                        Adınız Soyadınız *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        onBlur={() => handleBlur("name")}
                        className={`w-full px-4 py-3 rounded-xl bg-primary/5 border ${
                          errors.name ? "border-red-400" : "border-transparent"
                        } focus:border-accent focus:bg-white outline-none transition-all duration-300 text-primary`}
                        placeholder="Adınız"
                      />
                      {errors.name && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.name}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-primary/70 text-sm mb-2">
                        Telefon
                      </label>
                      <input
                        type="tel"
                        inputMode="numeric"
                        value={formatTrPhone(formData.phone || "")}
                        onChange={(e) => handlePhoneChange(e.target.value)}
                        onBlur={() => handleBlur("phone")}
                        maxLength={14}
                        className={`w-full px-4 py-3 rounded-xl bg-primary/5 border ${
                          errors.phone ? "border-red-400" : "border-transparent"
                        } focus:border-accent focus:bg-white outline-none transition-all duration-300 text-primary`}
                        placeholder="0532 332 32 32"
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-primary/70 text-sm mb-2">
                      E-posta *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      onBlur={() => handleBlur("email")}
                      className={`w-full px-4 py-3 rounded-xl bg-primary/5 border ${
                        errors.email ? "border-red-400" : "border-transparent"
                      } focus:border-accent focus:bg-white outline-none transition-all duration-300 text-primary`}
                      placeholder="ornek@email.com"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-primary/70 text-sm mb-2">
                      Mesajınız *
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => handleChange("message", e.target.value)}
                      onBlur={() => handleBlur("message")}
                      className={`w-full px-4 py-3 rounded-xl bg-primary/5 border ${
                        errors.message ? "border-red-400" : "border-transparent"
                      } focus:border-accent focus:bg-white outline-none transition-all duration-300 text-primary resize-none`}
                      placeholder="Size nasıl yardımcı olabilirim?"
                    />
                    {errors.message && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {submitError && (
                    <p className="text-red-500 text-sm text-center -mt-2">
                      {submitError}
                    </p>
                  )}

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 bg-primary text-white font-medium rounded-xl hover:bg-accent transition-colors duration-300 flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                        />
                        Gönderiliyor...
                      </>
                    ) : (
                      <>
                        Gönder
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="22" x2="11" y1="2" y2="13" />
                          <polygon points="22 2 15 22 11 13 2 9 22 2" />
                        </svg>
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 border-t border-primary/10 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-primary/40 text-sm">
              © {new Date().getFullYear()} Mert Koçak. Tüm hakları saklıdır.
            </p>
            <div className="flex items-center gap-6 text-primary/40 text-sm">
              <a href="#" className="hover:text-primary transition-colors">
                Gizlilik Politikası
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Kullanım Şartları
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

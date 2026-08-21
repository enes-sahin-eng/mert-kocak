"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { z } from "zod";
import type { SiteSettings } from "@/lib/settings";
import { formatTrPhone, submitContact } from "@/lib/contact";
import { track } from "@/lib/tracking";

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

export default function FloatingActions({ settings }: { settings: SiteSettings }) {
  const whatsappHref = `https://wa.me/${settings.whatsapp}`;
  const phoneHref = `tel:${settings.phoneLink}`;
  const pathname = usePathname();
  // Blog yazı sayfalarında sağ altta ayrı bir "yukarı çık" butonu var (BlogDetailClient.tsx,
  // bottom-8 right-8, 56px). Üst üste binmemesi için orada bu kümeyi daha yukarı taşıyoruz.
  const isBlogPost = Boolean(pathname?.startsWith("/blog/"));
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const openModal = () => {
    track("info_cta_click", "floating");
    setIsModalOpen(true);
  };

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
      track("contact_form_submit", "floating_modal");
      setIsSubmitted(true);
      setTimeout(() => {
        setIsModalOpen(false);
        setIsSubmitted(false);
        setFormData({ name: "", email: "", phone: "", message: "" });
      }, 2500);
      return;
    }

    if (response.errors) {
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

  const closeModal = () => {
    setIsModalOpen(false);
    setIsSubmitted(false);
    setSubmitError(null);
    setFormData({ name: "", email: "", phone: "", message: "" });
    setErrors({});
  };

  return (
    <>
      {/* Floating buttons - right side, circular icon buttons with hover tooltips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        className={`fixed right-6 md:right-8 z-50 flex flex-col items-end gap-3 ${
          isBlogPost ? "bottom-28" : "bottom-8"
        }`}
      >
        {/* Telefon Et button. backend'de "phone_click" event tipi eklenirse
            track("phone_click", "floating") burada da çağrılabilir (bkz. lib/tracking.ts). */}
        <motion.a
          href={phoneHref}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Telefon Et"
          className="group relative w-14 h-14 rounded-full bg-primary shadow-lg shadow-primary/30 flex items-center justify-center"
        >
          <span className="pointer-events-none absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-white opacity-0 translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
            Hemen Ara
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
        </motion.a>

        {/* Bilgi Al button (form modal) */}
        <motion.button
          onClick={openModal}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Bilgi Al"
          className="group relative w-14 h-14 rounded-full bg-accent shadow-lg shadow-accent/30 flex items-center justify-center"
        >
          <span className="pointer-events-none absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-white opacity-0 translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
            Bilgi Al
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--primary)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </motion.button>

        {/* WhatsApp button - öncelikli kanal, nabız animasyonlu */}
        <motion.a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track("whatsapp_click", "floating")}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label="WhatsApp'tan Bilgi Al"
          className="group relative w-16 h-16 rounded-full bg-[#25D366] shadow-lg shadow-[#25D366]/40 flex items-center justify-center"
        >
          <motion.span
            aria-hidden="true"
            className="absolute inset-0 rounded-full bg-[#25D366]"
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
          <span className="pointer-events-none absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-white opacity-0 translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
            WhatsApp&apos;tan Bilgi Al
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            viewBox="0 0 24 24"
            className="relative fill-white"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </motion.a>
      </motion.div>

      {/* Contact Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="fixed inset-0 bg-primary/80 backdrop-blur-sm z-50"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-lg bg-white rounded-3xl shadow-2xl z-50 overflow-hidden max-h-[90vh] flex flex-col"
            >
              {/* Modal header */}
              <div className="relative bg-primary p-6 md:p-8">
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-white/20 hover:text-white transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" x2="6" y1="6" y2="18" />
                    <line x1="6" x2="18" y1="6" y2="18" />
                  </svg>
                </button>

                <div className="pr-10">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <p className="text-accent text-sm tracking-widest uppercase mb-2">
                      Hemen Başlayın
                    </p>
                    <h3 className="text-2xl md:text-3xl font-serif text-white">
                      Bilgi Alın
                    </h3>
                    <p className="text-white/60 text-sm mt-2">
                      Formu doldurun, size en kısa sürede dönüş yapalım.
                    </p>
                  </motion.div>
                </div>

                {/* Decorative element */}
                <div className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full border border-accent/20" />
              </div>

              {/* Modal body */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8">
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", delay: 0.2 }}
                      className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="40"
                        height="40"
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
                    </motion.div>
                    <h4 className="text-2xl font-serif text-primary mb-3">
                      Teşekkürler!
                    </h4>
                    <p className="text-primary/60">
                      Mesajınız başarıyla iletildi.
                      <br />
                      En kısa sürede size dönüş yapacağım.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 }}
                    >
                      <label className="block text-primary/70 text-sm mb-2 font-medium">
                        Adınız Soyadınız *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        onBlur={() => handleBlur("name")}
                        className={`w-full px-4 py-3.5 rounded-xl bg-primary/5 border-2 ${
                          errors.name
                            ? "border-red-400"
                            : "border-transparent focus:border-accent"
                        } focus:bg-white outline-none transition-all duration-300 text-primary`}
                        placeholder="Adınız Soyadınız"
                      />
                      {errors.name && (
                        <p className="text-red-500 text-xs mt-1.5">
                          {errors.name}
                        </p>
                      )}
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="grid grid-cols-2 gap-4"
                    >
                      <div>
                        <label className="block text-primary/70 text-sm mb-2 font-medium">
                          E-posta *
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            handleChange("email", e.target.value)
                          }
                          onBlur={() => handleBlur("email")}
                          className={`w-full px-4 py-3.5 rounded-xl bg-primary/5 border-2 ${
                            errors.email
                              ? "border-red-400"
                              : "border-transparent focus:border-accent"
                          } focus:bg-white outline-none transition-all duration-300 text-primary`}
                          placeholder="E-posta"
                        />
                        {errors.email && (
                          <p className="text-red-500 text-xs mt-1.5">
                            {errors.email}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-primary/70 text-sm mb-2 font-medium">
                          Telefon
                        </label>
                        <input
                          type="tel"
                          inputMode="numeric"
                          value={formatTrPhone(formData.phone || "")}
                          onChange={(e) => handlePhoneChange(e.target.value)}
                          onBlur={() => handleBlur("phone")}
                          maxLength={14}
                          className={`w-full px-4 py-3.5 rounded-xl bg-primary/5 border-2 ${
                            errors.phone
                              ? "border-red-400"
                              : "border-transparent focus:border-accent"
                          } focus:bg-white outline-none transition-all duration-300 text-primary`}
                          placeholder="0532 332 32 32"
                        />
                        {errors.phone && (
                          <p className="text-red-500 text-xs mt-1.5">
                            {errors.phone}
                          </p>
                        )}
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25 }}
                    >
                      <label className="block text-primary/70 text-sm mb-2 font-medium">
                        Mesajınız *
                      </label>
                      <textarea
                        rows={3}
                        value={formData.message}
                        onChange={(e) =>
                          handleChange("message", e.target.value)
                        }
                        onBlur={() => handleBlur("message")}
                        className={`w-full px-4 py-3.5 rounded-xl bg-primary/5 border-2 ${
                          errors.message
                            ? "border-red-400"
                            : "border-transparent focus:border-accent"
                        } focus:bg-white outline-none transition-all duration-300 text-primary resize-none`}
                        placeholder="Size nasıl yardımcı olabilirim?"
                      />
                      {errors.message && (
                        <p className="text-red-500 text-xs mt-1.5">
                          {errors.message}
                        </p>
                      )}
                    </motion.div>

                    {submitError && (
                      <p className="text-red-500 text-sm text-center">
                        {submitError}
                      </p>
                    )}

                    <motion.button
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-4 bg-gradient-to-r from-primary to-primary-light text-white font-medium rounded-xl hover:from-accent hover:to-[#b8954f] transition-all duration-500 flex items-center justify-center gap-2 disabled:opacity-70 shadow-lg shadow-primary/20"
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

                    {/* WhatsApp alternative */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="text-center pt-2"
                    >
                      <p className="text-primary/60 text-sm mb-3">
                        veya hızlı iletişim için
                      </p>
                      <a
                        href={whatsappHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => track("whatsapp_click", "floating_modal")}
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#25D366]/10 text-[#25D366] rounded-full hover:bg-[#25D366] hover:text-white transition-colors duration-300 font-medium text-sm"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                        WhatsApp ile Yazın
                      </a>
                    </motion.div>
                  </form>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

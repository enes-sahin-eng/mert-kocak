import type { TherapyNotice as TherapyNoticeType } from "@/lib/therapy/types";

/**
 * Sayfa içi bilgilendirme bloğu. Bilerek başlık etiketi (h2/h3) kullanmıyoruz;
 * bu blok içerik hiyerarşisinin bir parçası değil, yardımcı bir uyarıdır.
 */
export default function TherapyNotice({ notice }: { notice: TherapyNoticeType }) {
  return (
    <section className="bg-[#f5f3ef] px-6 md:px-8 pb-20 md:pb-28">
      <div className="max-w-3xl mx-auto">
        <aside
          role="note"
          className="border-l-2 border-accent bg-white/60 rounded-r-2xl px-6 py-5 md:px-8 md:py-6"
        >
          <p className="text-primary font-medium text-base mb-2">{notice.title}</p>
          <p className="text-primary/60 text-sm md:text-base leading-relaxed">
            {notice.text}
          </p>
        </aside>
      </div>
    </section>
  );
}

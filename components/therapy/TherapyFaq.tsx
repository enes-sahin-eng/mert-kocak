import Link from "next/link";
import type { TherapyFaqItem } from "@/lib/therapy/types";

export default function TherapyFaq({ items }: { items: TherapyFaqItem[] }) {
  return (
    <section className="bg-[#f5f3ef] px-6 md:px-8 py-20 md:py-28">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-serif text-primary text-center mb-14">
          Sıkça Sorulan Sorular
        </h2>
        <div className="space-y-4">
          {items.map((item) => (
            <details
              key={item.question}
              className="group rounded-2xl bg-white/60 border border-primary/5 p-6 open:pb-6"
            >
              <summary className="flex items-center justify-between gap-4 cursor-pointer list-none">
                <h3 className="text-primary font-medium text-base md:text-lg">
                  {item.question}
                </h3>
                <span className="text-accent text-xl leading-none flex-shrink-0 group-open:rotate-45 transition-transform">
                  +
                </span>
              </summary>
              <p className="text-primary/60 text-sm md:text-base leading-relaxed mt-4">
                {item.answer}{" "}
                {item.link && (
                  <Link
                    href={item.link.href}
                    className="text-accent underline underline-offset-2 hover:text-primary transition-colors"
                  >
                    {item.link.text}
                  </Link>
                )}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

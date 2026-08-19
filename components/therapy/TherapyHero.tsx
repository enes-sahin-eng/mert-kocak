export default function TherapyHero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  return (
    <section className="bg-primary px-6 md:px-8 pt-40 pb-20 md:pt-48 md:pb-28">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-accent text-xs md:text-sm tracking-[0.3em] uppercase mb-5">
          {eyebrow}
        </p>
        <h1 className="text-4xl md:text-6xl font-serif text-white leading-tight mb-6">
          {title}
        </h1>
        <p className="text-white/60 text-base md:text-lg leading-relaxed">
          {subtitle}
        </p>
        <a
          href="#contact"
          className="mt-10 inline-block px-8 py-4 bg-white text-primary text-sm font-medium tracking-widest uppercase rounded-full hover:bg-accent transition-colors"
        >
          Randevu Al
        </a>
      </div>
    </section>
  );
}

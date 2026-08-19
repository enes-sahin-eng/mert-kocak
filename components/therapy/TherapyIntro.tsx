export default function TherapyIntro({
  heading,
  paragraphs,
}: {
  heading: string;
  paragraphs: string[];
}) {
  return (
    <section className="bg-[#f5f3ef] px-6 md:px-8 py-20 md:py-28">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-serif text-primary mb-8">
          {heading}
        </h2>
        <div className="space-y-5 text-primary/70 text-base md:text-lg leading-relaxed">
          {paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
}

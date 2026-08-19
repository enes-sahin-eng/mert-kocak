import type { TherapyFeature } from "@/lib/therapy/types";

export default function TherapyFeatures({
  heading,
  features,
}: {
  heading: string;
  features: TherapyFeature[];
}) {
  return (
    <section className="bg-primary px-6 md:px-8 py-20 md:py-28">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-serif text-white text-center mb-14">
          {heading}
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="p-6 rounded-2xl bg-white/5 border border-white/10"
            >
              <p className="text-accent font-serif text-2xl italic mb-3">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="text-white font-medium text-lg mb-2">
                {feature.title}
              </h3>
              <p className="text-white/60 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import type { TherapyProcessStep } from "@/lib/therapy/types";

export default function TherapyProcess({
  heading,
  steps,
}: {
  heading: string;
  steps: TherapyProcessStep[];
}) {
  return (
    <section className="bg-[#f5f3ef] px-6 md:px-8 py-20 md:py-28">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-serif text-primary text-center mb-14">
          {heading}
        </h2>
        <div className="space-y-6">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-8 p-6 rounded-2xl bg-white/60 border border-primary/5"
            >
              <p className="text-accent-ink font-serif text-3xl italic flex-shrink-0">
                {String(index + 1).padStart(2, "0")}
              </p>
              <div>
                <h3 className="text-primary font-medium text-lg mb-1">
                  {step.title}
                </h3>
                <p className="text-primary/60 text-sm md:text-base leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { getWorks } from "@/lib/works";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import WorksGallery from "./WorksGallery";

export default async function Works() {
  const works = await getWorks();
  const isEmpty = works.length === 0;

  return (
    <section id="works" className="border-y border-line bg-cream-2">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <SectionHeading
          label="Галерея"
          title="Наши работы"
          subtitle={
            isEmpty
              ? "Результаты, которыми гордимся. Скоро здесь появятся фотографии до и после."
              : "Результаты, которыми гордимся."
          }
        />

        {isEmpty ? (
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Reveal key={i} delay={i * 60}>
                <div className="flex aspect-square items-center justify-center rounded-2xl border border-dashed border-line bg-cream transition-colors duration-300 hover:border-gold">
                  <span className="text-xs uppercase tracking-[0.2em] text-ink-soft/60">
                    Скоро
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        ) : (
          <WorksGallery works={works} />
        )}
      </div>
    </section>
  );
}

import { reviews } from "@/data/reviews";
import { site } from "@/data/site";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

const fmtRating = (n: number) => n.toFixed(1).replace(".", ",");

function Stars({ rating = 5 }: { rating?: number }) {
  const rounded = Math.round(rating);
  return (
    <div className="flex gap-0.5 text-gold" aria-label={`Оценка ${rating} из 5`}>
      {[0, 1, 2, 3, 4].map((n) => (
        <svg
          key={n}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill={n + 1 <= rounded ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden
        >
          <path d="M12 2.5l2.9 5.88 6.49.94-4.7 4.58 1.11 6.46L12 17.9l-5.8 3.05 1.1-6.46-4.69-4.58 6.49-.94L12 2.5z" />
        </svg>
      ))}
    </div>
  );
}

/** Бейдж-ссылка на отзывы платформы (Яндекс / 2ГИС). */
function PlatformBadge({
  label,
  rating,
  count,
  href,
}: {
  label: string;
  rating: number;
  count: number;
  href: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center justify-between gap-4 rounded-2xl border border-line bg-cream-2 px-5 py-4 transition duration-300 hover:-translate-y-0.5 hover:border-gold/60"
    >
      <div className="flex items-center gap-4">
        <span className="font-display text-3xl tabular-nums text-ink">
          {fmtRating(rating)}
        </span>
        <div>
          <p className="text-sm font-medium text-ink">{label}</p>
          <Stars rating={rating} />
        </div>
      </div>
      <div className="text-right">
        <p className="text-sm text-ink-soft">{count} оценок</p>
        <p className="text-sm text-gold transition-colors group-hover:text-[#a8763d]">
          Смотреть →
        </p>
      </div>
    </a>
  );
}

export default function Reviews() {
  const { yandex, gis } = site.maps;
  const hasPicked = reviews.length > 0;

  return (
    <section id="reviews" className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
      <SectionHeading
        label="Отзывы"
        title="Что говорят клиенты"
        subtitle="Реальные отзывы и оценки с Яндекс.Карт и 2ГИС."
      />

      <div className="mt-12 grid items-start gap-6 lg:grid-cols-2">
        {/* Бейджи платформ */}
        <Reveal>
          <div className="flex flex-col gap-4">
            <PlatformBadge
              label="Яндекс Карты"
              rating={yandex.rating}
              count={yandex.count}
              href={yandex.url}
            />
            <PlatformBadge
              label="2ГИС"
              rating={gis.rating}
              count={gis.count}
              href={gis.url}
            />
            <p className="mt-1 text-sm leading-relaxed text-ink-soft">
              Будем рады вашему отзыву — он помогает другим выбрать нас. Оставить
              отзыв можно прямо на{" "}
              <a
                href={yandex.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold underline-offset-2 hover:underline"
              >
                Яндекс.Картах
              </a>{" "}
              или в{" "}
              <a
                href={gis.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold underline-offset-2 hover:underline"
              >
                2ГИС
              </a>
              .
            </p>
          </div>
        </Reveal>

        {/* Живой виджет отзывов Яндекс.Карт */}
        <Reveal delay={120}>
          <div className="overflow-hidden rounded-2xl border border-line bg-white">
            <iframe
              title="Отзывы о салоне «Трогательно» на Яндекс.Картах"
              src={`https://yandex.ru/maps-reviews-widget/${yandex.orgId}?comments`}
              className="h-[460px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Reveal>
      </div>

      {/* Отобранные отзывы (если добавим вручную / через Supabase в фазе 2) */}
      {hasPicked && (
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r, i) => (
            <Reveal key={r.id} delay={i * 80}>
              <figure className="flex h-full flex-col rounded-2xl border border-line bg-cream-2 p-6 transition duration-300 hover:-translate-y-1 hover:border-gold/60">
                <Stars rating={r.rating ?? 5} />
                <blockquote className="mt-4 flex-1 leading-relaxed text-ink">
                  {r.text}
                </blockquote>
                <figcaption className="mt-5 text-sm text-ink-soft">
                  {r.author}
                  {r.date ? ` · ${r.date}` : ""}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      )}
    </section>
  );
}

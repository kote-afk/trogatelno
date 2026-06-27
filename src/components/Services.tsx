"use client";

import { useState } from "react";
import { services } from "@/data/services";
import { site } from "@/data/site";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

const fmt = (n: number) => new Intl.NumberFormat("ru-RU").format(n);

// Приоритет вывода категорий. Slug'и из начала списка идут первыми,
// остальные — в исходном порядке. Меняется без правки данных прайса.
const categoryOrder = [
  "apparatus", // Аппаратный массаж
  "manual", // Ручной массаж
  "cosmetology", // Косметология
  "nails", // Ногтевой сервис
  "laser", // Лазерная эпиляция
];
const rank = (slug: string) => {
  const i = categoryOrder.indexOf(slug);
  return i === -1 ? categoryOrder.length : i;
};
const orderedServices = [...services].sort((a, b) => rank(a.slug) - rank(b.slug));

export default function Services() {
  const [active, setActive] = useState(orderedServices[0].slug);
  const category =
    orderedServices.find((c) => c.slug === active) ?? orderedServices[0];

  return (
    <section id="services" className="mx-auto max-w-6xl px-5 pb-20 pt-8 sm:px-8 sm:pb-28 sm:pt-12">
      <SectionHeading
        label="Прайс"
        title="Услуги и цены"
        subtitle="Выберите категорию."
      />

      {/* Категории */}
      <Reveal>
        <div
          role="tablist"
          aria-label="Категории услуг"
          className="mt-10 flex flex-wrap justify-center gap-2"
        >
          {orderedServices.map((c) => {
            const selected = c.slug === active;
            return (
              <button
                key={c.slug}
                role="tab"
                aria-selected={selected}
                onClick={() => setActive(c.slug)}
                className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                  selected
                    ? "border-gold bg-gold text-white"
                    : "border-line bg-cream-2 text-ink-soft hover:border-gold hover:text-ink"
                }`}
              >
                {c.title}
              </button>
            );
          })}
        </div>
      </Reveal>

      {/* Прайс активной категории */}
      <Reveal variant="up">
        <div className="mx-auto mt-10 max-w-3xl overflow-hidden rounded-2xl border border-line bg-cream-2 shadow-[0_18px_50px_-30px_rgba(42,47,80,0.35)]">
          <ul key={category.slug}>
            {category.items.map((item, i) => (
              <li
                key={item.name}
                style={{ animationDelay: `${i * 35}ms` }}
                className={`group animate-fade-in flex items-start justify-between gap-6 px-5 py-4 transition-colors hover:bg-[#f3ead9] sm:px-7 ${
                  i !== 0 ? "border-t border-line" : ""
                }`}
              >
                <div className="min-w-0">
                  <p className="text-ink">{item.name}</p>
                  {item.note && (
                    <p className="mt-0.5 text-sm text-ink-soft">{item.note}</p>
                  )}
                </div>
                <div className="shrink-0 text-right">
                  <p className="font-display text-lg tabular-nums text-ink transition-colors group-hover:text-gold">
                    {fmt(item.price)} ₽
                  </p>
                  {item.duration && (
                    <p className="mt-0.5 text-sm tabular-nums text-ink-soft">
                      {item.duration}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      {category.extra && (
        <Reveal variant="up">
          <div className="mx-auto mt-6 max-w-3xl overflow-hidden rounded-2xl border border-line bg-cream-2 shadow-[0_18px_50px_-30px_rgba(42,47,80,0.35)]">
            <div className="border-b border-line px-5 py-4 sm:px-7">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-gold">
                {category.extra.title}
              </p>
            </div>
            <ul>
              {category.extra.items.map((item, i) => (
                <li
                  key={item.name}
                  className={`flex items-start justify-between gap-6 px-5 py-4 transition-colors hover:bg-[#f3ead9] sm:px-7 ${
                    i !== 0 ? "border-t border-line" : ""
                  }`}
                >
                  <div className="min-w-0">
                    <p className="text-ink">{item.name}</p>
                    {item.note && (
                      <p className="mt-0.5 text-sm text-ink-soft">{item.note}</p>
                    )}
                  </div>
                  <p className="shrink-0 font-display text-lg tabular-nums text-ink">
                    {fmt(item.price)} ₽
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      )}

      {category.promo && (
        <Reveal variant="up">
          <div className="mx-auto mt-6 max-w-3xl rounded-2xl border-2 border-gold/40 bg-gold/[0.06] p-5 sm:p-7">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-gold px-3 py-1 text-xs font-medium uppercase tracking-wider text-white">
                Акция
              </span>
              <p className="font-display text-lg text-ink">
                {category.promo.title}
              </p>
            </div>
            <ul className="mt-4 divide-y divide-gold/20">
              {category.promo.items.map((item) => (
                <li
                  key={item.name}
                  className="flex items-start justify-between gap-6 py-3"
                >
                  <p className="min-w-0 text-ink">{item.name}</p>
                  <div className="shrink-0 text-right">
                    <p className="font-display text-lg tabular-nums text-gold">
                      {fmt(item.price)} ₽
                    </p>
                    {item.duration && (
                      <p className="mt-0.5 text-sm tabular-nums text-ink-soft">
                        {item.duration}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
            {category.promo.note && (
              <p className="mt-3 text-sm text-ink-soft">
                * {category.promo.note}
              </p>
            )}
          </div>
        </Reveal>
      )}

      <Reveal>
        <div className="mt-10 text-center">
          <a
            href="#contacts"
            className="inline-flex rounded-full bg-gold px-7 py-3.5 text-sm font-medium text-white transition-colors hover:bg-[#a8763d]"
          >
            Записаться на услугу
          </a>
          <p className="mt-3 text-sm text-ink-soft">
            Запись через Telegram, WhatsApp или по телефону {site.phone}
          </p>
        </div>
      </Reveal>
    </section>
  );
}

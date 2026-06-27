"use client";

import { useState } from "react";
import Image from "next/image";
import type { Work } from "@/data/works";
import Reveal from "./Reveal";

const INITIAL = 3;

export default function WorksGallery({ works }: { works: Work[] }) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? works : works.slice(0, INITIAL);
  const hidden = works.length - INITIAL;

  return (
    <>
      <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6">
        {visible.map((w, i) => (
          <Reveal key={w.id} delay={(i % INITIAL) * 60}>
            <figure className="group relative aspect-square overflow-hidden rounded-2xl border border-line bg-cream transition duration-500 hover:-translate-y-1.5 hover:shadow-[0_24px_50px_-28px_rgba(42,47,80,0.4)]">
              <Image
                src={w.image}
                alt={w.title ?? "Работа салона Трогательно"}
                fill
                unoptimized
                sizes="(max-width: 640px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {w.title && (
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/70 to-transparent p-4 text-sm text-white">
                  {w.title}
                </figcaption>
              )}
            </figure>
          </Reveal>
        ))}
      </div>

      {hidden > 0 && (
        <div className="mt-10 text-center">
          <button
            onClick={() => setExpanded((v) => !v)}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-cream px-7 py-3 text-sm font-medium text-ink-soft transition-colors hover:border-gold hover:text-ink"
          >
            {expanded ? "Свернуть" : `Показать ещё (${hidden})`}
          </button>
        </div>
      )}
    </>
  );
}

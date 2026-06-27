import Image from "next/image";
import { site } from "@/data/site";
import Reveal from "./Reveal";
import WordReveal from "./WordReveal";
import BookingButtons from "./BookingButtons";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[92vh] flex-col items-center justify-center px-5 py-20 text-center sm:px-8"
      style={{
        background:
          "radial-gradient(45% 42% at 18% 28%, rgba(216,184,136,0.26), transparent 72%), radial-gradient(44% 42% at 86% 72%, rgba(255,255,255,0.55), transparent 74%)",
      }}
    >
      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center">
        <Reveal variant="scale">
          <Image
            src="/logo.svg"
            alt="Трогательно — салон красоты"
            width={360}
            height={368}
            priority
            unoptimized
            className="float-soft h-auto w-[clamp(200px,42vw,340px)]"
          />
        </Reveal>

        <Reveal delay={150}>
          <p className="mt-4 text-xs font-medium uppercase tracking-[0.25em] text-gold">
            {site.tagline} · {site.city}
          </p>
        </Reveal>

        <WordReveal
          text="Красота, к которой хочется прикоснуться"
          delay={250}
          stagger={85}
          className="mt-6 max-w-3xl font-display text-4xl leading-[1.12] text-ink sm:text-5xl md:text-6xl"
        />

        <Reveal variant="blur" delay={500}>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
            Лазерная эпиляция, косметология, массаж и ногтевой сервис. Бережно к
            вам и вашему времени — в уютном пространстве в центре Новосибирска.
          </p>
        </Reveal>

        <Reveal delay={620}>
          <div className="mt-9 flex flex-col items-center gap-5">
            <BookingButtons />
            <a
              href="#services"
              className="text-sm text-ink-soft transition-colors hover:text-ink"
            >
              Услуги и цены ↓
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

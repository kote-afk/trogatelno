import Reveal from "./Reveal";

type Props = {
  label: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
};

export default function SectionHeading({
  label,
  title,
  subtitle,
  align = "center",
}: Props) {
  const centered = align === "center";
  return (
    <Reveal variant="blur">
      <div className={centered ? "text-center" : "text-left"}>
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-gold">
          {label}
        </p>
        <span
          className={`draw-line mt-3 block h-[2px] w-12 rounded-full bg-gold ${
            centered ? "mx-auto" : ""
          }`}
          style={{ transformOrigin: centered ? "center" : "left center" }}
          aria-hidden
        />
        <h2 className="mt-4 font-display text-3xl leading-tight text-ink sm:text-4xl">
          {title}
        </h2>
        {subtitle && (
          <p
            className={`mt-4 text-ink-soft ${
              centered ? "mx-auto max-w-xl" : "max-w-xl"
            }`}
          >
            {subtitle}
          </p>
        )}
      </div>
    </Reveal>
  );
}

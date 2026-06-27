import { site } from "@/data/site";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line bg-cream">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-12 sm:flex-row sm:items-end sm:justify-between sm:px-8">
        <div>
          <p className="font-display text-2xl text-ink">{site.name}</p>
          <p className="mt-1 text-sm text-ink-soft">
            {site.tagline} · {site.city}, {site.address}
          </p>
        </div>
        <nav className="flex flex-wrap gap-5 text-sm text-ink-soft">
          <a
            href={site.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-gold"
          >
            Telegram
          </a>
          <a
            href={site.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-gold"
          >
            WhatsApp
          </a>
          <a
            href={site.max}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-gold"
          >
            MAX
          </a>
          <a
            href={site.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-gold"
          >
            Instagram
          </a>
          <a
            href={site.vk}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-gold"
          >
            VK
          </a>
          <a
            href={site.phoneHref}
            className="transition-colors hover:text-gold"
          >
            {site.phone}
          </a>
        </nav>
      </div>
      <div className="border-t border-line/70">
        <div className="mx-auto max-w-6xl px-5 py-5 text-xs text-ink-soft sm:px-8">
          © {year} {site.name}. Все права защищены.
        </div>
      </div>
    </footer>
  );
}

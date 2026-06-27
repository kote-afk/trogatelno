const nav = [
  { label: "Услуги", href: "#services" },
  { label: "Работы", href: "#works" },
  { label: "Отзывы", href: "#reviews" },
  { label: "Контакты", href: "#contacts" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-cream/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <a
          href="#top"
          className="font-display text-2xl leading-none tracking-wide text-ink"
        >
          Трогательно
        </a>

        <nav aria-label="Основная навигация" className="hidden lg:block">
          <ul className="flex items-center gap-8 text-sm text-ink-soft">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="transition-colors hover:text-ink"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a
          href="#contacts"
          className="rounded-full bg-gold px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#a8763d]"
        >
          Записаться
        </a>
      </div>
    </header>
  );
}

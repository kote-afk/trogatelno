import { site } from "@/data/site";
import { TelegramIcon, WhatsAppIcon, MaxIcon, PhoneIcon } from "./icons";

type Props = { variant?: "solid" | "soft" };

/** Быстрые каналы записи: Telegram / WhatsApp / телефон. */
export default function BookingButtons({ variant = "solid" }: Props) {
  const base =
    "inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition-colors";

  return (
    <div className="flex flex-wrap gap-3">
      <a
        href={site.telegram}
        target="_blank"
        rel="noopener noreferrer"
        className={`${base} bg-gold text-white hover:bg-[#a8763d]`}
      >
        <TelegramIcon className="h-4 w-4" />
        Telegram
      </a>
      <a
        href={site.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className={`${base} ${
          variant === "solid"
            ? "border border-line bg-cream-2 text-ink hover:border-gold"
            : "border border-line bg-white text-ink hover:border-gold"
        }`}
      >
        <WhatsAppIcon className="h-4 w-4 text-gold" />
        WhatsApp
      </a>
      <a
        href={site.max}
        target="_blank"
        rel="noopener noreferrer"
        className={`${base} border border-line ${
          variant === "solid" ? "bg-cream-2" : "bg-white"
        } text-ink hover:border-gold`}
      >
        <MaxIcon className="h-4 w-4 text-gold" />
        MAX
      </a>
      <a
        href={site.phoneHref}
        className={`${base} border border-line ${
          variant === "solid" ? "bg-cream-2" : "bg-white"
        } text-ink hover:border-gold`}
      >
        <PhoneIcon className="h-4 w-4 text-gold" />
        Позвонить
      </a>
    </div>
  );
}

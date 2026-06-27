import { site } from "@/data/site";
import SectionHeading from "./SectionHeading";
import BookingButtons from "./BookingButtons";
import Reveal from "./Reveal";
import { PinIcon, ClockIcon, PhoneIcon, InstagramIcon, VkIcon } from "./icons";

const mapQuery = encodeURIComponent(`Новосибирск, ${site.address}`);

export default function Contacts() {
  return (
    <section id="contacts" className="border-t border-line bg-cream-2">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <SectionHeading
          label="Контакты"
          title="Запишитесь к нам"
          subtitle="Ответим на вопросы и подберём удобное время. Пишите в мессенджеры или звоните."
        />

        <div className="mt-12 grid items-start gap-8 lg:grid-cols-2">
          <Reveal>
            <div className="flex flex-col gap-6">
              <div className="flex items-start gap-4">
                <span className="mt-0.5 text-gold">
                  <PinIcon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm text-ink-soft">Адрес</p>
                  <p className="text-lg text-ink">
                    {site.city}, {site.address}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="mt-0.5 text-gold">
                  <ClockIcon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm text-ink-soft">Часы работы</p>
                  {/* TODO(client): уточнить часы работы. */}
                  <p className="text-lg text-ink">Ежедневно, 9:00 — 21:00</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="mt-0.5 text-gold">
                  <PhoneIcon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm text-ink-soft">Телефон</p>
                  <a
                    href={site.phoneHref}
                    className="text-lg text-ink transition-colors hover:text-gold"
                  >
                    {site.phone}
                  </a>
                </div>
              </div>

              <div className="pt-2">
                <p className="mb-3 text-sm text-ink-soft">Записаться</p>
                <BookingButtons variant="soft" />
              </div>

              <div>
                <p className="mb-3 text-sm text-ink-soft">Мы в соцсетях</p>
                <div className="flex gap-3">
                  <a
                    href={site.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-gold transition-colors hover:border-gold"
                  >
                    <InstagramIcon className="h-5 w-5" />
                  </a>
                  <a
                    href={site.vk}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="ВКонтакте"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-gold transition-colors hover:border-gold"
                  >
                    <VkIcon className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="overflow-hidden rounded-2xl border border-line">
              <iframe
                title={`Карта: ${site.city}, ${site.address}`}
                src={`https://yandex.ru/map-widget/v1/?text=${mapQuery}&z=16`}
                className="h-[340px] w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

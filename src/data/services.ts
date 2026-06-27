// ============================================================
// Прайс салона «Трогательно». Один источник правды для блока услуг.
// Позже легко заменить на загрузку из Supabase (та же форма данных).
// Цены «от» (from: true) — кроме абонементов с фиксированной ценой.
// ============================================================

export type ServiceItem = {
  name: string;
  /** Цена в рублях. */
  price: number;
  /** true → показывать «от». По умолчанию true. */
  from?: boolean;
  /** Длительность, напр. "45 мин" / "1 ч 30 мин". */
  duration?: string;
  /** Доп. подпись, напр. "1 220 ₽ / сеанс". */
  note?: string;
};

export type Promo = {
  title: string;
  items: ServiceItem[];
  note?: string;
};

export type ServiceCategory = {
  slug: string;
  title: string;
  items: ServiceItem[];
  /** Акционный блок (выделяется в UI). */
  promo?: Promo;
  /** Доп. подраздел внутри категории, напр. «Абонементы». */
  extra?: { title: string; items: ServiceItem[] };
};

export const services: ServiceCategory[] = [
  {
    slug: "smile",
    title: "Красота улыбки",
    items: [{ name: "Отбеливание зубов", price: 1600, duration: "45 мин" }],
  },
  {
    slug: "laser",
    title: "Лазерная эпиляция",
    items: [
      { name: "Глубокое бикини", price: 2200, duration: "30 мин" },
      { name: "Классическое бикини", price: 1500, duration: "20 мин" },
      // TODO(client): на карточке «от 80» — вероятно опечатка, поставлено 800. Подтвердить.
      { name: "Подмышки", price: 800, duration: "15 мин" },
      { name: "Голени + колени", price: 2000, duration: "40 мин" },
      { name: "Бёдра", price: 1800, duration: "30 мин" },
      { name: "Ноги полностью", price: 3500, duration: "1 ч" },
      { name: "Руки полностью", price: 2200, duration: "40 мин" },
      { name: "Предплечье", price: 1200, duration: "20 мин" },
      { name: "Плечи", price: 1200, duration: "20 мин" },
      { name: "Верхняя губа", price: 500, duration: "10 мин" },
      { name: "Подбородок / щёки / оконтовка бороды по шее", price: 600, duration: "15 мин" },
      { name: "Белая линия живота", price: 600, duration: "10 мин" },
      { name: "Живот полностью", price: 1000, duration: "25 мин" },
      { name: "Ягодицы", price: 1200, duration: "25 мин" },
    ],
    promo: {
      title: "Для новых клиентов — акция",
      items: [
        { name: "3 зоны", price: 1500, duration: "1 ч" },
        {
          name: "Подмышки + предплечье / верхняя губа / белая линия живота",
          price: 1000,
          duration: "40 мин",
        },
      ],
      note: "После акции цены стандартные",
    },
  },
  {
    slug: "presso",
    title: "Прессотерапия",
    items: [{ name: "Прессотерапия всего тела", price: 600, duration: "30 мин" }],
  },
  {
    slug: "wax",
    title: "Депиляция воском / сахаром",
    items: [
      { name: "Подмышечные впадины", price: 350, duration: "30 мин" },
      { name: "Руки", price: 300, duration: "45 мин" },
      { name: "Живот", price: 200, duration: "45 мин" },
      { name: "Бикини", price: 650, duration: "1 ч" },
      { name: "Ножки", price: 600, duration: "40 мин" },
      { name: "Задняя часть туловища", price: 300, duration: "50 мин" },
      { name: "Лицо", price: 200, duration: "30 мин" },
      { name: "Подмышки + классическое бикини", price: 900, duration: "1 ч 20 мин" },
      { name: "Подмышки + глубокое (тотальное) бикини", price: 1300, duration: "1 ч 30 мин" },
      { name: "Подмышки + классическое бикини + голень", price: 1500, duration: "1 ч 40 мин" },
      { name: "Подмышки + глубокое бикини + голень", price: 1800, duration: "1 ч 40 мин" },
      { name: "Подмышки + классическое бикини + ноги полностью", price: 2000, duration: "2 ч" },
      { name: "Подмышки + глубокое бикини + ноги полностью", price: 2400, duration: "2 ч 10 мин" },
    ],
  },
  {
    slug: "cosmetology",
    title: "Косметология",
    items: [
      { name: "Ручной буккальный массаж лица", price: 2500, duration: "45 мин" },
      { name: "Ручной массаж лица (пробный)", price: 2000, duration: "1 ч" },
      { name: "Ручной массаж лица (разовый)", price: 2500, duration: "1 ч" },
      { name: "Карбокси аппаратная (деликатная)", price: 2500, duration: "1 ч" },
      { name: "Чистка лица комбинированная", price: 3200, duration: "1 ч 30 мин" },
    ],
  },
  {
    slug: "apparatus",
    title: "Аппаратный массаж",
    items: [
      { name: "Массаж тела LPG (пробный, 30 мин)", price: 1000, duration: "30 мин" },
      { name: "Массаж тела LPG (разовый, 35 мин)", price: 1350, duration: "35 мин" },
      { name: "Массаж тела LPG (разовый, 45 мин)", price: 1650, duration: "45 мин" },
      { name: "Массаж лица LPG (пробный, 20 мин)", price: 900, duration: "20 мин" },
      { name: "Массаж лица LPG (разовый, 25 мин)", price: 1100, duration: "25 мин" },
      { name: "TURBO-массаж (пробный)", price: 1100, duration: "35 мин" },
      { name: "TURBO-массаж (разовый)", price: 1400, duration: "45 мин" },
      { name: "Горячий вакуум", price: 600, duration: "30 мин" },
      { name: "Паук (банки классические)", price: 500, duration: "30 мин" },
      { name: "Банки вибро-фотон", price: 300, duration: "30 мин" },
      { name: "Кавитация (1 зона)", price: 700, duration: "30 мин" },
      { name: "Скетч-массаж (пробный)", price: 1000, duration: "45 мин" },
      { name: "Скетч-массаж (разовый)", price: 1400, duration: "45 мин" },
    ],
    extra: {
      title: "Абонементы",
      items: [
        { name: "LPG тела 35 мин · 5 сеансов", price: 6100, note: "1 220 ₽ / сеанс" },
        { name: "LPG тела 35 мин · 10 сеансов", price: 11500, note: "1 150 ₽ / сеанс" },
        { name: "LPG тела 45 мин · 5 сеансов", price: 7450, note: "1 490 ₽ / сеанс" },
        { name: "LPG тела 45 мин · 10 сеансов", price: 14000, note: "1 400 ₽ / сеанс" },
        { name: "LPG лица 25 мин · 5 сеансов", price: 5000, note: "1 000 ₽ / сеанс" },
        { name: "LPG лица 25 мин · 10 сеансов", price: 9000, note: "900 ₽ / сеанс" },
        { name: "TURBO 45 мин · 5 сеансов", price: 6500, note: "1 300 ₽ / сеанс" },
        { name: "TURBO 45 мин · 10 сеансов", price: 12000, note: "1 200 ₽ / сеанс" },
        { name: "Скетч 45 мин · 5 сеансов", price: 6500, note: "1 300 ₽ / сеанс" },
        { name: "Скетч 45 мин · 10 сеансов", price: 12000, note: "1 200 ₽ / сеанс" },
      ],
    },
  },
  {
    slug: "rf",
    title: "RF-лифтинг (безыгольчатый)",
    items: [
      { name: "Лицо + шея + декольте", price: 1500, duration: "50 мин" },
      { name: "Лицо + шея", price: 950, duration: "35 мин" },
      { name: "Шея + декольте", price: 1100, duration: "35 мин" },
      { name: "Тело", price: 1500, duration: "30 мин" },
    ],
  },
  {
    slug: "manual",
    title: "Ручной массаж",
    items: [
      { name: "Общий массаж (пробный)", price: 2000, duration: "1 ч" },
      { name: "Общий массаж (разовый)", price: 2500, duration: "1 ч" },
      { name: "Массаж ШВЗ (пробный)", price: 1900, duration: "45 мин" },
      { name: "Массаж ШВЗ (разовый)", price: 2200, duration: "45 мин" },
      { name: "Массаж антицеллюлитный", price: 1700, duration: "30 мин" },
    ],
  },
  {
    slug: "nails",
    title: "Ногтевой сервис",
    items: [
      { name: "Маникюр с укреплением ногтевой пластины", price: 2500, duration: "1 ч" },
      { name: "Наращивание ногтей", price: 4000, duration: "1 ч 30 мин" },
      { name: "Гигиенический маникюр", price: 1000, duration: "40 мин" },
      { name: "Маникюр мужской гигиенический", price: 1200, duration: "1 ч" },
      { name: "Педикюр без покрытия", price: 2500, duration: "40 мин" },
      { name: "Педикюр частичный", price: 2500, duration: "40 мин" },
      { name: "Педикюр с покрытием", price: 3000, duration: "1 ч 20 мин" },
    ],
  },
];

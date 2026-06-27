// Контакты и общие данные салона. Контакты — заглушки, заполним позже.

export const site = {
  name: "Трогательно",
  city: "Новосибирск",
  tagline: "салон красоты",
  description:
    "Салон красоты «Трогательно» в Новосибирске — лазерная эпиляция, косметология, массаж, ногтевой сервис. Бережно к вам и вашему времени.",
  address: "Кошурникова 2/1",
  phone: "+7 929 303-19-99",
  phoneHref: "tel:+79293031999",
  telegram: "https://t.me/Trogatelno_54",
  whatsapp: "https://wa.me/79293031999",
  max: "https://max.ru/u/f9LHodD0cOKtgoD2EufQRY4boK54j-pBOvcJY18fkujXUhgUqRCizh3_c1I",
  instagram: "https://www.instagram.com/trogatelno_nsk",
  vk: "https://vk.com/trogatelno_nsk",
  // Онлайн-запись — по телефону (отдельной системы записи нет).
  bookingUrl: "tel:+79293031999",

  // Карточки организации на картах — для виджета отзывов и ссылок.
  // rating/count — снимок для бейджей; сами ссылки всегда ведут на живые отзывы.
  // У Яндекса есть официальный встраиваемый виджет (orgId), у 2ГИС — только ссылка.
  maps: {
    yandex: {
      orgId: "68001170233",
      url: "https://yandex.ru/maps/org/trogatelno/68001170233/reviews/",
      rating: 4.4,
      count: 13,
    },
    gis: {
      url: "https://2gis.ru/novosibirsk/firm/70000001042833935/tab/reviews",
      rating: 4.9,
      count: 104,
    },
  },
} as const;

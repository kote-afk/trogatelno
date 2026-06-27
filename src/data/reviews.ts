// Отзывы клиентов. Сейчас пусто — блок показывает заглушку.
// Фаза 2: отзывы будут добавляться через сайт (админка + Supabase).

export type Review = {
  id: string;
  author: string;
  text: string;
  /** Оценка 1–5. */
  rating?: number;
  /** Дата/подпись, напр. "Март 2026". */
  date?: string;
};

export const reviews: Review[] = [];

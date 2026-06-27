// Примеры работ (галерея). Сейчас пусто — блок показывает заглушку.
// Фаза 2: эти данные будут добавляться через сайт (админка + Supabase).
// Картинки класть в /public/works/.

export type Work = {
  id: string;
  /** Путь к изображению в /public/works/ */
  image: string;
  title?: string;
  /** Категория услуги, напр. "Косметология". */
  category?: string;
};

export const works: Work[] = [];

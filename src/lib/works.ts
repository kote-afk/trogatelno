import { works as staticWorks, type Work } from "@/data/works";
import { WORKS_BUCKET, isSupabaseConfigured } from "./supabase/config";
import { createSupabaseServerClient } from "./supabase/server";

export type { Work };

/** Строка таблицы `works` в Supabase. */
type WorkRow = {
  id: string;
  image_path: string;
  title: string | null;
  category: string | null;
  sort_order: number | null;
};

/**
 * Список работ для публичной галереи.
 * Если Supabase подключён и есть записи — берём их; иначе статический фолбэк.
 */
export async function getWorks(): Promise<Work[]> {
  if (!isSupabaseConfigured) return staticWorks;

  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
      .from("works")
      .select("id, image_path, title, category, sort_order")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });

    if (error || !data || data.length === 0) return staticWorks;

    return (data as WorkRow[]).map((row) => {
      const {
        data: { publicUrl },
      } = supabase.storage.from(WORKS_BUCKET).getPublicUrl(row.image_path);
      return {
        id: row.id,
        image: publicUrl,
        title: row.title ?? undefined,
        category: row.category ?? undefined,
      };
    });
  } catch {
    // Сбой сети/конфига не должен ронять страницу.
    return staticWorks;
  }
}

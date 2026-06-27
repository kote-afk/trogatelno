// Доступ к Supabase. Если переменные не заданы (ещё не подключили проект),
// сайт продолжает работать: секция «Работы» просто показывает заглушку,
// а админка — сообщение «не настроено». Это держит сборку зелёной до ключей.

export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

/** Bucket в Supabase Storage для фотографий работ. */
export const WORKS_BUCKET = "works";

/** Настроен ли Supabase (есть валидный URL и ключ). */
export const isSupabaseConfigured =
  SUPABASE_URL.startsWith("http") && SUPABASE_ANON_KEY.length > 20;

/**
 * Список e-mail, которым разрешён вход в админку (через запятую в env).
 * Defense-in-depth поверх отключённой регистрации в Supabase.
 */
export const ADMIN_EMAILS = (process.env.ADMIN_EMAILS ?? "")
  .split(",")
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);

export function isAdminEmail(email: string | undefined | null): boolean {
  if (!email) return false;
  // Если список пуст — пускаем любого аутентифицированного (регистрация в
  // Supabase должна быть отключена, поэтому это лишь владелец).
  if (ADMIN_EMAILS.length === 0) return true;
  return ADMIN_EMAILS.includes(email.toLowerCase());
}

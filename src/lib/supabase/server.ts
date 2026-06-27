import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { SUPABASE_ANON_KEY, SUPABASE_URL } from "./config";

/**
 * Серверный клиент Supabase. В Next 16 `cookies()` асинхронный — обязательно await.
 * Используется в серверных компонентах, server actions и route handlers.
 */
export async function createSupabaseServerClient() {
  const cookieStore = await cookies();

  return createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          );
        } catch {
          // Вызов из серверного компонента (только чтение) — обновление
          // сессии берёт на себя proxy. Безопасно игнорируем.
        }
      },
    },
  });
}

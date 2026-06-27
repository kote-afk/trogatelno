import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import {
  SUPABASE_ANON_KEY,
  SUPABASE_URL,
  isAdminEmail,
  isSupabaseConfigured,
} from "./config";

/**
 * Обновляет сессию Supabase на каждом запросе и защищает `/admin`.
 * Вызывается из proxy (в Next 16 заменил middleware).
 */
export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });

  // Supabase ещё не подключён — пропускаем без вмешательства.
  if (!isSupabaseConfigured) return response;

  const supabase = createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value),
        );
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options),
        );
      },
    },
  });

  // ВАЖНО: getUser() обращается к серверу Supabase и валидирует токен —
  // не доверяем getSession() для авторизации.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;
  const isAdminArea = pathname.startsWith("/admin");
  const isLoginPage = pathname === "/admin/login";

  // Доступ в админку — только аутентифицированному из allowlist.
  if (isAdminArea && !isLoginPage) {
    if (!user || !isAdminEmail(user.email)) {
      const url = request.nextUrl.clone();
      url.pathname = "/admin/login";
      return NextResponse.redirect(url);
    }
  }

  // Уже залогинен — со страницы логина уводим в админку.
  if (isLoginPage && user && isAdminEmail(user.email)) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin";
    return NextResponse.redirect(url);
  }

  return response;
}

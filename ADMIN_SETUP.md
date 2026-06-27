# Админка «Работы» — подключение Supabase

Самостоятельное добавление фотографий работ владельцем. Вход — по ссылке из
письма (magic-link), без пароля.

## 1. Создать проект Supabase
1. Зайти на [supabase.com](https://supabase.com) → **New project** (бесплатный план).
2. Регион — ближе к РФ (напр. Frankfurt). Запомнить пароль БД (для админки не нужен).

## 2. Создать таблицу и хранилище
**SQL Editor → New query** → вставить содержимое [`supabase/schema.sql`](supabase/schema.sql) → **Run**.
Это создаст таблицу `works`, bucket `works` и политики безопасности (RLS).

## 3. Настроить вход (magic-link)
1. **Authentication → Providers → Email**: включить, выключить «Confirm email» не нужно.
2. **Authentication → Sign In / Providers**: **отключить** «Allow new users to sign up»
   (вход — только заранее заведённому владельцу).
3. **Authentication → Users → Add user → Create new user**: ввести e-mail владельца,
   галочку «Auto confirm user» — да. (Пароль можно любой — он не используется.)
4. **(Рекомендуется, для входа с телефона)** Authentication → Emails → шаблон
   **Magic Link**: заменить ссылку на
   ```
   {{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=email
   ```
5. **Authentication → URL Configuration**: в **Site URL** указать адрес сайта
   (для локальной разработки — `http://localhost:3002`; для прод — домен Vercel),
   и добавить оба в **Redirect URLs**.

## 4. Прописать ключи
**Project Settings → API**, скопировать в `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon public key>
ADMIN_EMAILS=владелец@example.com
```
Перезапустить `npx next dev -p 3002`.

На Vercel те же три переменные добавить в **Settings → Environment Variables**.

## 5. Проверить
1. Открыть `/admin` → редирект на `/admin/login`.
2. Ввести e-mail владельца → прийдёт письмо со ссылкой → переход в админку.
3. Загрузить фото → появляется в галерее «Наши работы» на главной.

## Безопасность
- `anon`-ключ публичный по дизайну — доступ ограничивают RLS-политики.
- Запись возможна только из активной сессии владельца; регистрация отключена,
  плюс серверная проверка `ADMIN_EMAILS`.
- `service_role`-ключ **не используется** и не должен попадать в код/клиент.

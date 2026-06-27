# Трогательно — лендинг салона красоты (Новосибирск)

Next.js 16 (App Router) + TypeScript + Tailwind CSS 4. Тёмно-кремовая премиальная
тема, шрифты Playfair Display + Manrope.

## Возможности
- Услуги и цены (data-driven, `src/data/services.ts`).
- Галерея «Работы» с самостоятельным добавлением фото владельцем
  (Supabase Storage + админка `/admin`, вход по magic-link).
- Отзывы: живой виджет Яндекс.Карт + бейджи 2ГИС.
- Контакты, карта, каналы записи (Telegram / WhatsApp / MAX / звонок), соцсети.

## Локальный запуск
```bash
npm install
npm run dev      # http://localhost:3002 → next dev -p 3002
```

## Переменные окружения (`.env.local` локально, Vercel — в Project Settings)
```
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_...
ADMIN_EMAILS=owner@example.com   # кому разрешён вход в /admin
```
Без них сайт работает, но галерея показывает заглушку, а `/admin` — «не настроено».

## Подключение базы и админки
См. [ADMIN_SETUP.md](ADMIN_SETUP.md) и SQL-схему [`supabase/schema.sql`](supabase/schema.sql).

## Деплой
Vercel + домен через DNS. Keep-alive против засыпания Supabase — `/api/keepalive`
+ Vercel Cron (`vercel.json`, раз в сутки).

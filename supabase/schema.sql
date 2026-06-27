-- ============================================================
-- Схема для галереи «Работы» салона «Трогательно».
-- Выполнить один раз в Supabase → SQL Editor.
-- Модель безопасности: публично только чтение; запись — лишь
-- аутентифицированному владельцу (регистрацию в Auth отключаем).
-- ============================================================

-- 1. Таблица работ -------------------------------------------------
create table if not exists public.works (
  id          uuid primary key default gen_random_uuid(),
  image_path  text not null,            -- путь файла в Storage (bucket "works")
  title       text,
  category    text,
  sort_order  int  not null default 0,  -- меньше = выше в галерее
  created_at  timestamptz not null default now()
);

alter table public.works enable row level security;

-- Публичное чтение (анонимам — только SELECT).
drop policy if exists "works public read" on public.works;
create policy "works public read"
  on public.works for select
  using (true);

-- Запись/правка/удаление — только аутентифицированным.
drop policy if exists "works auth insert" on public.works;
create policy "works auth insert"
  on public.works for insert to authenticated
  with check (true);

drop policy if exists "works auth update" on public.works;
create policy "works auth update"
  on public.works for update to authenticated
  using (true) with check (true);

drop policy if exists "works auth delete" on public.works;
create policy "works auth delete"
  on public.works for delete to authenticated
  using (true);

-- 2. Storage bucket для фотографий --------------------------------
insert into storage.buckets (id, name, public)
values ('works', 'works', true)
on conflict (id) do nothing;

-- Публичное чтение файлов bucket'а.
drop policy if exists "works storage public read" on storage.objects;
create policy "works storage public read"
  on storage.objects for select
  using (bucket_id = 'works');

-- Загрузка/удаление файлов — только аутентифицированным.
drop policy if exists "works storage auth insert" on storage.objects;
create policy "works storage auth insert"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'works');

drop policy if exists "works storage auth delete" on storage.objects;
create policy "works storage auth delete"
  on storage.objects for delete to authenticated
  using (bucket_id = 'works');

import Link from "next/link";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import LoginForm from "./LoginForm";

export const metadata = { title: "Вход — админка" };

// Next 16: searchParams в page — это Promise.
export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center bg-cream px-5 py-16">
      <div className="w-full max-w-md rounded-2xl border border-line bg-cream-2 p-8 shadow-[0_24px_60px_-40px_rgba(42,47,80,0.5)]">
        <Link href="/" className="font-display text-2xl text-ink">
          Трогательно
        </Link>
        <h1 className="mt-6 font-display text-3xl text-ink">Вход в админку</h1>
        <p className="mt-2 mb-6 text-sm text-ink-soft">
          Управление фотографиями работ. Доступ — по ссылке из письма.
        </p>

        {isSupabaseConfigured ? (
          <LoginForm initialError={error} />
        ) : (
          <p className="rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink-soft">
            Админка ещё не подключена к базе. Добавьте переменные Supabase в
            <code className="mx-1 rounded bg-cream px-1">.env.local</code>и
            перезапустите сервер.
          </p>
        )}
      </div>
    </main>
  );
}

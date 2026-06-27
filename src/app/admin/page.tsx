import Link from "next/link";
import { redirect } from "next/navigation";
import { WORKS_BUCKET, isAdminEmail, isSupabaseConfigured } from "@/lib/supabase/config";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import WorkUploader from "./WorkUploader";
import { deleteWorkAction, signOutAction } from "./actions";

export const metadata = { title: "Админка — работы" };

type Row = {
  id: string;
  image_path: string;
  title: string | null;
  category: string | null;
};

export default async function AdminPage() {
  if (!isSupabaseConfigured) redirect("/admin/login");

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user || !isAdminEmail(user.email)) redirect("/admin/login");

  const { data } = await supabase
    .from("works")
    .select("id, image_path, title, category")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });
  const rows = (data ?? []) as Row[];

  const publicUrl = (path: string) =>
    supabase.storage.from(WORKS_BUCKET).getPublicUrl(path).data.publicUrl;

  return (
    <main className="min-h-screen bg-cream px-5 py-10 sm:px-8">
      <div className="mx-auto max-w-4xl">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-gold">Админка</p>
            <h1 className="font-display text-3xl text-ink">Работы салона</h1>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <Link href="/" className="text-ink-soft hover:text-gold">
              На сайт ↗
            </Link>
            <form action={signOutAction}>
              <button className="rounded-full border border-line bg-cream-2 px-4 py-2 text-ink-soft transition-colors hover:border-gold hover:text-ink">
                Выйти
              </button>
            </form>
          </div>
        </header>
        <p className="mt-1 text-sm text-ink-soft">{user.email}</p>

        <div className="mt-8">
          <WorkUploader />
        </div>

        <div className="mt-10">
          <p className="font-display text-xl text-ink">
            Загруженные работы{" "}
            <span className="text-ink-soft">({rows.length})</span>
          </p>

          {rows.length === 0 ? (
            <p className="mt-4 rounded-2xl border border-dashed border-line bg-cream-2 px-5 py-8 text-center text-ink-soft">
              Пока ничего не загружено. Добавьте первую работу выше.
            </p>
          ) : (
            <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {rows.map((row) => (
                <figure
                  key={row.id}
                  className="overflow-hidden rounded-2xl border border-line bg-cream-2"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={publicUrl(row.image_path)}
                    alt={row.title ?? "Работа"}
                    className="aspect-square w-full object-cover"
                  />
                  <figcaption className="p-3">
                    {row.title && (
                      <p className="truncate text-sm text-ink">{row.title}</p>
                    )}
                    {row.category && (
                      <p className="truncate text-xs text-ink-soft">
                        {row.category}
                      </p>
                    )}
                    <form action={deleteWorkAction} className="mt-2">
                      <input type="hidden" name="id" value={row.id} />
                      <input
                        type="hidden"
                        name="imagePath"
                        value={row.image_path}
                      />
                      <button className="text-xs text-red-600 hover:underline">
                        Удалить
                      </button>
                    </form>
                  </figcaption>
                </figure>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

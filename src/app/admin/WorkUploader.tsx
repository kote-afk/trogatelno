"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { services } from "@/data/services";
import { WORKS_BUCKET } from "@/lib/supabase/config";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { addWork } from "./actions";

const MAX_MB = 8;
const ACCEPTED = ["image/jpeg", "image/png", "image/webp"];

export default function WorkUploader() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!file) return setError("Выберите фото.");
    if (!ACCEPTED.includes(file.type))
      return setError("Подойдут только JPG, PNG или WebP.");
    if (file.size > MAX_MB * 1024 * 1024)
      return setError(`Файл больше ${MAX_MB} МБ — выберите поменьше.`);

    setBusy(true);
    try {
      const supabase = createSupabaseBrowserClient();
      const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
      const path = `${crypto.randomUUID()}.${ext}`;

      const { error: upErr } = await supabase.storage
        .from(WORKS_BUCKET)
        .upload(path, file, { contentType: file.type, upsert: false });
      if (upErr) throw upErr;

      await addWork({
        imagePath: path,
        title: title || undefined,
        category: category || undefined,
      });

      setFile(null);
      setTitle("");
      setCategory("");
      formRef.current?.reset();
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Не удалось загрузить фото.",
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="rounded-2xl border border-line bg-cream-2 p-6"
    >
      <p className="font-display text-xl text-ink">Добавить работу</p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-sm text-ink-soft">
            Фото (JPG, PNG, WebP, до {MAX_MB} МБ)
          </label>
          <input
            type="file"
            accept={ACCEPTED.join(",")}
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            className="block w-full text-sm text-ink file:mr-4 file:rounded-full file:border-0 file:bg-gold file:px-4 file:py-2 file:text-sm file:text-white hover:file:bg-[#a8763d]"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm text-ink-soft">
            Подпись (необязательно)
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Напр. Чистка лица — до/после"
            className="w-full rounded-xl border border-line bg-white px-4 py-2.5 text-ink outline-none focus:border-gold"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm text-ink-soft">
            Категория (необязательно)
          </label>
          <input
            type="text"
            list="work-categories"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Напр. Косметология"
            className="w-full rounded-xl border border-line bg-white px-4 py-2.5 text-ink outline-none focus:border-gold"
          />
          <datalist id="work-categories">
            {services.map((s) => (
              <option key={s.slug} value={s.title} />
            ))}
          </datalist>
        </div>
      </div>

      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={busy}
        className="mt-5 rounded-full bg-gold px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#a8763d] disabled:opacity-60"
      >
        {busy ? "Загружаем…" : "Загрузить"}
      </button>
    </form>
  );
}

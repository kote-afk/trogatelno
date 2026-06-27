"use client";

import { useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

type Status = "idle" | "sending" | "sent" | "error";

export default function LoginForm({ initialError }: { initialError?: string }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState(
    initialError ? "Ссылка недействительна или истекла. Запросите новую." : "",
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("sending");
    setMessage("");

    const supabase = createSupabaseBrowserClient();
    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: {
        // Регистрация отключена — войти может только заранее заведённый владелец.
        shouldCreateUser: false,
        emailRedirectTo: `${window.location.origin}/auth/confirm`,
      },
    });

    if (error) {
      setStatus("error");
      setMessage("Не удалось отправить ссылку. Проверьте адрес и попробуйте снова.");
      return;
    }
    setStatus("sent");
  }

  if (status === "sent") {
    return (
      <div className="text-center">
        <p className="font-display text-2xl text-ink">Проверьте почту</p>
        <p className="mt-3 text-ink-soft">
          Мы отправили ссылку для входа на <b>{email}</b>. Откройте её на этом
          устройстве — и попадёте в админ-панель.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm text-gold hover:underline"
        >
          Отправить ещё раз
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <label className="text-sm text-ink-soft" htmlFor="email">
        E-mail владельца
      </label>
      <input
        id="email"
        type="email"
        required
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        className="rounded-xl border border-line bg-white px-4 py-3 text-ink outline-none transition-colors focus:border-gold"
      />
      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded-full bg-gold px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#a8763d] disabled:opacity-60"
      >
        {status === "sending" ? "Отправляем…" : "Получить ссылку для входа"}
      </button>
      {message && <p className="text-sm text-red-600">{message}</p>}
    </form>
  );
}

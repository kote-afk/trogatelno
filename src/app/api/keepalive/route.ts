import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import {
  SUPABASE_ANON_KEY,
  SUPABASE_URL,
  isSupabaseConfigured,
} from "@/lib/supabase/config";

// Keep-alive: лёгкий запрос к БД, чтобы бесплатный Supabase не уснул
// после 7 дней простоя. Дёргается Vercel Cron раз в сутки (см. vercel.json).
export const dynamic = "force-dynamic";

export async function GET() {
  if (!isSupabaseConfigured) {
    return NextResponse.json({ ok: false, reason: "supabase not configured" });
  }
  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    const { error } = await supabase.from("works").select("id").limit(1);
    if (error) throw error;
    return NextResponse.json({ ok: true, ts: new Date().toISOString() });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : "unknown" },
      { status: 500 },
    );
  }
}

import type { NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/proxy";

// Next 16: middleware → proxy. Runtime — nodejs (не настраивается).
export async function proxy(request: NextRequest) {
  return updateSession(request);
}

export const config = {
  // Не трогаем статику и оптимизированные картинки.
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|logo.svg|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};

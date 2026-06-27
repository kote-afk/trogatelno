"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { WORKS_BUCKET, isAdminEmail } from "@/lib/supabase/config";
import { createSupabaseServerClient } from "@/lib/supabase/server";

/** Проверяет, что запрос делает аутентифицированный владелец. */
async function requireAdmin() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user || !isAdminEmail(user.email)) {
    throw new Error("Доступ запрещён");
  }
  return supabase;
}

/** Добавить работу: файл уже загружен в Storage, сохраняем запись. */
export async function addWork(input: {
  imagePath: string;
  title?: string;
  category?: string;
}) {
  const supabase = await requireAdmin();
  const { error } = await supabase.from("works").insert({
    image_path: input.imagePath,
    title: input.title?.trim() || null,
    category: input.category?.trim() || null,
  });
  if (error) throw new Error(error.message);
  revalidatePath("/");
  revalidatePath("/admin");
}

/** Удалить работу (запись + файл в Storage). Вызывается из <form>. */
export async function deleteWorkAction(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const imagePath = String(formData.get("imagePath") ?? "");
  if (!id) return;

  const supabase = await requireAdmin();
  if (imagePath) {
    await supabase.storage.from(WORKS_BUCKET).remove([imagePath]);
  }
  const { error } = await supabase.from("works").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/");
  revalidatePath("/admin");
}

/** Выход из админки. */
export async function signOutAction() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

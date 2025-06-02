import { createClient } from "@/utils/supabase/client";

export async function uploadCuponImage(file: File, cuponName: string): Promise<string | null> {
  const supabase = createClient();
  const filePath = `cupones/${cuponName.replace(/\s+/g, "_")}-${Date.now()}-${file.name}`;
  const { data, error } = await supabase.storage
    .from("cupones")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: true,
      contentType: file.type,
    });
  if (error) {
    console.error("Error uploading image:", error);
    return null;
  }
  const { data: publicData } = supabase.storage
    .from("cupones")
    .getPublicUrl(filePath);
  if (!publicData || !publicData.publicUrl) {
    console.error("Error getting public URL");
    return null;
  }
  return publicData.publicUrl;
}

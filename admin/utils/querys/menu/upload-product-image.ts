import { createClient } from "@/utils/supabase/client";

/**
 * Sube una imagen al bucket 'productos' en Supabase Storage.
 * @param file Archivo de imagen a subir
 * @param productId Un identificador único del producto (puede ser id, nombre, timestamp, etc)
 * @returns URL pública de la imagen subida, o null si falla
 */
export async function uploadProductImage(
  file: File,
  productId: string
): Promise<string | null> {
  const supabase = createClient();

  // Nombre único: {productId}/{timestamp}-{filename}
  const filePath = `${productId}/${Date.now()}-${file.name}`;

  const { data, error } = await supabase.storage
    .from("productos")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: true,
      contentType: file.type,
    });

  if (error) {
    console.error("Error al subir imagen:", error);
    return null;
  }

  // Obtener la URL pública
  const { data: publicUrlData } = supabase.storage
    .from("productos")
    .getPublicUrl(filePath);
  return publicUrlData.publicUrl || null;
}

export default uploadProductImage;

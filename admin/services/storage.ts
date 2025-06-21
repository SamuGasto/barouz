import supabase from "@/utils/supabase/client";

class StorageService {
  public async uploadProductImage(file: File): Promise<string> {
    const filePath = `productos/${Date.now()}-${file.name}`; // Genera un path único
    const { data, error } = await supabase.storage
      .from("productos") // Asegúrate de que este bucket exista en Supabase
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      console.error("Error al subir imagen:", error);
      throw error;
    }

    // Obtener la URL pública del archivo subido
    const { data: publicUrlData } = supabase.storage
      .from("productos")
      .getPublicUrl(filePath);

    if (publicUrlData.publicUrl) {
      return publicUrlData.publicUrl;
    } else {
      throw new Error("No se pudo obtener la URL pública de la imagen.");
    }
  }
}

export const storageService = new StorageService();

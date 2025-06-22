import supabase from "@/utils/supabase/client";

class StorageService {
  public async uploadProductImage(file: File): Promise<string> {
    const safeFileName = file.name;

    const filePath = `productos/${safeFileName}`; // Genera un path único
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

  public async deleteProductImage(imageUrl: string): Promise<void> {
    if (!imageUrl) {
      console.warn("No se proporcionó URL de imagen para eliminar.");
      return; // No hacer nada si no hay URL
    }

    try {
      // Supabase Storage necesita la ruta dentro del bucket, no la URL completa
      // Necesitamos extraer la ruta del archivo de la URL pública
      const bucketName = "productos"; // Nombre de tu bucket, ¡asegúrate de que coincida!
      const urlParts = imageUrl.split(`/${bucketName}/`); // Divide la URL en el nombre del bucket

      if (urlParts.length < 2) {
        console.warn(
          `La URL "${imageUrl}" no parece contener el bucket "${bucketName}".`
        );
        return; // La URL no tiene el formato esperado
      }

      const filePath = urlParts[1]; // La parte después del nombre del bucket es la ruta del archivo

      // Eliminar el archivo del bucket
      const { data, error } = await supabase.storage
        .from(bucketName)
        .remove([filePath]); // remove espera un array de rutas

      if (error) {
        console.error("Error al eliminar imagen del storage:", error);
        throw error;
      }

      console.log(`Imagen "${filePath}" eliminada del storage.`);
    } catch (error) {
      console.error("Error inesperado al eliminar imagen:", error);
      throw error;
    }
  }
}

export const storageService = new StorageService();

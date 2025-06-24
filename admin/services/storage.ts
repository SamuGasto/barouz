import supabase from "@/utils/supabase/client";

interface HandleImageUploadParams {
  newImageData: File | string | undefined; // `File` si es nueva, `string` si es URL existente o vacía, `undefined` si no se tocó
  oldImageUrl: string; // La URL de la imagen que ya existía en la DB
  bucketName: string; // El nombre del bucket de Supabase (e.g., "productos", "cupones", "avatars")
  isEditing: boolean; // Indica si estamos en modo edición
}

class StorageService {
  public async uploadImage(bucketName: string, file: File): Promise<string> {
    const safeFileName = file.name;

    const filePath = `${safeFileName}`; // Genera un path único
    const { data, error } = await supabase.storage
      .from(bucketName) // Asegúrate de que este bucket exista en Supabase
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
      .from(bucketName)
      .getPublicUrl(filePath);

    if (publicUrlData.publicUrl) {
      return publicUrlData.publicUrl;
    } else {
      throw new Error("No se pudo obtener la URL pública de la imagen.");
    }
  }

  public async deleteImage(
    bucketName: string,
    imageUrl: string
  ): Promise<void> {
    if (!imageUrl) {
      console.warn("No se proporcionó URL de imagen para eliminar.");
      return; // No hacer nada si no hay URL
    }

    try {
      // Supabase Storage necesita la ruta dentro del bucket, no la URL completa
      // Necesitamos extraer la ruta del archivo de la URL pública
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

  public async handleImageUpload(
    params: HandleImageUploadParams
  ): Promise<string> {
    const { newImageData, oldImageUrl, bucketName, isEditing } = params;
    let finalImageUrl: string = oldImageUrl; // Por defecto, mantenemos la imagen antigua

    // Caso 1: El usuario seleccionó un NUEVO archivo (File)
    if (newImageData instanceof File) {
      try {
        finalImageUrl = await this.uploadImage(bucketName, newImageData);

        // Si estamos editando y había una imagen antigua Y es diferente de la nueva, la eliminamos.
        if (
          isEditing &&
          oldImageUrl &&
          oldImageUrl !== "" &&
          oldImageUrl !== finalImageUrl
        ) {
          await this.deleteImage(bucketName, oldImageUrl);
          console.log(`Imagen antigua ${oldImageUrl} eliminada.`);
        }
      } catch (error) {
        console.error(
          `Error al subir nueva imagen para el bucket ${bucketName}:`,
          error
        );
        // Aquí podrías decidir si quieres lanzar el error o devolver la URL antigua/vacía
        throw new Error("No se pudo subir la nueva imagen.");
      }
    }
    // Caso 2: `newImageData` es un string (URL existente o string vacío)
    else if (typeof newImageData === "string") {
      finalImageUrl = newImageData; // Usamos el string que viene del formulario (URL o "")

      // Si estamos editando y la nueva URL es vacía (usuario la borró) Y había una imagen antigua, la eliminamos.
      if (
        isEditing &&
        finalImageUrl === "" &&
        oldImageUrl &&
        oldImageUrl !== ""
      ) {
        try {
          await this.deleteImage(bucketName, oldImageUrl);
          console.log(
            `Imagen antigua ${oldImageUrl} eliminada al dejar el campo vacío.`
          );
        } catch (error) {
          console.warn(
            `No se pudo eliminar la imagen antigua del bucket ${bucketName} al dejar el campo vacío:`,
            error
          );
          // No lanzamos el error aquí para no bloquear la actualización de la entidad en DB
        }
      }
      // Si la nueva URL es diferente de la antigua (e.g., se pegó una URL distinta)
      // Y la antigua no estaba vacía, también la eliminamos.
      else if (
        isEditing &&
        finalImageUrl !== oldImageUrl &&
        oldImageUrl !== ""
      ) {
        try {
          await this.deleteImage(bucketName, oldImageUrl);
          console.log(
            `Imagen antigua ${oldImageUrl} eliminada al cambiar a una nueva URL pegada.`
          );
        } catch (error) {
          console.warn(
            `No se pudo eliminar la imagen antigua del bucket ${bucketName} al cambiar URL:`,
            error
          );
        }
      }
    }
    // Caso 3: `newImageData` es `undefined` (el campo de imagen no se modificó en el formulario)
    // En este caso, `finalImageUrl` ya es `oldImageUrl`, lo cual es el comportamiento deseado:
    // mantener la imagen existente si no se proporciona una nueva ni se vacía el campo.
    // No se requiere lógica adicional aquí.

    return finalImageUrl;
  }
}

export const storageService = new StorageService();

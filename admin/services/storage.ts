import { createClient } from "@/utils/supabase/client";

interface HandleImageUploadParams {
  newImageData: File | string | undefined; // `File` si es nueva, `string` si es URL existente o vacía, `undefined` si no se tocó
  oldImageUrl: string; // La URL de la imagen que ya existía en la DB
  bucketName: string; // El nombre del bucket de Supabase (e.g., "productos", "cupones", "avatars")
  isEditing: boolean; // Indica si estamos en modo edición
}

interface UploadImageParams {
  bucketName: string;
  file: File;
}

class StorageService {
  // Convert to arrow functions
  public uploadImage = async (props: UploadImageParams): Promise<string> => {
    const { bucketName, file } = props;
    const safeFileName = file.name;
    const filePath = `${safeFileName}`; // Genera un path único

    const supabase = createClient();
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      console.error("Error al subir imagen:", error);
      throw error;
    }

    const { data: publicUrlData } = supabase.storage
      .from(bucketName)
      .getPublicUrl(filePath);

    if (publicUrlData.publicUrl) {
      return publicUrlData.publicUrl;
    } else {
      throw new Error("No se pudo obtener la URL pública de la imagen.");
    }
  };

  public deleteImage = async (
    bucketName: string,
    imageUrl: string
  ): Promise<void> => {
    if (!imageUrl) {
      console.warn("No se proporcionó URL de imagen para eliminar.");
      return;
    }

    const supabase = createClient();

    try {
      const urlParts = imageUrl.split(`/${bucketName}/`);
      if (urlParts.length < 2) {
        console.warn(
          `La URL "${imageUrl}" no parece contener el bucket "${bucketName}".`
        );
        return;
      }

      const filePath = urlParts[1];
      const { data, error } = await supabase.storage
        .from(bucketName)
        .remove([filePath]);

      if (error) {
        console.error("Error al eliminar imagen del storage:", error);
        throw error;
      }
      console.log(`Imagen "${filePath}" eliminada del storage.`);
    } catch (error) {
      console.error("Error inesperado al eliminar imagen:", error);
      throw error;
    }
  };

  public handleImageUpload = async (
    params: HandleImageUploadParams
  ): Promise<string> => {
    const { newImageData, oldImageUrl, bucketName, isEditing } = params;
    let finalImageUrl: string = oldImageUrl;

    if (newImageData instanceof File) {
      try {
        // Now 'this' will correctly refer to the StorageService instance
        finalImageUrl = await this.uploadImage({
          bucketName,
          file: newImageData,
        });

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
        throw new Error("No se pudo subir la nueva imagen.");
      }
    } else if (typeof newImageData === "string") {
      finalImageUrl = newImageData;

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
        }
      } else if (
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
    return finalImageUrl;
  };
}

export const storageService = new StorageService();

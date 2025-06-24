import { useMutation } from "@tanstack/react-query";
import { storageService } from "@/services/storage";

type UploadImageParams = {
    bucketName: string;
    file: File;
}

interface HandleImageUploadParams {
    newImageData: File | string | undefined; // `File` si es nueva, `string` si es URL existente o vacía, `undefined` si no se tocó
    oldImageUrl: string; // La URL de la imagen que ya existía en la DB
    bucketName: string; // El nombre del bucket de Supabase (e.g., "productos", "cupones", "avatars")
    isEditing: boolean; // Indica si estamos en modo edición
}

export function useUploadImage() {
    return useMutation<string, Error, UploadImageParams>({
        mutationFn: ({ bucketName, file }) => storageService.uploadImage(bucketName, file),
        onError: (error) => {
            console.error("Error al subir imagen:", error);
        },
    })
}

export function useHandleImageUpload() {
    return useMutation<string, Error, HandleImageUploadParams>({
        mutationFn: ({ bucketName, newImageData, oldImageUrl, isEditing }) => storageService.handleImageUpload({ bucketName, newImageData, oldImageUrl, isEditing }),
        onError: (error) => {
            console.error("Error al subir imagen:", error);
        },
    })
}

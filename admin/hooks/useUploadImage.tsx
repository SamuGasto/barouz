import { useMutation } from "@tanstack/react-query";
import { storageService } from "@/services/storage";

export function useUploadImage() {
    return useMutation<string, Error, File>({
        mutationFn: storageService.uploadProductImage,
        onError: (error) => {
            console.error("Error al subir imagen:", error);
        },
    })
}
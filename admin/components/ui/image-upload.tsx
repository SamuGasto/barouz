"use client"

import type React from "react"

import { useState, useCallback, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Upload, X, ImageIcon, AlertCircle } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface ImageUploadProps {
    value?: string | File;
    nameProduct: string;
    onChange: (value: string | File | undefined) => void;
    onRemove: () => void;
    disabled?: boolean;
    className?: string;
}

export function ImageUpload({ value, nameProduct, onChange, onRemove, disabled, className }: ImageUploadProps) {
    const [isDragOver, setIsDragOver] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [isProcessingImage, setIsProcessingImage] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const isBusy = disabled || isProcessingImage

    const handleDragOver = useCallback(
        (e: React.DragEvent) => {
            e.preventDefault()
            e.stopPropagation()
            if (!isBusy) {
                setIsDragOver(true)
            }
        },
        [isBusy],
    )

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (!isBusy) {
            setIsDragOver(false)
        }
    }, [isBusy])

    const validateFile = (file: File): string | null => {
        // Validar tipo de archivo
        const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"]
        if (!allowedTypes.includes(file.type)) {
            return "Solo se permiten archivos de imagen (JPEG, PNG, WebP)"
        }

        // Validar tamaño (máximo 5MB)
        const maxSize = 5 * 1024 * 1024 // 5MB
        if (file.size > maxSize) {
            return "El archivo es demasiado grande. Máximo 5MB permitido"
        }

        return null
    }

    const convertImageToWebP = (file: File): Promise<File> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()

            reader.onload = (readerEvent) => {
                const image = new window.Image()

                image.onload = () => {
                    const canvas = document.createElement("canvas")
                    const ctx = canvas.getContext("2d")

                    const MAX_WIDTH = 1200;
                    const MAX_HEIGHT = 1200;
                    let width = image.width;
                    let height = image.height;

                    if (width > MAX_WIDTH) {
                        height *= MAX_WIDTH / width;
                        width = MAX_WIDTH;
                    }

                    if (height > MAX_HEIGHT) {
                        width *= MAX_HEIGHT / height;
                        height = MAX_HEIGHT;
                    }

                    canvas.width = width;
                    canvas.height = height;

                    ctx?.drawImage(image, 0, 0, width, height);

                    // Convertir a WebP
                    const quality = 1;
                    canvas.toBlob((blob) => {
                        if (blob) {
                            // Creamos un nuevo File con el tipo webp y el nombre original + .webp
                            const webpFile = new File([blob], `${Date.now()}-${nameProduct.replace(/[^a-zA-Z0-9]/g, "_")}.webp`, {
                                type: 'image/webp',
                                lastModified: Date.now(),
                            });
                            resolve(webpFile);
                        } else {
                            reject(new Error("No se pudo convertir la imagen a WebP"))
                        }
                    }, "image/webp", quality)
                }
                image.onerror = (error) => {
                    reject(new Error("Error al cargar la imagen."))
                }
                image.src = readerEvent.target?.result as string
            }
            reader.onerror = (error) => {
                reject(new Error("Error al leer el archivo."))
            }
            reader.readAsDataURL(file)
        })
    }


    const processFile = async (file: File) => {
        setError(null)
        setIsProcessingImage(true)

        const validationError = validateFile(file)
        if (validationError) {
            setError(validationError)
            onChange(undefined)
            setIsProcessingImage(false)
            return
        }

        try {
            const webpFile = await convertImageToWebP(file)
            onChange(webpFile)
        } catch (error) {
            setError("Error al procesar la imagen")
            onChange(undefined)
        }
        finally {
            setIsProcessingImage(false)
        }
    }

    const handleDrop = useCallback(
        async (e: React.DragEvent) => {
            e.preventDefault()
            e.stopPropagation()
            setIsDragOver(false)

            if (isBusy) return

            const files = Array.from(e.dataTransfer.files)
            if (files.length > 0) {
                await processFile(files[0])
            }
        },
        [isBusy, onChange],
    )

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (files && files.length > 0) {
            await processFile(files[0])
        }

        if (fileInputRef.current) {
            fileInputRef.current.value = ""
        }
    }

    const handleClick = () => {
        if (!isBusy) {
            fileInputRef.current?.click()
        }
    }

    const handleRemove = (e: React.MouseEvent) => {
        e.stopPropagation()
        onRemove()
        setError(null)
        if (fileInputRef.current) {
            fileInputRef.current.value = ""
        }
    }

    const imageUrl = value instanceof File ? URL.createObjectURL(value) : value

    return (
        <div className={cn("space-y-2", className)}>
            {imageUrl ? (
                <div className="relative group">
                    <div className="relative h-48 w-full rounded-lg overflow-hidden border-2 ">
                        <Image
                            src={imageUrl}
                            alt="Preview"
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 400px"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                                onClick={handleRemove}
                                className="bg-red-600 hover:bg-red-700"
                                disabled={isBusy}
                            >
                                <X className="h-4 w-4 mr-2" />
                                Eliminar
                            </Button>
                        </div>
                    </div>
                    <div className="mt-2 text-center">
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={handleClick}
                            disabled={isBusy}
                        >
                            <Upload className="h-4 w-4 mr-2" />
                            Cambiar imagen
                        </Button>
                    </div>
                </div>
            ) : (
                <div
                    className={cn(
                        "relative h-48 w-full rounded-lg border-2 border-dashed transition-all cursor-pointer",
                        disabled && "opacity-50 cursor-not-allowed",
                    )}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={handleClick}
                >
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                        <ImageIcon className="h-12 w-12 mb-3" />
                        <p className="text-sm font-medium mb-1">
                            Arrastra una imagen aquí o haz clic para seleccionar
                        </p>
                        <p className="text-xs">PNG, JPG o WebP (máx. 5MB)</p>
                    </div>
                </div>
            )}

            {error && (
                <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/30 rounded-md">
                    <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400 flex-shrink-0" />
                    <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
                </div>
            )}

            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
                disabled={isBusy}
            />
        </div>
    )
}

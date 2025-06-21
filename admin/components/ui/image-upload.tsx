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
    onChange: (value: string | File | undefined) => void;
    onRemove: () => void;
    disabled?: boolean;
    className?: string;
}

export function ImageUpload({ value, onChange, onRemove, disabled, className }: ImageUploadProps) {
    const [isDragOver, setIsDragOver] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleDragOver = useCallback(
        (e: React.DragEvent) => {
            e.preventDefault()
            e.stopPropagation()
            if (!disabled) {
                setIsDragOver(true)
            }
        },
        [disabled],
    )

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragOver(false)
    }, [])

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

    const processFile = async (file: File) => {
        setError(null)

        const validationError = validateFile(file)
        if (validationError) {
            setError(validationError)
            onChange(undefined)
            return
        }

        onChange(file)
    }

    const handleDrop = useCallback(
        async (e: React.DragEvent) => {
            e.preventDefault()
            e.stopPropagation()
            setIsDragOver(false)

            if (disabled) return

            const files = Array.from(e.dataTransfer.files)
            if (files.length > 0) {
                await processFile(files[0])
            }
        },
        [disabled, onChange],
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
        if (!disabled) {
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
                    <div className="relative h-48 w-full rounded-lg overflow-hidden border-2">
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
                                disabled={disabled}
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
                            disabled={disabled}
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
                disabled={disabled}
            />
        </div>
    )
}

"use client"

import { useState, useEffect } from "react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { ImageUpload } from "@/components/ui/image-upload"
import { Save, X } from "lucide-react"

import type { Product, CategoriaProducto } from "@/types/product";

interface ProductFormDialogProps {
    open: boolean;
    product: Product | null;
    isNew: boolean;
    onClose: () => void;
    onSave: (product: Product) => void;
}

export function ProductFormDialog({ open, product, isNew, onClose, onSave }: ProductFormDialogProps) {
    const [formData, setFormData] = useState<Omit<Product, "imagen"> & { imagen: string | File }>({
        id: "",
        nombre: "",
        precio: 0,
        descripcion: "",
        categoria: "Waffles" as CategoriaProducto,
        disponible: true,
        imagen: "",
        created_at: "",
    });

    const [errors, setErrors] = useState<Partial<Product> & { categoriaMsg?: string }>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (product) {
            setFormData(product);
        } else {
            setFormData({
                id: "",
                nombre: "",
                precio: 0,
                descripcion: "",
                categoria: "Waffles" as CategoriaProducto,
                disponible: true,
                imagen: "",
                created_at: "",
            });
        }
        setErrors({});
    }, [product, open]);

    const validateForm = (): boolean => {
        const newErrors: Partial<Product> & { categoriaMsg?: string } = {};

        if (!formData.nombre.trim()) {
            newErrors.nombre = "El nombre es requerido" as any;
        }

        if (formData.precio === undefined || isNaN(Number(formData.precio)) || Number(formData.precio) <= 0) {
            newErrors.precio = "El precio debe ser un número válido mayor a 0" as any;
        }

        if (!formData.descripcion.trim()) {
            newErrors.descripcion = "La descripción es requerida" as any;
        }

        if (!formData.categoria) {
            newErrors.categoriaMsg = "La categoría es requerida";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).filter((k) => (k !== "categoriaMsg" ? (newErrors as any)[k] : false)).length === 0 && !newErrors.categoriaMsg;
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;

        setIsSubmitting(true);

        try {
            let imageUrl = typeof formData.imagen === "string" ? formData.imagen : "";
            // Si es File, subir a Supabase y obtener URL
            if (formData.imagen && typeof formData.imagen !== "string") {
                const { uploadProductImage } = await import("@/utils/querys/menu/upload-product-image");
                const uploadedUrl = await uploadProductImage(formData.imagen, formData.id || formData.nombre || Date.now().toString());
                if (!uploadedUrl) {
                    throw new Error("No se pudo subir la imagen");
                }
                imageUrl = uploadedUrl;
            }

            const productToSave: Product = {
                ...formData,
                imagen: imageUrl,
                id: isNew ? Date.now().toString() : formData.id,
            };

            onSave(productToSave);
            onClose();
        } catch (error) {
            console.error("Error al guardar:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const updateFormData = (field: keyof Product | "imagen", value: string | number | boolean | File) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        // Limpiar error del campo cuando el usuario empiece a escribir
        if (errors[field as keyof Product]) {
            setErrors((prev) => ({ ...prev, [field as keyof Product]: undefined }));
        }
    };

    const handleImageChange = (value: string | File) => {
        updateFormData("imagen", value);
    };

    const handleImageRemove = () => {
        updateFormData("imagen", "");
    };

    return (
        <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
            <DialogContent className="w-full max-w-xs sm:max-w-md p-2 sm:p-6 max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>
                        {isNew ? "Nuevo Producto" : "Editar Producto"}
                    </DialogTitle>
                    <DialogDescription>
                        {isNew ? "Añade un nuevo producto al menú" : "Modifica los detalles del producto"}
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-6 py-4">
                    {/* Imagen del producto */}
                    <ImageUpload
                        value={formData.imagen}
                        onChange={(value: string | File) => handleImageChange(value)}
                        onRemove={handleImageRemove}
                        disabled={isSubmitting}
                    />

                    {/* Información básica */}
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="nombre">
                                Nombre del producto *
                            </Label>
                            <Input
                                id="nombre"
                                placeholder="Nombre del producto"
                                value={formData.nombre}
                                onChange={(e) => updateFormData("nombre", e.target.value)}
                                className={`${errors.nombre ? "border-red-500" : ""}`}
                                disabled={isSubmitting}
                            />
                            {errors.nombre && <span className="text-sm text-red-500">{errors.nombre}</span>}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="precio">
                                    Precio *
                                </Label>
                                <Input
                                    id="precio"
                                    placeholder="Precio"
                                    type="number"
                                    value={formData.precio === 0 ? "" : formData.precio}
                                    onChange={(e) => updateFormData("precio", Number(e.target.value))}
                                    className={`${errors.precio ? "border-red-500" : ""}`}
                                    disabled={isSubmitting}
                                />
                                {errors.precio && <span className="text-sm text-red-500">{errors.precio}</span>}
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="categoria">
                                    Categoría *
                                </Label>
                                <Select
                                    value={formData.categoria}
                                    onValueChange={(value) => updateFormData("categoria", value as CategoriaProducto)}
                                    disabled={isSubmitting}
                                >
                                    <SelectTrigger className={`${errors.categoriaMsg ? "border-red-500" : ""}`}>
                                        <SelectValue placeholder="Selecciona una categoría" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Waffles">
                                            Waffles
                                        </SelectItem>
                                        <SelectItem value="Helados">
                                            Helados
                                        </SelectItem>
                                        <SelectItem value="Churros">
                                            Churros
                                        </SelectItem>
                                        <SelectItem value="Waffle Cookies">
                                            Waffle Cookies
                                        </SelectItem>
                                        <SelectItem value="Postres">
                                            Postres
                                        </SelectItem>
                                        <SelectItem value="Bebidas">
                                            Bebidas
                                        </SelectItem>
                                        <SelectItem value="Otros">
                                            Otros
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.categoriaMsg && <span className="text-sm text-red-500">{errors.categoriaMsg}</span>}
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="descripcion">
                                Descripción *
                            </Label>
                            <Textarea
                                id="descripcion"
                                placeholder="Describe el producto, ingredientes principales, etc."
                                value={formData.descripcion}
                                onChange={(e) => updateFormData("descripcion", e.target.value)}
                                className={`${errors.descripcion ? "border-red-500" : ""}`}
                                rows={3}
                                disabled={isSubmitting}
                            />
                            {errors.descripcion && <span className="text-sm text-red-500">{errors.descripcion}</span>}
                        </div>

                        <div className="flex items-center space-x-3">
                            <Switch
                                id="disponible"
                                checked={formData.disponible}
                                onCheckedChange={(checked: boolean) => updateFormData("disponible", checked)}
                                disabled={isSubmitting}
                            />
                            <Label htmlFor="disponible" className="cursor-pointer">
                                Producto disponible para la venta
                            </Label>
                        </div>
                    </div>
                </div>

                <DialogFooter className="gap-2">
                    <Button
                        variant="outline"
                        onClick={onClose}
                        disabled={isSubmitting}
                    >
                        <X className="mr-2 h-4 w-4" />
                        Cancelar
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <>
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                Guardando...
                            </>
                        ) : (
                            <>
                                <Save className="mr-2 h-4 w-4" />
                                {isNew ? "Crear Producto" : "Guardar Cambios"}
                            </>
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

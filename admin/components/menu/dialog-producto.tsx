"use client"

import React, { useEffect } from 'react'
import { z } from 'zod/v4'
import { Button } from '@/components/ui/button'
import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogContent } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Save, X } from 'lucide-react'
import { ImageUpload } from '@/components/ui/image-upload'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Switch } from '@/components/ui/switch'
import { Database } from '@/types/supabase'
import { useCreateProduct, useUpdateProduct } from '@/hooks/useMenuManagement'
import { toast } from 'sonner'
import { useUploadImage } from '@/hooks/useUploadImage'
import { storageService } from '@/services/storage'

type ProductRow = Database["public"]["Tables"]["producto"]["Row"];
type ProductInsert = Database["public"]["Tables"]["producto"]["Insert"];
type ProductUpdate = Database["public"]["Tables"]["producto"]["Update"];

const ProductFormSchema = z.object({
    nombre: z.string().min(1, "El nombre es requerido"),
    precio: z.string().refine((value) => Number(value) > 0, "El precio debe ser mayor a 0"),
    descripcion: z.string().min(1, "La descripción es requerida"),
    categoria: z.enum(["Waffles", "Helados", "Churros", "Waffle Cookies", "Postres", "Bebidas", "Otros"]),
    disponible: z.boolean(),
    imagen: z.union([z.string(), z.instanceof(File)]).optional(),
})


interface CrearProductoDialogProps {
    open: boolean
    producto?: ProductRow
    onClose: () => void;
}

function CrearProductoDialog({ open, producto, onClose }: CrearProductoDialogProps) {
    const { mutateAsync: createProduct, isPending: isCreatingProduct } = useCreateProduct()
    const { mutateAsync: updateProduct, isPending: isUpdatingProduct } = useUpdateProduct()
    const { mutateAsync: uploadImage, isPending: isUploadingImage } = useUploadImage()

    const isEditing = !!producto
    const dialogTitle = isEditing ? "Editar Producto" : "Crear Nuevo Producto"
    const isLoading = isCreatingProduct || isUpdatingProduct || isUploadingImage

    const form = useForm<z.infer<typeof ProductFormSchema>>({
        resolver: zodResolver(ProductFormSchema),
        defaultValues: {
            nombre: producto?.nombre || "",
            precio: producto?.precio.toString() || "0",
            descripcion: producto?.descripcion || "",
            categoria: producto?.categoria || "Waffles",
            disponible: producto?.disponible || true,
            imagen: producto?.imagen || undefined,
        },
    })


    useEffect(() => {
        if (producto) {
            form.reset({
                nombre: producto.nombre,
                precio: producto.precio.toString(),
                descripcion: producto.descripcion,
                categoria: producto.categoria,
                disponible: producto.disponible,
                imagen: producto.imagen || undefined,
            })
        } else {
            form.reset({
                nombre: "",
                precio: "0",
                descripcion: "",
                categoria: "Waffles",
                disponible: true,
                imagen: undefined,
            })
        }
    }, [producto, form])

    const onSubmit = async (data: z.infer<typeof ProductFormSchema>) => {
        try {
            let finalImageUrl: string = ""; // Esta será la URL final para guardar en la DB
            const oldImageUrl: string = producto?.imagen || ""; // La URL de la imagen que el producto ya tenía (si existe)

            // 1. Manejo de la imagen: Subida de nueva, o mantenimiento/eliminación de la existente
            if (data.imagen instanceof File) {
                // Caso 1: El usuario seleccionó un NUEVO archivo. Lo subimos.
                finalImageUrl = await uploadImage(data.imagen);

                // Si estamos editando y había una imagen antigua Y es diferente de la nueva, la eliminamos.
                if (isEditing && oldImageUrl && oldImageUrl !== "" && oldImageUrl !== finalImageUrl) {
                    try {
                        await storageService.deleteProductImage(oldImageUrl);
                        console.log(`Imagen antigua ${oldImageUrl} eliminada.`);
                    } catch (deleteError) {
                        console.warn("No se pudo eliminar la imagen antigua del storage:", deleteError);
                        // No lanzamos el error aquí para no bloquear la actualización del producto en DB
                    }
                }
            } else if (typeof data.imagen === 'string') {
                // Caso 2: La imagen del formulario es un string (URL existente o string vacío)
                finalImageUrl = data.imagen; // Usamos el string que viene del formulario (URL o "")

                // Si estamos editando y la nueva URL es vacía (usuario la borró) Y había una imagen antigua, la eliminamos.
                if (isEditing && finalImageUrl === "" && oldImageUrl && oldImageUrl !== "") {
                    try {
                        await storageService.deleteProductImage(oldImageUrl);
                        console.log(`Imagen antigua ${oldImageUrl} eliminada al dejar el campo vacío.`);
                    } catch (deleteError) {
                        console.warn("No se pudo eliminar la imagen antigua al dejar el campo vacío:", deleteError);
                    }
                }
                // Si finalImageUrl no es vacío y es igual a oldImageUrl, no hacemos nada (se mantiene la imagen)
                // Si finalImageUrl no es vacío y es diferente de oldImageUrl (e.g., se pegó una URL),
                // la imagen antigua también debería eliminarse. La lógica actual ya lo maneja si pasa por `File`
                // o si se vacía el campo. Si se pega una URL, tendrías que añadir un chequeo más específico
                // para `oldImageUrl !== finalImageUrl` también aquí, pero es un caso menos común para URL directa.
            } else {
                // Caso 3: `data.imagen` es `undefined` (el campo no se tocó o es opcional)
                // Si el campo de imagen no se modificó en el formulario, queremos mantener la imagen existente.
                finalImageUrl = oldImageUrl; // Mantenemos la imagen que ya tenía el producto.
                // Si `oldImageUrl` era `""` y `data.imagen` es `undefined`, `finalImageUrl` seguirá siendo `""`.
            }


            // --- Preparación y Llamada a la Mutación ---
            const productDataToSave: ProductInsert | ProductUpdate = { // Usa el tipo correcto aquí
                nombre: data.nombre,
                precio: Number(data.precio),
                descripcion: data.descripcion,
                categoria: data.categoria,
                disponible: data.disponible,
                imagen: finalImageUrl, // **Esta es la URL final que se guardará**
            };

            // 2. Guardar/Actualizar el producto en la base de datos
            if (isEditing) {
                // Asegúrate de pasar el ID del producto al objeto ProductUpdateDB
                await updateProduct({ ...productDataToSave as ProductUpdate, id: producto!.id });
                toast.success("Producto actualizado exitosamente.");
            } else {
                // Cuando creamos, `imagen` debería ser `string | null`, no un `File`.
                // Tu `createProduct` de `useCreateProduct` debe esperar `ProductInsert`.
                await createProduct(productDataToSave as ProductInsert);
                toast.success("Producto creado exitosamente.");
            }

            onClose();
        } catch (error) {
            console.error("Error al guardar producto:", error);
            toast.error("Error al guardar producto", {
                description: (error as Error).message || "Hubo un problema al procesar la solicitud.",
            });
        }
    };



    return (
        <Dialog open={open} onOpenChange={(isOpen) => {
            if (!isOpen) {
                form.reset()
                onClose()
            }
        }}>
            <DialogContent className="w-full max-w-xs sm:max-w-md p-2 sm:p-6 max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>
                        {dialogTitle}
                    </DialogTitle>
                </DialogHeader>
                {/* Formulario */}
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="imagen"
                            render={({ field }) => (
                                <FormItem
                                    className="flex flex-col gap-2"
                                >
                                    <FormLabel>Imagen</FormLabel>
                                    <FormDescription>(Opcional)</FormDescription>
                                    <FormControl>
                                        <ImageUpload
                                            nameProduct={form.getValues("nombre")}
                                            value={field.value}
                                            onChange={(value: string | File | undefined) => field.onChange(value)}
                                            onRemove={() => field.onChange("")}
                                            disabled={isLoading}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="nombre"
                            render={({ field }) => (
                                <FormItem
                                    className="flex flex-col gap-2"
                                >
                                    <FormLabel>Nombre*</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Nombre" {...field} disabled={isLoading} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex flex-row gap-2">
                            <FormField
                                control={form.control}
                                name="precio"
                                render={({ field }) => (
                                    <FormItem
                                        className="flex flex-col gap-2"
                                    >
                                        <FormLabel>Precio*</FormLabel>
                                        <FormControl>
                                            <Input type='number' placeholder="Precio" {...field} disabled={isLoading} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="categoria"
                                render={({ field }) => (
                                    <FormItem
                                        className="flex flex-col gap-2"
                                    >
                                        <FormLabel>Categoría*</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            value={field.value}
                                            disabled={isLoading}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Selecciona una categoría" />
                                                </SelectTrigger>
                                            </FormControl>
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
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name="descripcion"
                            render={({ field }) => (
                                <FormItem
                                    className="flex flex-col gap-2"
                                >
                                    <FormLabel>Descripción*</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Descripción" {...field} disabled={isLoading} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name='disponible'
                            render={({ field }) => (
                                <FormItem
                                    className="flex items-center space-x-3"
                                >
                                    <Switch
                                        id="disponible"
                                        checked={field.value}
                                        onCheckedChange={(checked: boolean) => field.onChange(checked)}
                                        disabled={isLoading}
                                    />
                                    <Label htmlFor="disponible" className="cursor-pointer">
                                        Producto disponible para la venta
                                    </Label>
                                </FormItem>
                            )}
                        />
                        <div className='flex flex-row justify-end gap-2'>
                            <Button
                                variant="outline"
                                onClick={onClose}
                                disabled={isLoading}
                            >
                                <X className="mr-2 h-4 w-4" />
                                Cancelar
                            </Button>
                            <Button
                                type='submit'
                                disabled={isLoading}
                            >
                                <Save className="mr-2 h-4 w-4" />
                                Guardar
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default CrearProductoDialog
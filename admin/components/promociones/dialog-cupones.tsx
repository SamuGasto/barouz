import { Database } from "@/types/supabase";
import { useCrearCupon } from "@/hooks/useCupones";
import { useEditarCupon } from "@/hooks/useCupones";
import { useEliminarCupon } from "@/hooks/useCupones";
import { useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import z from "zod/v4";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Button } from "../ui/button";
import { ImageUpload } from "../ui/image-upload";
import { useHandleImageUpload } from "@/hooks/useUploadImage";

type CuponInsert = Database['public']['Tables']['cupon']['Insert'];
type CuponUpdate = Database['public']['Tables']['cupon']['Update'];
type CuponRow = Database['public']['Tables']['cupon']['Row'];

type CuponDialogProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    cupon_inicial: CuponRow | null;
};

const CuponFormSchema = z.object({
    nombre: z.string().min(1, "El nombre es requerido"),
    descripcion: z.string().min(1, "La descripción es requerida"),
    imagen_url: z.union([z.string(), z.instanceof(File)]).optional(),
    tipo_descuento: z.enum(["porcentaje", "valor"]),
    valor_descuento: z.number().min(1, "El valor es requerido"),
    fecha_inicio: z.string().min(1, "La fecha de inicio es requerida"),
    fecha_fin: z.string().min(1, "La fecha de fin es requerida"),
    hora_inicio: z.string().min(1, "La hora de inicio es requerida"),
    hora_fin: z.string().min(1, "La hora de fin es requerida"),
    disponible: z.boolean(),
});

function CuponDialog({ open, onOpenChange, cupon_inicial }: CuponDialogProps) {
    const { mutateAsync: crearCuponMutation, isPending: crearCuponLoading } = useCrearCupon();
    const { mutateAsync: editarCuponMutation, isPending: editarCuponLoading } = useEditarCupon();
    const { mutateAsync: eliminarCuponMutation, isPending: eliminarCuponLoading } = useEliminarCupon();
    const { mutateAsync: handleImageUpload, isPending: isHandlingImage } = useHandleImageUpload();

    const isEditing = !!cupon_inicial;
    const isBusy = crearCuponLoading || editarCuponLoading || eliminarCuponLoading || isHandlingImage;

    const form = useForm<z.infer<typeof CuponFormSchema>>({
        resolver: zodResolver(CuponFormSchema),
        defaultValues: {
            nombre: cupon_inicial?.nombre || "",
            descripcion: cupon_inicial?.descripcion || "",
            imagen_url: cupon_inicial?.imagen_url || "",
            tipo_descuento: cupon_inicial?.tipo_descuento || "porcentaje",
            valor_descuento: cupon_inicial?.valor_descuento || 0,
            fecha_inicio: cupon_inicial?.fecha_inicio || "",
            fecha_fin: cupon_inicial?.fecha_fin || "",
            hora_inicio: timeUnFormat(cupon_inicial?.hora_inicio || ""),
            hora_fin: timeUnFormat(cupon_inicial?.hora_fin || ""),
            disponible: cupon_inicial?.disponible || true,
        },
    });

    useEffect(() => {
        if (cupon_inicial) {
            form.reset({
                nombre: cupon_inicial.nombre,
                descripcion: cupon_inicial.descripcion,
                imagen_url: cupon_inicial.imagen_url,
                tipo_descuento: cupon_inicial.tipo_descuento,
                valor_descuento: cupon_inicial.valor_descuento,
                fecha_inicio: cupon_inicial.fecha_inicio,
                fecha_fin: cupon_inicial.fecha_fin,
                hora_inicio: timeUnFormat(cupon_inicial.hora_inicio),
                hora_fin: timeUnFormat(cupon_inicial.hora_fin),
                disponible: cupon_inicial.disponible,
            })
        } else {
            form.reset({
                nombre: "",
                descripcion: "",
                imagen_url: "",
                tipo_descuento: "porcentaje",
                valor_descuento: 0,
                fecha_inicio: "",
                fecha_fin: "",
                hora_inicio: "",
                hora_fin: "",
                disponible: true,
            })
        }
    }, [cupon_inicial, form])

    function timeUnFormat(time: string) {
        const first = time.split(":")[0];
        const second = time.split(":")[1];
        const final_string = `${first}:${second}`;
        return final_string;
    }
    function timeFormat(time: string) {
        return `${time}:00-4`
    }


    async function handleCreate(cupon: CuponInsert) {
        toast.promise(
            crearCuponMutation(cupon),
            {
                loading: "Creando...",
                success: () => {
                    onOpenChange(false);
                    return "Cupón creado";
                },
                error: "Error al crear",
            }
        );
    }

    async function handleUpdate(cupon: CuponUpdate) {
        if (!cupon_inicial || !cupon_inicial.id) return;

        toast.promise(
            editarCuponMutation({ ...cupon, id: cupon_inicial.id, hora_inicio: timeFormat(cupon.hora_inicio || ""), hora_fin: timeFormat(cupon.hora_fin || "") }),
            {
                loading: "Actualizando...",
                success: () => {
                    onOpenChange(false);
                    return "Cupón actualizado";
                },
                error: "Error al actualizar",
            }
        );
    }

    async function onSubmit(data: z.infer<typeof CuponFormSchema>) {
        try {
            const oldImageUrl: string = cupon_inicial?.imagen_url || "";

            // 1. Manejo de la imagen usando la función reutilizable
            const finalImageUrl: string = await handleImageUpload({
                newImageData: data.imagen_url,
                oldImageUrl: oldImageUrl,
                bucketName: "cupones", // Aquí defines el bucket específico para productos
                isEditing: isEditing,
            });

            // --- Preparación y Llamada a la Mutación ---
            const cuponDataToSave: CuponInsert | CuponUpdate = {
                ...data,
                imagen_url: finalImageUrl // **Esta es la URL final que se guardará**
            };

            // 2. Guardar/Actualizar el producto en la base de datos
            if (isEditing) {
                handleUpdate(cuponDataToSave as CuponUpdate);
            } else {
                handleCreate(cuponDataToSave as CuponInsert);
            }
        } catch (error) {
            console.error("Error al guardar el cupón:", error);
            toast.error("Error al guardar el cupón");
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="flex flex-col max-w-lg">
                <DialogHeader>
                    <DialogTitle>{isEditing ? "Editar cupón" : "Nuevo cupón"}</DialogTitle>
                    <DialogDescription>Completa los datos para crear o editar un cupón.</DialogDescription>
                </DialogHeader>
                <ScrollArea className="flex h-[70vh] w-full">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 px-4">
                            <FormField control={form.control} name="nombre" render={({ field }) => (
                                <FormItem
                                    className="flex flex-col gap-2"
                                >
                                    <FormLabel>Nombre</FormLabel>
                                    <FormControl>
                                        <Input
                                            value={field.value}
                                            onChange={field.onChange}
                                            disabled={isBusy}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <FormField control={form.control} name="descripcion" render={({ field }) => (
                                <FormItem
                                    className="flex flex-col gap-2"
                                >
                                    <FormLabel>Descripción</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            value={field.value}
                                            onChange={field.onChange}
                                            disabled={isBusy}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <FormField control={form.control} name="imagen_url" render={({ field }) => (
                                <FormItem
                                    className="flex flex-col gap-2"
                                >
                                    <FormLabel>Imagen</FormLabel>
                                    <FormControl>
                                        <ImageUpload
                                            nameProduct={form.getValues("nombre")}
                                            value={field.value}
                                            onChange={(value: string | File | undefined) => field.onChange(value)}
                                            onRemove={() => field.onChange("")}
                                            disabled={isBusy}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <FormField control={form.control} name="tipo_descuento" render={({ field }) => (
                                <FormItem
                                    className="flex flex-col gap-2"
                                >
                                    <FormLabel>Tipo de descuento</FormLabel>
                                    <FormControl>
                                        <select
                                            className="border rounded px-2 py-1"
                                            value={field.value}
                                            onChange={(e) => field.onChange(e.target.value)}
                                            disabled={isBusy}
                                        >
                                            <option value="porcentaje">Porcentaje (%)</option>
                                            <option value="valor">Monto ($)</option>
                                        </select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <FormField control={form.control} name="valor_descuento" render={({ field }) => (
                                <FormItem
                                    className="flex flex-col gap-2"
                                >
                                    <FormLabel>Valor</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            value={field.value}
                                            onChange={(e) => field.onChange(Number(e.target.value))}
                                            disabled={isBusy}
                                            min={0}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />

                            <div className="grid grid-cols-2 gap-2">
                                <FormField control={form.control} name="fecha_inicio" render={({ field }) => (
                                    <FormItem
                                        className="flex flex-col gap-2"
                                    >
                                        <FormLabel>Fecha inicio</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="date"
                                                value={field.value}
                                                onChange={(e) => field.onChange(e.target.value)}
                                                disabled={isBusy}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                                <FormField control={form.control} name="fecha_fin" render={({ field }) => (
                                    <FormItem
                                        className="flex flex-col gap-2"
                                    >
                                        <FormLabel>Fecha fin</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="date"
                                                value={field.value}
                                                onChange={(e) => field.onChange(e.target.value)}
                                                disabled={isBusy}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <FormField control={form.control} name="hora_inicio" render={({ field }) => (
                                    <FormItem
                                        className="flex flex-col gap-2"
                                    >
                                        <FormLabel>Hora inicio</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="time"
                                                value={field.value}
                                                onChange={(e) => field.onChange(e.target.value)}
                                                disabled={isBusy}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                                <FormField control={form.control} name="hora_fin" render={({ field }) => (
                                    <FormItem
                                        className="flex flex-col gap-2"
                                    >
                                        <FormLabel>Hora fin</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="time"
                                                value={field.value}
                                                onChange={(e) => {
                                                    field.onChange(e.target.value)
                                                }}
                                                disabled={isBusy}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                            </div>
                            <div className="flex items-center gap-2 mt-2">
                                <FormField control={form.control} name="disponible" render={({ field }) => (
                                    <FormItem
                                        className="flex flex-col gap-2"
                                    >
                                        <FormLabel>Disponible</FormLabel>
                                        <FormControl>
                                            <Switch
                                                checked={field.value}
                                                onCheckedChange={(v) => field.onChange(v)}
                                                disabled={isBusy}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                            </div>
                            <div className="flex justify-end gap-2">
                                <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isBusy}>
                                    Cancelar
                                </Button>
                                <Button type="submit" disabled={isBusy}>
                                    Guardar
                                </Button>
                            </div>
                        </form>
                    </Form>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
}

export default CuponDialog;
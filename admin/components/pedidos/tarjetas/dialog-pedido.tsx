"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil, Save, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useGestionarPedidoFinal } from "@/hooks/usePedidosFinales";
import { TodosLosPedidos } from "@/types/res_pedidos_final";
import { UsuarioRow } from "@/types/tipos_supabase_resumidos";
import GestorPedidos from "./gestor-pedidos";
import { Input } from "@/components/ui/input";

const CategoriaProductoEnum = z.enum([
  "Waffles",
  "Helados",
  "Churros",
  "Waffle Cookies",
  "Postres",
  "Bebidas",
  "Otros",
]);

function parseTimestamp(timestamp: string | undefined): { fecha: { year: string, month: string, day: string }, time: { hour: string, minute: string, second: string } } {
  if (!timestamp || timestamp === "") {
    // Si no hay timestamp, devolver la fecha y hora actuales
    const now = new Date();
    return {
      fecha: {
        year: now.getFullYear().toString(),
        month: (now.getMonth() + 1).toString().padStart(2, '0'),
        day: now.getDate().toString().padStart(2, '0')
      },
      time: {
        hour: now.getHours().toString().padStart(2, '0'),
        minute: now.getMinutes().toString().padStart(2, '0'),
        second: '00'
      }
    };
  }

  try {
    // Manejar tanto el formato ISO como el formato de entrada del input datetime-local
    const date = new Date(timestamp);
    if (isNaN(date.getTime())) {
      throw new Error('Fecha inválida');
    }

    return {
      fecha: {
        year: date.getFullYear().toString(),
        month: (date.getMonth() + 1).toString().padStart(2, '0'),
        day: date.getDate().toString().padStart(2, '0')
      },
      time: {
        hour: date.getHours().toString().padStart(2, '0'),
        minute: date.getMinutes().toString().padStart(2, '0'),
        second: '00'
      }
    };
  } catch (error) {
    console.error('Error al parsear fecha:', error);
    // Devolver fecha y hora actuales en caso de error
    const now = new Date();
    return {
      fecha: {
        year: now.getFullYear().toString(),
        month: (now.getMonth() + 1).toString().padStart(2, '0'),
        day: now.getDate().toString().padStart(2, '0')
      },
      time: {
        hour: now.getHours().toString().padStart(2, '0'),
        minute: now.getMinutes().toString().padStart(2, '0'),
        second: '00'
      }
    };
  }
}

// Esquema para un solo detalle (producto en el pedido)
const DetalleSchema = z.object({
  pedido_id: z.string().nullable(), // Puede ser nulo si es un nuevo producto
  producto: z.object({
    id: z.string(),
    nombre: z.string(),
    precio: z.number(),
    categoria_producto: CategoriaProductoEnum,
  }),
  cantidad: z.number().min(1),
  precio_final: z.number(),
  extras: z.array(
    z.object({
      extra_id: z.string(),
      extra_nombre: z.string(),
      cantidad: z.number().min(1),
      precio_final: z.number(),
    })
  ),
});

// Esquema para el formulario principal del pedido final
// Esquema base para la dirección que será condicional
export const DireccionSchema = z.string().min(1, "La dirección es requerida para envíos a domicilio").default("");

export const PedidoFinalScheme = z.object({
  user_id: z.string().min(1, "Debe seleccionar un usuario."),
  tipo_envio: z.enum(["Delivery", "Retiro en tienda"]),
  direccion: z.string().default("").optional(),
  estado: z.enum([
    "Recibido",
    "En preparación",
    "En camino",
    "Entregado",
    "Cancelado",
  ]),
  razon_cancelacion: z.string().nullable().optional(),
  fecha_hora: z.object({
    fecha: z.object({
      year: z.string(),
      month: z.string(),
      day: z.string(),
    }),
    time: z.object({
      hour: z.string(),
      minute: z.string(),
      second: z.string(),
    }),
  }),
  detalles: z
    .array(DetalleSchema)
    .min(1, "El pedido debe tener al menos un producto."),
  total_final: z.number(),
  metodo_pago: z.enum(["Transferencia", "Efectivo"]),
  cupon_id: z.string().nullable().optional(),
});

// Esquema completo del diálogo, incluyendo el usuario seleccionado
export const DialogFormScheme = z.object({
  pedido_final: PedidoFinalScheme,
  usuario: z.object({ id: z.string() }), // Mantenemos esto para el selector, pero el valor real se toma de pedido_final.user_id
});

interface DialogPedidoProps extends React.HTMLAttributes<HTMLDivElement> {
  pedido_final_arg?: TodosLosPedidos["pedido_final"];
  usuarios: UsuarioRow[];
  children?: React.ReactNode;
}

const getInitialValues = (pedido_final_arg?: TodosLosPedidos["pedido_final"]): z.infer<typeof DialogFormScheme> => ({
  pedido_final: {
    user_id:
      pedido_final_arg?.informacion.user_id ||
      "15e5db76-857f-45fc-a561-62473a179df8", // Default a "Local Barouz"
    tipo_envio: pedido_final_arg?.informacion.tipo_envio || "Delivery",
    direccion: pedido_final_arg?.informacion.direccion || "",
    estado: pedido_final_arg?.informacion.estado || "Recibido",
    razon_cancelacion: pedido_final_arg?.informacion.razon_cancelacion || "",
    fecha_hora: parseTimestamp(pedido_final_arg?.informacion.fecha_hora),
    total_final: pedido_final_arg?.informacion.total_final || 0,
    metodo_pago: pedido_final_arg?.informacion.metodo_pago || "Efectivo",
    cupon_id: null,
    detalles:
      pedido_final_arg?.pedidos
        ?.filter((detalle) => detalle.producto)
        .map((detalle) => ({
          pedido_id: detalle.informacion.id,
          producto: {
            id: detalle.producto!.id,
            nombre: detalle.producto!.nombre,
            precio: detalle.producto!.precio,
            categoria_producto: detalle.producto!.categoria as any,
          },
          cantidad: detalle.informacion.cantidad,
          precio_final: detalle.informacion.precio_final,
          extras: detalle.extras
            .map((extra) => ({
              extra_id: extra.extra?.id,
              extra_nombre: extra.extra?.nombre,
              cantidad: extra.cantidad,
              precio_final: extra.precio_final,
            }))
            .filter((extra) => extra.extra_id && extra.extra_nombre) as {
              extra_id: string;
              extra_nombre: string;
              cantidad: number;
              precio_final: number;
            }[],
        })) || [],
  },
  usuario: {
    id:
      pedido_final_arg?.informacion.user_id ||
      "15e5db76-857f-45fc-a561-62473a179df8",
  },
});

export function DialogPedido({ pedido_final_arg, usuarios, className, children, ...rest }: DialogPedidoProps) {
  // Extraer solo las props que no son de botón para evitar conflictos de tipo
  const { onClick, onKeyDown, ...dialogProps } = rest as any;
  const [open, setOpen] = useState(false);
  const isEditing = !!pedido_final_arg;
  const [isCancelado, setIsCancelado] = useState(
    pedido_final_arg?.informacion.estado === "Cancelado"
  );
  const [isDelivery, setIsDelivery] = useState(
    pedido_final_arg?.informacion.tipo_envio === "Delivery"
  );


  const gestionarPedidoMutation = useGestionarPedidoFinal();
  const form = useForm<z.infer<typeof DialogFormScheme>>({
    resolver: zodResolver(DialogFormScheme),
    defaultValues: getInitialValues(pedido_final_arg),
  });

  // Update isDelivery state when tipo_envio changes
  const tipoEnvio = form.watch("pedido_final.tipo_envio");
  useEffect(() => {
    setIsDelivery(tipoEnvio === "Delivery");
  }, [tipoEnvio]);

  useEffect(() => {
    form.reset(getInitialValues(pedido_final_arg));
    setIsCancelado(pedido_final_arg?.informacion.estado === "Cancelado");
  }, [pedido_final_arg, form]);

  const detalles = form.watch("pedido_final.detalles");

  useEffect(() => {
    const nuevoTotal =
      detalles?.reduce((acc, pedido) => acc + pedido.precio_final, 0) || 0;
    form.setValue("pedido_final.total_final", nuevoTotal, { shouldValidate: true });
  }, [detalles, form]);

  const userId = form.watch("usuario.id");
  useEffect(() => {
    form.setValue("pedido_final.user_id", userId, { shouldValidate: true });
  }, [userId, form]);

  function onSubmit(values: z.infer<typeof DialogFormScheme>) {
    const { pedido_final } = values;

    // Validate delivery address if shipping type is Delivery
    if (pedido_final.tipo_envio === "Delivery" && (!pedido_final.direccion || pedido_final.direccion.trim() === "")) {
      form.setError("pedido_final.direccion", {
        type: "required",
        message: "La dirección es requerida para envíos a domicilio",
      });
      return;
    }

    const finalPayload: z.infer<typeof PedidoFinalScheme> = {
      ...pedido_final,
      detalles: detalles,
      razon_cancelacion: pedido_final.razon_cancelacion || "",
      tipo_envio: pedido_final.tipo_envio,
      direccion: pedido_final.tipo_envio === "Delivery" ? pedido_final.direccion : "",
      fecha_hora: pedido_final.fecha_hora,
      estado: pedido_final.estado,
    };

    gestionarPedidoMutation.mutate(
      {
        pedido_final_id: isEditing ? pedido_final_arg?.informacion.id : null,
        pedido_final: finalPayload,
        usuario_id: pedido_final.user_id,
      },
      {
        onSuccess: () => {
          toast.success(`Pedido ${isEditing ? "modificado" : "creado"} con éxito`);
          setOpen(false);
        },
        onError: (error) => {
          toast.error(
            `Error al ${isEditing ? "modificar" : "crear"} el pedido: ${error.message
            }`
          );
        },
      }
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div {...dialogProps}>
          <Button
            variant={isEditing ? "ghost" : "default"}
            size={isEditing ? "sm" : "default"}
            className={cn(
              isEditing
                ? "h-8 px-2 text-xs"
                : "h-10 px-4 py-2 text-sm font-medium transition-all duration-200",
              className
            )}
          >
            {isEditing ? (
              <>
                <Pencil className="h-3 w-3 mr-1" />
                Editar
              </>
            ) : (
              children || (
                <>
                  <Pencil className="h-4 w-4 mr-2" />
                  Nuevo Pedido
                </>
              )
            )}
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className="flex flex-col w-11/12 md:w-3/4">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Editar Pedido" : "Nuevo Pedido"}</DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Modifica los detalles del pedido y haz clic en guardar cuando termines."
              : "Llena los detalles del nuevo pedido y haz clic en guardar cuando termines."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <ScrollArea className="flex flex-col h-[400px] p-4">
              <FormField
                control={form.control}
                name="usuario.id"
                render={({ field }) => (
                  <FormItem className="flex flex-row w-full items-center col-span-3">
                    <FormLabel className="w-1/3">Usuario</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                        disabled={isEditing}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona un cliente" />
                        </SelectTrigger>
                        <SelectContent>
                          {usuarios
                            ?.sort((a, b) => {
                              if (a.id === "15e5db76-857f-45fc-a561-62473a179df8") return -1;
                              if (b.id === "15e5db76-857f-45fc-a561-62473a179df8") return 1;
                              return 0;
                            })
                            .map((usuario: UsuarioRow) => (
                              <SelectItem key={usuario.id} value={usuario.id}>
                                <p className={usuario.id === "15e5db76-857f-45fc-a561-62473a179df8" ? "font-semibold" : ""}>
                                  {usuario.nombre}
                                </p>
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="pedido_final.tipo_envio"
                render={({ field }) => (
                  <FormItem className="flex flex-row w-full mt-4 items-center col-span-3">
                    <FormLabel className="w-1/3">Tipo de envío</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="Retiro en tienda" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Retiro en tienda
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="Delivery" />
                          </FormControl>
                          <FormLabel className="font-normal">Delivery</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Dirección de entrega - Solo visible para envío a domicilio */}
              {isDelivery && (
                <FormField
                  control={form.control}
                  name="pedido_final.direccion"
                  render={({ field }) => (
                    <FormItem className="flex flex-col w-full mt-4">
                      <FormLabel className="mb-2">Dirección de entrega</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ingrese la dirección de entrega completa"
                          {...field}
                          value={field.value || ''}
                        />
                      </FormControl>
                      {form.formState.errors.pedido_final?.direccion && (
                        <p className="text-sm font-medium text-destructive mt-1">
                          {form.formState.errors.pedido_final.direccion.message}
                        </p>
                      )}
                    </FormItem>
                  )}
                />
              )}
              <FormField
                control={form.control}
                name="pedido_final.estado"
                render={({ field }) => (
                  <FormItem className="flex flex-row w-full mt-4 items-center col-span-3">
                    <FormLabel className="w-1/3">Estado</FormLabel>
                    <Select
                      value={field.value}
                      onValueChange={(value) => {
                        field.onChange(value);
                        setIsCancelado(value === "Cancelado");
                      }}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona un estado" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Recibido">Recibido</SelectItem>
                        <SelectItem value="En preparación">En preparación</SelectItem>
                        <SelectItem value="En camino">En camino</SelectItem>
                        <SelectItem value="Entregado">Entregado</SelectItem>
                        <SelectItem value="Cancelado">Cancelado</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="pedido_final.razon_cancelacion"
                render={({ field }) => (
                  <FormItem className="flex flex-row w-full my-4 items-center col-span-3">
                    <FormLabel className="w-1/3">Razón de cancelación</FormLabel>
                    <FormControl>
                      <Textarea
                        id="razon_cancelacion"
                        className="max-h-[100px]"
                        {...field}
                        value={field.value || ""}
                        placeholder="Motivo de la cancelación"
                        disabled={!isCancelado}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="pedido_final.fecha_hora"
                render={({ field }) => {
                  // Crear un valor compatible con datetime-local (YYYY-MM-DDTHH:MM)
                  const datetimeValue = `${field.value.fecha.year}-${field.value.fecha.month.padStart(2, '0')}-${field.value.fecha.day.padStart(2, '0')}T${field.value.time.hour.padStart(2, '0')}:${field.value.time.minute.padStart(2, '0')}`;

                  return (
                    <FormItem className="flex flex-row w-full my-4 items-center col-span-3">
                      <FormLabel className="w-1/3">Fecha y hora</FormLabel>
                      <FormControl>
                        <Input
                          id="fecha_hora"
                          type="datetime-local"
                          onChange={(e) => {
                            const fechaHora = e.target.value;
                            if (!fechaHora) return;

                            const [datePart, timePart] = fechaHora.split('T');
                            if (!datePart || !timePart) return;

                            const [year, month, day] = datePart.split('-');
                            const [hour, minute] = timePart.split(':');

                            field.onChange({
                              fecha: {
                                year,
                                month: month.padStart(2, '0'),
                                day: day.padStart(2, '0')
                              },
                              time: {
                                hour: hour.padStart(2, '0'),
                                minute: minute.padStart(2, '0'),
                                second: '00'
                              }
                            });
                          }}
                          value={datetimeValue}
                          min={`${new Date().getFullYear()}-01-01T00:00`}
                          max={`${new Date().getFullYear() + 1}-12-31T23:59`}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={form.control}
                name="pedido_final.detalles"
                render={({ field }) => (
                  <GestorPedidos detalles={field.value} onChange={field.onChange} />
                )}
              />


            </ScrollArea>
            <DialogFooter>
              <div className="flex w-full justify-between items-center">
                <div className="text-lg font-bold">
                  Total: ${form.watch("pedido_final.total_final")?.toFixed(2) || "0.00"}
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      form.reset(getInitialValues(pedido_final_arg));
                      setOpen(false);
                    }}
                  >
                    <X className="mr-2 h-4 w-4" />
                    Cancelar
                  </Button>
                  <Button type="submit" disabled={gestionarPedidoMutation.isPending}>
                    {gestionarPedidoMutation.isPending ? "Guardando..." : <><Save className="mr-2 h-4 w-4" /> Guardar Cambios</>}
                  </Button>
                </div>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

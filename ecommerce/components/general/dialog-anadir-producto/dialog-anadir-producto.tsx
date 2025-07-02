"use client";
import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";

import { useRouter } from "next/navigation";
import { Button } from "../../ui/button";
import { Pedido } from "@/data/tipos";
import { CheckCircle2, CirclePlus, Plus, ShoppingCart } from "lucide-react";
import TarjetaVentaProducto from "../tarjeta-venta-producto";
import extras_waffle from "@/data/extras-waffle";
import { ScrollArea } from "@/components/ui/scroll-area";
import Extras from "./extras";
import { Separator } from "@/components/ui/separator";
import { ProductoRow } from "@/types/resumen-tipos";
import { z } from "zod/v4";
import { CategoriaProductos } from "@/types/resumen-tipos";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useExtrasPorCategoriaProducto } from "@/hooks/useExtras";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import TarjetaExtra from "./waffles/tarjeta-detalle";
import { useCarritoStore } from "@/components/providers/carrito-provider";
import { toast } from "sonner";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

interface PropType {
  producto: ProductoRow;
}

const categoriasProducto: CategoriaProductos[] = [
  "Waffles",
  "Helados",
  "Churros",
  "Waffle Cookies",
  "Postres",
  "Bebidas",
  "Otros"
];

export const DialogProductSchema = z.object({
  producto_id: z.string().min(1, "El producto es requerido"),
  cantidad: z.number().min(1, "La cantidad es requerida"),
  extras: z.array(z.object({
    extra_id: z.string(),
    nombre: z.string(),
    cantidad: z.number(),
    precio: z.number(),
    precio_final: z.number(),
    categoria: z.string(),
  }))
})

export type ExtrasType = z.infer<typeof DialogProductSchema>["extras"];

function DialogAnadirProducto(props: PropType) {
  const { producto } = props;
  const { data: extras, isLoading: isLoadingExtras } = useExtrasPorCategoriaProducto(producto.categoria)
  const [open, setOpen] = React.useState(false);
  const [precioFinal, setPrecioFinal] = React.useState(producto.precio);
  const agregarAlCarrito = useCarritoStore((state) => state.agregarAlCarrito);
  const [showConfirmation, setShowConfirmation] = React.useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof DialogProductSchema>>({
    resolver: zodResolver(DialogProductSchema),
    defaultValues: {
      producto_id: producto.id,
      cantidad: 1,
      extras: extras?.map(extra => ({
        extra_id: extra.id,
        nombre: extra.nombre,
        cantidad: 0,
        precio: extra.precio,
        precio_final: 0,
        categoria: extra.categoria,
      })) || [],
    },
  })

  function CalcularPrecioFinal() {
    const precioFinalExtras = form.getValues("extras").reduce((total: number, extra: any) => total + extra.precio_final, 0);
    const precioFinal = (precioFinalExtras + producto.precio) * form.getValues("cantidad");
    setPrecioFinal(precioFinal);
  }

  useEffect(() => {
    if (!open) {
      form.reset({
        producto_id: producto.id,
        cantidad: 1,
        extras: extras?.map(extra => ({
          extra_id: extra.id,
          nombre: extra.nombre,
          cantidad: 0,
          precio: extra.precio,
          precio_final: 0,
          categoria: extra.categoria,
        })) || [],
      });
    }
  }, [open, extras]);

  function onSubmit(values: z.infer<typeof DialogProductSchema>) {
    const { producto_id, cantidad, extras } = values;

    // Filtrar solo los extras que tienen cantidad > 0
    const extrasSeleccionados = extras.filter(extra => extra.cantidad > 0);

    // Crear el ítem para el carrito
    const itemCarrito = {
      producto_id,
      nombre: producto.nombre,
      cantidad,
      precio_unitario: producto.precio,
      precio_final: precioFinal,
      extras: extrasSeleccionados,
      notas: "", // Puedes agregar un campo de notas si lo necesitas
      imagen: producto.imagen,
    };

    // Agregar al carrito
    agregarAlCarrito(itemCarrito);
    toast.success("Producto agregado al carrito");

    setShowConfirmation(true);
  }

  return (
    <>
      <Dialog modal open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="bg-brand-primary text-brand-primary-foreground hover:bg-brand-primary/90 flex w-full items-center justify-center gap-2">
            <CirclePlus />
            Agregar al carrito
          </Button>
        </DialogTrigger>
        <DialogContent className="flex max-h-[600px] w-fit min-w-[600px] flex-col gap-4">
          <DialogHeader>
            <DialogTitle>Personalización</DialogTitle>
            <DialogDescription>
              Personaliza tu producto a tu gusto antes de agregarlo al carrito.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="cantidad"
                render={({ field }) => (
                  <FormItem
                    className="flex w-full flex-col items-center justify-center gap-2"
                  >
                    <FormControl>
                      <TarjetaVentaProducto
                        producto={producto}
                        cantidad={field.value}
                        modificarCantidad={(nuevaCantidad) => {
                          const cantidadActual = field.value + nuevaCantidad;

                          if (cantidadActual > 0) {
                            field.onChange(cantidadActual);
                            CalcularPrecioFinal();
                          }


                          return false;
                        }}
                        eliminar={() => {
                          setOpen(false);
                        }}
                      />
                    </FormControl>
                    <FormDescription>
                      Cantidad de productos
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <ScrollArea className="flex max-h-[280px] w-full flex-col items-center justify-center gap-4">
                <FormField
                  control={form.control}
                  name="extras"
                  render={({ field }) => (
                    <FormItem
                      className="flex w-full flex-col items-center justify-center gap-2"
                    >
                      <FormLabel>Extras</FormLabel>
                      <FormControl>
                        <Extras
                          extras={field.value}
                          setExtra={(extras) => {
                            field.onChange(extras);
                            CalcularPrecioFinal();
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </ScrollArea>
              <DialogFooter className="flex w-full items-center justify-center gap-2 sm:flex-col">
                <Separator />
                <div className="flex w-full flex-row items-center justify-between gap-4">
                  <div className="flex flex-row items-center gap-2">
                    <p className="text-center text-xl font-light">Total</p>
                    <p className="text-brand-primary text-center text-2xl font-semibold">
                      ${precioFinal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                    </p>
                  </div>
                  <Button
                    className="bg-brand-primary text-brand-primary-foreground hover:bg-brand-primary/90"
                    type="submit"
                  >
                    Agregar al carrito
                  </Button>
                </div>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      {/* Diálogo de confirmación */}
      <AlertDialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <AlertDialogContent className="sm:max-w-[425px] text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle2 className="h-10 w-10 text-green-600" />
          </div>
          <AlertDialogHeader className="items-center">
            <AlertDialogTitle className="text-2xl">¡Producto Agregado!</AlertDialogTitle>
            <AlertDialogDescription className="text-base">
              Tu producto ha sido agregado al carrito de compras.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="mt-4 grid grid-cols-1 gap-3">
            <Button
              onClick={() => {
                setOpen(false);
                router.push('/cart');
              }}
              className="h-12 gap-2 text-base bg-brand-primary text-brand-primary-foreground hover:bg-brand-primary/90"
            >
              <ShoppingCart className="h-5 w-5" />
              Ver Carrito
            </Button>

            <Button
              variant="outline"
              onClick={() => {
                setOpen(false);
                setShowConfirmation(false);
                form.reset({
                  producto_id: producto.id,
                  cantidad: 1,
                  extras: extras?.map(extra => ({
                    extra_id: extra.id,
                    nombre: extra.nombre,
                    cantidad: 0,
                    precio: extra.precio,
                    precio_final: 0,
                    categoria: extra.categoria,
                  })) || [],
                });
              }}
              className="h-12 gap-2 text-base"
            >
              <Plus className="h-5 w-5" />
              Seguir Comprando
            </Button>
          </div>
        </AlertDialogContent>
      </AlertDialog></>
  );
}

export default DialogAnadirProducto;

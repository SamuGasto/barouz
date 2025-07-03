// app/cart/page.tsx
"use client";

import { useCarritoStore } from "@/components/providers/carrito-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, Trash2, Plus, Minus, ArrowLeft, ImageOffIcon, ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import AlertDialogDelete from "@/components/cart/alert-dialog-delete";
import AlertDialogEliminarCarrito from "@/components/cart/alert-dialog-eliminar-carrito";
import { z } from "zod/v4";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCupones } from "@/hooks/useCupones";
import { toast } from "sonner";

const CuponScheme = z.object({
    nombre: z.string(),
});

export default function CartPage() {
    const items = useCarritoStore((state) => state.items);
    const actualizarCantidad = useCarritoStore((state) => state.actualizarCantidad);
    const eliminarDelCarrito = useCarritoStore((state) => state.eliminarDelCarrito);
    const totalItems = useCarritoStore((state) => state.totalItems);
    const limpiarCarrito = useCarritoStore((state) => state.limpiarCarrito);
    const cupon = useCarritoStore((state) => state.cupon);
    const aplicarCupon = useCarritoStore((state) => state.aplicarCupon);
    const eliminarCupon = useCarritoStore((state) => state.eliminarCupon);
    const { data: cupones, isLoading: cuponesLoading } = useCupones();

    const form = useForm<z.infer<typeof CuponScheme>>({
        resolver: zodResolver(CuponScheme),
        defaultValues: {
            nombre: "",
        },
    });

    const handleUpdateQuantity = (id: string, change: number) => {
        const item = items.find(item => item.id === id);
        if (item) {
            const newQuantity = item.cantidad + change;
            if (newQuantity > 0) {
                actualizarCantidad(id, newQuantity);
            }
        }
    };

    const formatPrice = (price: number) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    const onSubmit = (data: z.infer<typeof CuponScheme>) => {
        const cuponSeleccionado = cupones?.find(cupon => cupon.nombre === data.nombre);
        if (cuponSeleccionado) {
            aplicarCupon(cuponSeleccionado);
            toast.success("Cupon aplicado correctamente");
        } else {
            toast.error("Cupon no encontrado");
        }
    };

    if (items.length === 0) {
        return (
            <div className="container mx-auto flex min-h-[70vh] flex-col items-center justify-center gap-6 py-12">
                <div className="flex flex-col items-center gap-4 text-center">
                    <div className="rounded-full bg-gray-100 p-4">
                        <ShoppingCart className="h-12 w-12 text-gray-400" />
                    </div>
                    <h1 className="text-2xl font-bold">Tu carrito está vacío</h1>
                    <p className="text-muted-foreground">
                        Aún no has agregado productos a tu carrito
                    </p>
                    <Button asChild className="mt-4">
                        <Link href="/menu">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Volver al menú
                        </Link>
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-6">
                <h1 className="text-3xl font-bold">Tu Carrito</h1>
                <p className="text-muted-foreground">
                    Revisa tus productos antes de finalizar tu pedido
                </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
                {/* Lista de productos */}
                <div className="space-y-4 md:col-span-2">
                    {items.map((item) => (
                        <Card key={item.id} className="flex overflow-hidden w-full h-fit px-2 py-2">
                            <div className="flex flex-col sm:flex-row">
                                <div className="relative h-40 w-full sm:h-32 sm:w-32">
                                    {item.imagen !== "" ? (
                                        <Image
                                            className="rounded-md object-cover"
                                            width={128}
                                            height={128}
                                            src={item.imagen}
                                            alt={item.nombre}
                                        />
                                    ) : (
                                        <div className="flex h-[128px] w-[128px] border border-dashed rounded-md items-center justify-center">
                                            <ImageOffIcon className="h-12 w-12" />
                                        </div>
                                    )}
                                </div>
                                <div className="flex flex-1 flex-col p-4">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h3 className="text-lg font-semibold">{item.nombre}</h3>
                                            <p className="text-sm text-muted-foreground">
                                                ${formatPrice(item.precio_unitario)} c/u
                                            </p>
                                        </div>

                                        <AlertDialogDelete funcionEliminar={() => eliminarDelCarrito(item.id)} />
                                    </div>

                                    {item.extras && item.extras.length > 0 && (
                                        <div className="mt-2 space-y-1">
                                            <p className="text-sm font-medium text-muted-foreground">
                                                Extras:
                                            </p>
                                            <div className="flex flex-wrap gap-1">
                                                {item.extras.map((extra) => (
                                                    <Badge
                                                        key={extra.extra_id}
                                                        variant="outline"
                                                        className="text-xs"
                                                    >
                                                        {extra.nombre} x{extra.cantidad}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    <div className="mt-auto flex items-center justify-between pt-4">
                                        <div className="flex items-center space-x-2">
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                className="h-8 w-8"
                                                onClick={() => handleUpdateQuantity(item.id, -1)}
                                            >
                                                <Minus className="h-4 w-4" />
                                            </Button>
                                            <span className="w-8 text-center">
                                                {item.cantidad}
                                            </span>
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                className="h-8 w-8"
                                                onClick={() => handleUpdateQuantity(item.id, 1)}
                                            >
                                                <Plus className="h-4 w-4" />
                                            </Button>
                                        </div>
                                        <p className="font-semibold">
                                            ${formatPrice(item.precio_final)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Resumen del pedido */}
                <div className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Resumen del pedido</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex justify-between">
                                <span>Subtotal ({totalItems} {totalItems === 1 ? 'producto' : 'productos'})</span>
                                <span>${formatPrice(items.reduce((sum, item) => sum + (item.precio_unitario * item.cantidad), 0))}</span>
                            </div>

                            <div className="flex justify-between font-medium">
                                <span>Total</span>
                                <span className="text-lg">${formatPrice(items.reduce((sum, item) => sum + item.precio_final, 0))}</span>
                            </div>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full flex-col items-center">
                                    <p className="font-semibold text-left">Cupón</p>
                                    <div className="flex w-full flex-row gap-1 justify-between">
                                        <FormField
                                            control={form.control}
                                            name="nombre"
                                            render={({ field }) => (
                                                <FormItem className="w-full">
                                                    <FormControl className="w-full">
                                                        <Input className="w-full" placeholder="Código de cupón" {...field} />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                        <Button type="submit"><Check className="h-4 w-4" /></Button>
                                    </div>
                                    <p className="text-muted-foreground text-sm">Introduce el código de cupón para aplicar el descuento.</p>
                                </form>
                            </Form>
                            {cupon && (
                                <div className="flex justify-between font-medium text-lime-500">
                                    <span>Descuento</span>
                                    <span className="text-md">-${formatPrice(cupon.valor_descuento)}</span>
                                </div>
                            )}
                        </CardContent>
                        <CardFooter className="flex flex-col gap-2">
                            <Button size="lg" className="w-full bg-brand-primary hover:bg-brand-primary/90">
                                Continuar al pago
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                            <AlertDialogEliminarCarrito funcionEliminar={limpiarCarrito} />
                        </CardFooter>
                    </Card>

                    <Button variant="link" asChild className="w-full">
                        <Link href="/menu" className="flex items-center">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Seguir comprando
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
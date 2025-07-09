// app/cart/page.tsx
"use client";

import { useCarritoStore } from "@/components/providers/carrito-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, Plus, Minus, ArrowLeft, ImageOffIcon, ArrowRight, Check, X, Tag, Percent, Trash2, AlertTriangle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { z } from "zod/v4";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCupones } from "@/hooks/useCupones";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const CuponScheme = z.object({
    nombre: z.string().min(1, "El código del cupón es requerido"),
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
    const router = useRouter();

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

    // Función para redondear al entero más cercano según normas chilenas
    const redondearChileno = (valor: number) => Math.round(valor);

    const formatPrice = (price: number) => {
        // Redondear al entero más cercano según normas chilenas
        const rounded = redondearChileno(price);
        // Formatear con separadores de miles
        return rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    // Calcular totales
    let subtotal = redondearChileno(items.reduce((sum, item) => sum + item.precio_final, 0));
    const valor_iva = 0.19;

    // Calcular base imponible (sin IVA)
    const baseImponible = redondearChileno(subtotal / (1 + valor_iva));
    // Calcular IVA sobre la base imponible
    const iva = redondearChileno(baseImponible * valor_iva);

    // El total sin descuento debe ser igual a subtotal (que ya incluye IVA)
    const totalSinDescuento = subtotal;

    // Calcular descuento sobre la base imponible (sin IVA)
    const descuento = cupon
        ? (cupon.tipo_descuento === 'porcentaje'
            ? redondearChileno(baseImponible * (cupon.valor_descuento / 100))
            : cupon.valor_descuento)
        : 0;

    const total = Math.max(0, redondearChileno(totalSinDescuento - descuento));

    const onSubmit = async (data: z.infer<typeof CuponScheme>) => {
        if (!data.nombre.trim()) {
            toast.error("Por favor ingresa un código de cupón");
            return;
        }

        const cuponSeleccionado = cupones?.find(c => c.nombre.toLowerCase() === data.nombre.toLowerCase());

        if (cuponSeleccionado) {
            // Verificar si el cupón ya está aplicado
            if (cupon?.id === cuponSeleccionado.id) {
                toast.info("Este cupón ya está aplicado");
                return;
            }

            // Verificar si el cupón está vencido
            const hoy = new Date();
            const fechaExpiracion = new Date(cuponSeleccionado.fecha_fin);

            if (fechaExpiracion < hoy) {
                toast.error("Este cupón ha expirado");
                return;
            }

            aplicarCupon(cuponSeleccionado);
            toast.success(`¡Cupón aplicado correctamente!`);
            form.reset({ nombre: "" });
        } else {
            toast.error("Cupón no encontrado o no válido");
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

                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 text-destructive hover:bg-destructive/10"
                                            onClick={() => {
                                                if (confirm(`¿Eliminar ${item.nombre} del carrito?`)) {
                                                    eliminarDelCarrito(item.id);
                                                }
                                            }}
                                            aria-label={`Eliminar ${item.nombre} del carrito`}
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
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
                                                type="button"
                                                variant="outline"
                                                size="icon"
                                                className="h-8 w-8"
                                                onClick={() => handleUpdateQuantity(item.id, -1)}
                                                aria-label={`Reducir cantidad de ${item.nombre}`}
                                            >
                                                <Minus className="h-4 w-4" />
                                            </Button>
                                            <span className="w-8 text-center">
                                                {item.cantidad}
                                            </span>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="icon"
                                                className="h-8 w-8"
                                                onClick={() => handleUpdateQuantity(item.id, 1)}
                                                aria-label={`Aumentar cantidad de ${item.nombre}`}
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
                <div className="space-y-6">
                    <Card className="border-primary/20">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-xl">Resumen del pedido</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span>Subtotal ({totalItems} {totalItems === 1 ? 'producto' : 'productos'})</span>
                                    <span>${formatPrice(subtotal)}</span>
                                </div>

                                <div className="flex justify-between text-sm">
                                    <span>IVA (19%)</span>
                                    <span>${formatPrice(iva)}</span>
                                </div>
                            </div>

                            <Separator className="my-2" />

                            {/* Cupón */}
                            <div className="space-y-3">
                                {cupon ? (
                                    <div className="rounded-lg bg-green-50 dark:bg-green-900/20 p-3">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <Tag className="h-4 w-4 text-green-600 dark:text-green-400" />
                                                <span className="text-sm font-medium text-green-800 dark:text-green-200">
                                                    Cupón: {cupon.nombre}
                                                </span>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="h-6 px-2 text-green-700 hover:bg-green-100 dark:text-green-300 dark:hover:bg-green-800/50"
                                                onClick={() => eliminarCupon()}
                                            >
                                                <X className="h-3.5 w-3.5" />
                                            </Button>
                                        </div>
                                        <div className="mt-1 flex justify-between text-sm">
                                            <span className="text-green-700 dark:text-green-300">
                                                Descuento {cupon.tipo_descuento === 'porcentaje' ? `(${cupon.valor_descuento}%)` : ''}
                                            </span>
                                            <span className="font-medium text-green-700 dark:text-green-300">
                                                -{formatPrice(descuento)}
                                            </span>
                                        </div>
                                    </div>
                                ) : (
                                    <Form {...form}>
                                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                                            <div className="flex gap-2">
                                                <FormField
                                                    control={form.control}
                                                    name="nombre"
                                                    render={({ field }) => (
                                                        <FormItem className="flex-1">
                                                            <FormControl>
                                                                <div className="relative">
                                                                    <Input
                                                                        placeholder="Código de cupón"
                                                                        className="pr-10"
                                                                        {...field}
                                                                    />
                                                                    <Tag className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                                                </div>
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <Button
                                                    type="submit"
                                                    variant="outline"
                                                    className="whitespace-nowrap"
                                                    disabled={cuponesLoading}
                                                >
                                                    {cuponesLoading ? 'Cargando...' : 'Aplicar'}
                                                </Button>
                                            </div>
                                        </form>
                                    </Form>
                                )}
                            </div>

                            <Separator className="my-2" />

                            {/* Total */}
                            <div className="space-y-2">
                                <div className="flex items-center justify-between font-medium">
                                    <span className="text-base text-foreground">Total</span>
                                    <div className="flex flex-col items-end">
                                        {cupon && (
                                            <span className="text-sm text-muted-foreground line-through">
                                                ${formatPrice(totalSinDescuento)}
                                            </span>
                                        )}
                                        <span className={cn(
                                            "text-xl font-semibold",
                                            cupon ? "text-green-600 dark:text-green-400" : "text-foreground"
                                        )}>
                                            ${formatPrice(total)}
                                        </span>
                                    </div>
                                </div>
                                {cupon && (
                                    <p className="text-xs text-green-600 dark:text-green-400">
                                        ¡Ahorras ${formatPrice(descuento)} con tu cupón!
                                    </p>
                                )}
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col gap-2">
                            <Button
                                className="w-full bg-brand-primary hover:bg-brand-primary/90 text-brand-primary-foreground"
                                size="lg"
                                onClick={() => router.push('/checkout')}
                            >
                                Proceder al pago
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                            <div className="flex flex-col gap-2 w-full">
                                <Button
                                    variant="outline"
                                    className="w-full text-destructive border-destructive/20 hover:bg-destructive/10 hover:text-destructive dark:text-red-400 dark:border-red-400/30 dark:hover:bg-red-900/20 dark:hover:text-red-300"
                                    onClick={() => {
                                        if (confirm('¿Estás seguro de que deseas vaciar el carrito?')) {
                                            limpiarCarrito();
                                        }
                                    }}
                                    aria-label="Vaciar carrito"
                                >
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Vaciar carrito
                                </Button>
                                <Button
                                    variant="outline"
                                    className="w-full hover:bg-primary/10 dark:hover:bg-primary/20"
                                    asChild
                                >
                                    <Link href="/menu">
                                        <ArrowLeft className="mr-2 h-4 w-4" />
                                        Continuar comprando
                                    </Link>
                                </Button>
                            </div>
                        </CardFooter>
                    </Card>


                </div>
            </div>
        </div>
    );
}
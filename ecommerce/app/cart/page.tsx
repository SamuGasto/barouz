// app/cart/page.tsx
"use client";

import { useCarritoStore } from "@/components/providers/carrito-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, Trash2, Plus, Minus, ArrowLeft, ImageOffIcon, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

export default function CartPage() {
    const items = useCarritoStore((state) => state.items);
    const actualizarCantidad = useCarritoStore((state) => state.actualizarCantidad);
    const eliminarDelCarrito = useCarritoStore((state) => state.eliminarDelCarrito);
    const totalItems = useCarritoStore((state) => state.totalItems);
    const limpiarCarrito = useCarritoStore((state) => state.limpiarCarrito);

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
                                            onClick={() => eliminarDelCarrito(item.id)}
                                            className="text-destructive hover:text-destructive/90"
                                        >
                                            <Trash2 className="h-5 w-5" />
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
                        </CardContent>
                        <CardFooter className="flex flex-col gap-2">
                            <Button size="lg" className="w-full bg-brand-primary hover:bg-brand-primary/90">
                                Continuar al pago
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                            <Button
                                variant="outline"
                                className="w-full"
                                onClick={limpiarCarrito}
                            >
                                Vaciar carrito
                            </Button>
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
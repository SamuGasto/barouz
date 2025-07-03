"use client";

import { Button } from "@/components/ui/button";
import { Loader2, Plus } from "lucide-react";
import { toast } from "sonner";
import { useCarritoStore } from "../providers/carrito-provider";
import { CuponRow } from "@/types/resumen-tipos";
import { useEffect, useState } from "react";

interface BotonAplicarCuponProps {
    cupon: CuponRow;
    className?: string;
}

export function BotonAplicarCupon({
    cupon,
    className = ""
}: BotonAplicarCuponProps) {
    const [isMounted, setIsMounted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const aplicarCupon = useCarritoStore((state) => state.aplicarCupon);
    const cuponActual = useCarritoStore((state) => state.cupon);

    // Check if current coupon is applied
    const isCuponAplicado = cuponActual?.id === cupon.id;

    // Set mounted state after component mounts on client
    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleAplicarCupon = async () => {
        if (isCuponAplicado) return;

        try {
            setIsLoading(true);
            await aplicarCupon(cupon);
            toast.success("¡Cupón aplicado correctamente!");
        } catch (error) {
            toast.error(
                error instanceof Error ? error.message : "Error al aplicar el cupón"
            );
        } finally {
            setIsLoading(false);
        }
    };

    // Don't render anything until mounted on client
    if (!isMounted) {
        return (
            <Button
                className={`w-full gap-2 ${className} opacity-0`}
                size="sm"
                aria-hidden="true"
            />
        );
    }

    return (
        <Button
            onClick={handleAplicarCupon}
            disabled={isLoading || isCuponAplicado}
            variant={!isCuponAplicado ? "default" : "secondary"}
            className={`w-full gap-2 bg-brand-primary hover:bg-brand-primary/80 ${className}`}
            size="sm"
        >
            {isLoading ? (
                <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Aplicando...
                </>
            ) : isCuponAplicado ? (
                "Aplicado"
            ) : (
                <>
                    <Plus className="h-4 w-4" />
                    Aplicar cupón
                </>
            )}
        </Button>
    );
}
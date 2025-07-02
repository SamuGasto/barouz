import React from "react";
import { ExtrasType } from "./dialog-anadir-producto";
import { useCategoriasExtras } from "@/hooks/useExtras";
import { Loader2, Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

interface PropType {
  extras: ExtrasType;
  setExtra: (extras: ExtrasType) => void;
}

function Extras({ extras, setExtra }: PropType) {
  const { data: categorias, isLoading } = useCategoriasExtras();

  const updateExtraQuantity = (extraId: string, change: number) => {
    const extraToUpdate = extras.find(e => e.extra_id === extraId);
    if (!extraToUpdate) return;

    // Get all extras in the same category
    const categoryExtras = extras.filter(e => e.categoria === extraToUpdate.categoria);
    const currentCategoryTotal = categoryExtras.reduce((sum, e) => sum + e.cantidad, 0);

    // Calculate new quantity for the target extra
    const currentQuantity = extraToUpdate.cantidad;
    let newQuantity = currentQuantity + change;

    // Enforce maximum 2 extras per category
    if (change > 0 && currentCategoryTotal >= 2) {
      // If trying to add but already at max for category
      return;
    }

    // Don't go below 0
    newQuantity = Math.max(0, newQuantity);

    // Update the extras array
    const updatedExtras = extras.map((extra) => {
      if (extra.extra_id === extraId) {
        return {
          ...extra,
          cantidad: newQuantity,
          precio_final: newQuantity * extra.precio,
        };
      }
      return extra;
    });

    setExtra(updatedExtras);
  };

  if (isLoading) {
    return (
      <div className="flex h-32 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-brand-primary" />
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      {categorias?.map((categoria) => {
        const categoriaExtras = extras.filter((extra) => extra.categoria === categoria);

        if (categoriaExtras.length === 0) return null;

        return (
          <div key={categoria} className="space-y-3">
            <div>
              <h3 className="text-lg font-semibold text-foreground">{categoria}</h3>
              <p className="text-sm text-muted-foreground">
                Personaliza tu pedido con estos extras (máximo 2 por categoría)
              </p>
            </div>

            <div className="space-y-2">
              {categoriaExtras.map((extra) => (
                <div
                  key={extra.extra_id}
                  className={cn(
                    "flex items-center justify-between rounded-lg border p-3 transition-all",
                    extra.cantidad > 0 ? "border-brand-primary/20 bg-brand-primary/5" : "border-border",
                  )}
                >
                  <div className="space-y-0.5">
                    <p className="font-medium">{extra.nombre}</p>
                    <p className="text-sm text-muted-foreground">
                      ${extra.precio.toLocaleString()}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => updateExtraQuantity(extra.extra_id, -1)}
                      disabled={extra.cantidad === 0}
                      className={cn(
                        "flex h-8 w-8 items-center justify-center rounded-full border transition-colors cursor-pointer",
                        extra.cantidad > 0
                          ? "border-brand-primary text-brand-primary hover:bg-brand-primary/10"
                          : "border-border text-muted-foreground"
                      )}
                    >
                      <Minus className="h-4 w-4" />
                    </button>

                    <span className="w-5 text-center font-medium">
                      {extra.cantidad}
                    </span>

                    <button
                      type="button"
                      onClick={() => updateExtraQuantity(extra.extra_id, 1)}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-brand-primary text-brand-primary transition-colors hover:bg-brand-primary/10 cursor-pointer"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <Separator className="my-2" />
          </div>
        );
      })}
    </div>
  );
}

export default Extras;

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Plus, Edit, Trash2 } from "lucide-react";

import { useCupones } from "@/hooks/useCupones";
import { useCrearCupon } from "@/hooks/useCupones";
import { useEditarCupon } from "@/hooks/useCupones";
import { useEliminarCupon } from "@/hooks/useCupones";
import CuponDialog from "@/components/promociones/dialog-cupones";
import Image from "next/image";
import { AlertDialog, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogDescription, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { CuponRow } from "@/types/tipos_supabase_resumidos";
import AlertDialogDeleteCupon from "@/components/promociones/alert-dialog";


export default function PromocionesPage() {
  const { data: cupones, isLoading: cuponesLoading } = useCupones();
  const { mutateAsync: crearCuponMutation } = useCrearCupon();
  const { mutateAsync: editarCuponMutation } = useEditarCupon();
  const { mutateAsync: eliminarCuponMutation } = useEliminarCupon();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [actualCupon, setActualCupon] = useState<CuponRow | null>(null);
  const [imageError, setImageError] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  function handleImageError() {
    setImageError(true);
  }

  function openCloseDialog(state: boolean, cupon?: CuponRow) {
    if (cupon) {
      setActualCupon(cupon);
    } else {
      setActualCupon(null);
    }
    setDialogOpen(state);
  }

  async function handleDelete(cupon: CuponRow) {
    console.log(cupon);
    toast.promise(
      eliminarCuponMutation(cupon.id),
      {
        loading: "Eliminando...",
        success: () => {
          return "Cupón eliminado";
        },
        error: (error) => {
          console.error("Error al eliminar cupon:", error)
          return `${error}`;
        },
      }
    );
  }



  return (
    <div className="max-w-7xl mx-auto py-8 px-2">
      <div className="flex flex-col gap-3 justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestión de Promociones y Cupones</h1>
        <Button onClick={() => openCloseDialog(true)} className="gap-2">
          <Plus size={18} /> Nuevo cupón
        </Button>
      </div>
      {cuponesLoading ? (
        <div className="text-center py-8">Cargando...</div>
      ) : cupones?.length === 0 ? (
        <div className="text-center text-muted-foreground py-8">
          No hay cupones registrados.
        </div>
      ) : (
        <div className="flex flex-wrap w-full max-w-7xl justify-center gap-4">
          {cupones?.map((cupon) => (
            <div key={cupon.id} className="flex flex-row w-lg h-fit items-center justify-start rounded-lg border p-4 gap-4 shadow-sm hover:shadow-md dark:hover:shadow-none hover:scale-101 transition-all">
              <div className="relative h-32 sm:h-48 aspect-square">
                {!imageError && cupon.imagen_url ? (
                  <Image
                    src={cupon.imagen_url || "/placeholder.svg"}
                    alt={cupon.nombre}
                    fill
                    className="object-cover rounded-lg dark:shadow-none shadow-lg"
                    onError={handleImageError}
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <div className="text-4xl mb-2">🧇</div>
                      <div className="text-sm">Sin imagen</div>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex h-full flex-col justify-between gap-2">
                <div className="flex flex-col gap-1">
                  <span className="font-semibold text-lg">{cupon.nombre}</span>
                  <span className="text-sm text-muted-foreground">{cupon.descripcion}</span>
                  <div className="flex gap-2 mt-1">
                    <Badge variant="outline">{cupon.tipo_descuento === "porcentaje" ? "%" : "$"} {cupon.tipo_descuento === "porcentaje" ? cupon.valor_descuento : new Intl.NumberFormat('es-CL').format(cupon.valor_descuento)}</Badge>
                    <Badge variant={cupon.disponible ? "default" : "destructive"}>{cupon.disponible ? "Activo" : "Inactivo"}</Badge>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="icon" variant="outline" onClick={() => openCloseDialog(true, cupon)}>
                    <Edit size={16} />
                  </Button>
                  <AlertDialogDeleteCupon cupon={cupon} handleRemove={handleDelete} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <CuponDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        cupon_inicial={actualCupon}
      />
    </div>
  );
}
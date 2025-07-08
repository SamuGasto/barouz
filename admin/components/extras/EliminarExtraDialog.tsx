"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useEliminarExtra } from "@/hooks/useExtras"
import { toast } from "sonner"

export function EliminarExtraDialog({ open, onOpenChange, extraId }: {
    open: boolean,
    onOpenChange: (open: boolean) => void,
    extraId: string
}) {
    const { mutateAsync: eliminar, isPending: eliminarLoading } = useEliminarExtra()

    const handleDelete = async () => {
        toast.promise(eliminar(extraId), {
            loading: "Eliminando...",
            success: () => {
                return "Extra eliminado";
            },
            error: (error) => {
                console.error("Error al eliminar extra:", error)
                return `${error}`;
            },
        })
        onOpenChange(false)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Eliminar Extra</DialogTitle>
                </DialogHeader>
                <p>¿Estás seguro de que quieres eliminar este extra?</p>
                <DialogFooter>
                    <Button variant="secondary" onClick={() => onOpenChange(false)}>
                        Cancelar
                    </Button>
                    <Button variant="destructive" onClick={handleDelete} disabled={eliminarLoading}>
                        Eliminar
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
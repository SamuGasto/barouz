"use client"

import { ExtraRow } from "@/components/extras/ExtrasRow"
import { Skeleton } from "@/components/ui/skeleton"
import { useState } from "react"
import { ExtraDialog } from "@/components/extras/ExtraDialog"
import { CategoriaProductos } from "@/types/tipos_supabase_resumidos"
import { useExtrasPorCategoriaProducto } from "@/hooks/useExtras"

export function ExtrasList({ categoria }: { categoria: CategoriaProductos }) {
    const { data: extras, isPending: cargandoExtras } = useExtrasPorCategoriaProducto(categoria)
    const [editExtra, setEditExtra] = useState<any | null>(null)

    if (cargandoExtras) return <Skeleton className="h-24 w-full" />

    return (
        <div>
            <table className="w-full text-sm border">
                <thead>
                    <tr className="bg-muted">
                        <th className="p-2 text-left">Nombre</th>
                        <th className="p-2 text-left">Precio</th>
                        <th className="p-2 text-left">Categoria</th>
                        <th className="p-2 text-left">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {extras?.extras?.length ? extras.extras.map(extra => (
                        <ExtraRow key={extra.id} extra={extra} onEdit={setEditExtra} />
                    )) : (
                        <tr>
                            <td colSpan={3} className="p-4 text-center text-muted-foreground">No hay extras en esta categoría.</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <ExtraDialog
                open={!!editExtra}
                onOpenChange={(open) => !open && setEditExtra(null)}
                extra={editExtra}
                categoria_producto={categoria}
            />
        </div>
    )
}
"use client"

import { Button } from "@/components/ui/button"
import { Trash2, Pencil } from "lucide-react"
import { useState } from "react"
import { EliminarExtraDialog } from "@/components/extras/EliminarExtraDialog"
import { ExtraRow as ExtraRowType } from "@/types/tipos_supabase_resumidos"

export function ExtraRow({ extra, onEdit }: { extra: ExtraRowType, onEdit: (extra: ExtraRowType) => void }) {
    const [openDelete, setOpenDelete] = useState(false)

    return (
        <tr>
            <td className="p-2">{extra.nombre}</td>
            <td className="p-2">${extra.precio?.toFixed(2)}</td>
            <td className="p-2">{extra.categoria}</td>
            <td className="p-2 flex gap-2">
                <Button size="icon" variant="ghost" onClick={() => onEdit(extra)}>
                    <Pencil className="w-4 h-4" />
                </Button>
                <Button size="icon" variant="destructive" onClick={() => setOpenDelete(true)}>
                    <Trash2 className="w-4 h-4" />
                </Button>
                <EliminarExtraDialog open={openDelete} onOpenChange={setOpenDelete} extraId={extra.id} />
            </td>
        </tr>
    )
}
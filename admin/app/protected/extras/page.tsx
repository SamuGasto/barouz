"use client"

import React, { useState } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ExtrasList } from "@/components/extras/ExtrasList"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ExtraDialog } from "@/components/extras/ExtraDialog"
import { CategoriaProductos } from "@/types/tipos_supabase_resumidos"

const categorias: CategoriaProductos[] = [
    "Waffles", "Helados", "Churros", "Waffle Cookies", "Postres", "Bebidas", "Otros"
]

export default function ExtrasPage() {
    const [categoria, setCategoria] = useState<CategoriaProductos>(categorias[0])
    const [openDialog, setOpenDialog] = useState(false)

    return (
        <div className="max-w-3xl mx-auto py-10">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">Gestión de Extras</h1>
                <Button onClick={() => setOpenDialog(true)}>
                    <Plus className="mr-2 w-4 h-4" /> Añadir Extra
                </Button>
            </div>
            <Tabs value={categoria} onValueChange={(value) => setCategoria(value as CategoriaProductos)}>
                <TabsList>
                    {categorias.map(cat => (
                        <TabsTrigger key={cat} value={cat}>{cat}</TabsTrigger>
                    ))}
                </TabsList>
            </Tabs>
            <div className="mt-6">
                <ExtrasList categoria={categoria} />
            </div>
            <ExtraDialog open={openDialog} onOpenChange={setOpenDialog} categoria_producto={categoria} />
        </div>
    )
}
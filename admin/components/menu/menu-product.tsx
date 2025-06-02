"use client"

import { Button } from "@/components/ui/button"
import { DollarSign, Plus } from "lucide-react"
import Image from "next/image"
import type { Product } from "@/types/product"

interface MenuProductProps {
    item: Product;
    onAddToOrder: (item: Product) => void;
}

export function MenuProduct({ item, onAddToOrder }: MenuProductProps) {
    return (
        <div
            className="rounded-lg shadow-sm flex flex-col md:flex-row gap-4 md:items-center p-4 md:p-6"
            onClick={() => onAddToOrder(item)}
        >
            <div className="relative h-36 w-full">
                <Image
                    src={item.imagen || "/placeholder.svg"}
                    alt={item.nombre}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </div>
            <div className="p-3 flex flex-col flex-1">
                <div className="font-medium">{item.nombre}</div>
                {item.descripcion && <div className="font-bold text-lg truncate">{item.descripcion}</div>}
                <div className="flex gap-2 mt-2 justify-end">
                    <div className="font-medium flex items-center">
                        <DollarSign className="h-3 w-3 mr-0.5" />
                        {item.precio?.toLocaleString()}
                    </div>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 rounded-full"
                        onClick={(e) => {
                            e.stopPropagation()
                            onAddToOrder(item)
                        }}
                    >
                        <Plus className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    )
}

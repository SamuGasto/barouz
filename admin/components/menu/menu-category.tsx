"use client"

import { MenuProduct } from "./menu-product"
import type { Product } from "@/types/product"

interface MenuCategoryProps {
    items: Product[];
    searchTerm: string;
    onAddToOrder: (item: Product) => void;
}

export function MenuCategory({ items, searchTerm, onAddToOrder }: MenuCategoryProps) {
    const filteredItems = items.filter((item) => item.nombre.toLowerCase().includes(searchTerm.toLowerCase()))

    if (filteredItems.length === 0) {
        return (
            <div className="text-center py-8 text-muted-foreground bg-muted/50 rounded-md">
                No se encontraron productos que coincidan con "{searchTerm}"
            </div>
        )
    }

    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredItems.map((item) => (
                <MenuProduct key={item.id} item={item} onAddToOrder={onAddToOrder} />
            ))}
        </div>
    )
}

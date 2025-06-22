"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MenuProductCard } from "./menu-product-card"

import type { Product } from "@/types/product";

interface MenuCategorySectionProps {
    category: {
        id: string;
        name: string;
        icon: React.ReactNode;
    };
    items: Product[];
    searchTerm: string;
    onEdit: (item: Product) => void;
    onDelete?: (itemId: string) => Promise<void>;
}

export function MenuCategorySection({ category, items, searchTerm, onEdit, onDelete }: MenuCategorySectionProps) {
    const filteredItems = items.filter((item) => item.nombre.toLowerCase().includes(searchTerm.toLowerCase()))

    return (
        <Card className="border rounded-md">
            <CardHeader>
                <CardTitle className="font-bold text-xl flex items-center gap-2">
                    {category.icon}
                    {category.name}
                </CardTitle>
                <CardDescription className="">
                    Gestiona los productos de {category.name.toLowerCase()}
                </CardDescription>
            </CardHeader>
            <CardContent>
                {filteredItems.length === 0 ? (
                    <div className="text-center py-8 rounded-md">
                        {searchTerm ? (
                            <>
                                No se encontraron productos que coincidan con "{searchTerm}"
                                <br />
                                <span className="text-sm">Intenta con otra búsqueda</span>
                            </>
                        ) : (
                            <>
                                No hay productos en esta categoría
                                <br />
                                <span className="text-sm">Añade productos para comenzar</span>
                            </>
                        )}
                    </div>
                ) : (
                    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                        {filteredItems.map((item) => (
                            <MenuProductCard key={item.id} item={item} onEdit={onEdit} onDelete={onDelete} />
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
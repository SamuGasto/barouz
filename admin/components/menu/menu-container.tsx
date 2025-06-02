"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MenuSearch } from "./menu-search"
import { MenuTabs } from "./menu-tabs"
import type { Product } from "@/types/product";

interface MenuCategory {
    id: string;
    name: string;
    items: Product[];
}

interface MenuContainerProps {
    categories: MenuCategory[];
    searchTerm: string;
    onSearchChange: (value: string) => void;
    onAddToOrder: (item: Product) => void;
}

export function MenuContainer({ categories, searchTerm, onSearchChange, onAddToOrder }: MenuContainerProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Menú</CardTitle>
                <MenuSearch searchTerm={searchTerm} onSearchChange={onSearchChange} />
            </CardHeader>
            <CardContent>
                <MenuTabs categories={categories} searchTerm={searchTerm} onAddToOrder={onAddToOrder} />
            </CardContent>
        </Card>
    )
}

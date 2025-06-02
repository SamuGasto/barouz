"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CakeSlice, IceCream, Candy, Coffee, Cookie, Snowflake } from "lucide-react"
import { MenuCategory } from "./menu-category"
import type { Product } from "@/types/product";

interface MenuCategoryType {
    id: string;
    name: string;
    items: Product[];
}

interface MenuTabsProps {
    categories: MenuCategoryType[];
    searchTerm: string;
    onAddToOrder: (item: Product) => void;
}

export function MenuTabs({ categories, searchTerm, onAddToOrder }: MenuTabsProps) {
    // Obtener el ícono para la categoría
    const getCategoryIcon = (categoryId: string) => {
        switch (categoryId) {
            case "waffles":
                return <CakeSlice className="h-4 w-4" />
            case "helados":
                return <IceCream className="h-4 w-4" />
            case "churros":
                return <Candy className="h-4 w-4" />
            case "bebestibles":
                return <Coffee className="h-4 w-4" />
            case "cookies":
                return <Cookie className="h-4 w-4" />
            case "postres":
                return <Snowflake className="h-4 w-4" />
            default:
                return <CakeSlice className="h-4 w-4" />
        }
    }

    return (
        <Tabs defaultValue="waffles" >
            <TabsList className="flex flex-nowrap overflow-x-auto scrollbar-thin scrollbar-thumb-muted rounded-md gap-1">

                {categories.map((category) => (
                    <TabsTrigger key={category.id} value={category.id} className="font-semibold flex items-center gap-1.5 px-2 py-1 text-xs min-w-[90px] sm:text-sm sm:px-4 sm:py-2 whitespace-nowrap">
                        {getCategoryIcon(category.id)}
                        {category.name}
                    </TabsTrigger>
                ))}
            </TabsList>

            {categories.map((category) => (
                <TabsContent key={category.id} value={category.id} >
                    <MenuCategory items={category.items} searchTerm={searchTerm} onAddToOrder={onAddToOrder} />
                </TabsContent>
            ))}
        </Tabs>
    )
}

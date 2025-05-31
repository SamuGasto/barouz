"use client"

import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Menu } from "@/utils/querys/menu/obtener-menu"
import { CakeSlice, Candy, Coffee, Cookie, IceCream, Snowflake } from 'lucide-react'
import TarjetaMenu from './tarjeta-menu'
import { categoriasMenu } from '@/types/categorias-menu'
import { DetallesSobrePedido } from '@/utils/querys/pedidos/obtener-pedidos-segun-pedido-final'

interface Props {
    menu: Menu
    detallesPedido: DetallesSobrePedido[]
    setDetallesPedido: (detallesPedido: DetallesSobrePedido[]) => void
}


function MenuCategoriasTabs({ menu, detallesPedido, setDetallesPedido }: Props) {
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
        <Tabs defaultValue="waffles" className="space-y-4">
            <TabsList className="flex flex-wrap">
                {categoriasMenu.map((category) => (
                    <TabsTrigger key={category.id} value={category.id} className="flex items-center gap-1.5">
                        {getCategoryIcon(category.id)}
                        {category.name}
                    </TabsTrigger>
                ))}
            </TabsList>

            {categoriasMenu.map((category) => (
                <TabsContent key={category.id} value={category.id} className="space-y-4">
                    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                        {menu.productos
                            .filter((item) => item.categoria.toLowerCase().includes(category.id))
                            .map((item) => (
                                <TarjetaMenu key={item.id} item={item} detallesPedido={detallesPedido} setDetallesPedido={setDetallesPedido} />
                            ))}
                    </div>
                </TabsContent>
            ))}
        </Tabs>
    )
}

export default MenuCategoriasTabs
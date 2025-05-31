"use client"

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import { HelpCircle } from "lucide-react"
import React, { useEffect, useState } from 'react'
import SeccionMenu from "@/components/nuevo-pedido/menu/seccion-menu"
import DetallesPedido from "@/components/nuevo-pedido/resumen/detalles-pedido"
import { Menu } from "@/utils/querys/menu/obtener-menu"
import obtenerMenu from "@/utils/querys/menu/obtener-menu"
import { DetallesSobrePedido } from "@/utils/querys/pedidos/obtener-pedidos-segun-pedido-final"

function NuevoPedido() {
    const [detallesPedido, setDetallesPedido] = useState<DetallesSobrePedido[]>([]) // Es para armar el pedido final
    const [menu, setMenu] = useState<Menu | null>(null)
    const [searchTerm, setSearchTerm] = useState<string>("")

    useEffect(() => {
        const fetchMenu = async () => {
            const menu = await obtenerMenu()
            setMenu(menu)
        }
        fetchMenu()
    }, [])

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold tracking-tight">Nuevo Pedido</h2>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="outline" size="icon">
                                <HelpCircle className="h-4 w-4" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Crea un nuevo pedido seleccionando productos del menú</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <div className="md:col-span-1 lg:col-span-2">
                    {menu && (
                        <SeccionMenu
                            menu={menu}
                            searchTerm={searchTerm}
                            onSearchChange={setSearchTerm}
                            detallesPedido={detallesPedido}
                            setDetallesPedido={setDetallesPedido}
                        />
                    )}
                </div>

                <div className="md:col-span-1">
                    <DetallesPedido
                        detallesPedido={detallesPedido}
                        setDetallesPedido={setDetallesPedido}
                    />
                </div>
            </div>
        </div>
    )
}

export default NuevoPedido
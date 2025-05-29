import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import React from 'react'

function FiltroEstado() {
    return (
        <div>
            <Tabs defaultValue='todos'>
                <TabsList>
                    <TabsTrigger value="todos">Todos</TabsTrigger>
                    <TabsTrigger value="recibidos">Recibidos</TabsTrigger>
                    <TabsTrigger value="en-preparacion">En Preparación</TabsTrigger>
                    <TabsTrigger value="en-camino">En Camino</TabsTrigger>
                </TabsList>
            </Tabs>
        </div>
    )
}

export default FiltroEstado
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import React from 'react'

function FiltroCompletado() {
    return (
        <div><Tabs defaultValue='activos'>
            <TabsList>
                <TabsTrigger value="activos">Activos</TabsTrigger>
                <TabsTrigger value="completados">Completados</TabsTrigger>
                <TabsTrigger value="todos">Todos</TabsTrigger>
            </TabsList>
        </Tabs></div>
    )
}

export default FiltroCompletado
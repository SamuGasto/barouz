import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import React from 'react'
import { Database } from '@/types/supabase'

interface Props {
    activeSubTab: 'Todos' | Database['public']['Enums']['EstadoPedidos']
    onSubTabChange: (value: 'Todos' | Database['public']['Enums']['EstadoPedidos']) => void
}

function FiltroEstado({ activeSubTab, onSubTabChange }: Props) {
    return (
        <Tabs defaultValue="Todos" value={activeSubTab} onValueChange={(value) => onSubTabChange(value as 'Todos' | Database['public']['Enums']['EstadoPedidos'])}>
            <TabsList className='flex flex-wrap md:flex-row items-center justify-center gap-1.5 h-fit' >
                <TabsTrigger
                    value="Todos"
                >
                    Todos
                </TabsTrigger>
                <TabsTrigger
                    value="Recibido"
                >
                    Recibidos
                </TabsTrigger>
                <TabsTrigger
                    value="En preparación"
                >
                    En preparación
                </TabsTrigger>
                <TabsTrigger
                    value="En camino"
                >
                    En camino
                </TabsTrigger>
                <TabsTrigger
                    value="Entregado"
                >
                    Entregados
                </TabsTrigger>
                <TabsTrigger
                    value="Cancelado"
                >
                    Cancelados
                </TabsTrigger>
            </TabsList>
        </Tabs>
    )
}

export default FiltroEstado
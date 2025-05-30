import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import React from 'react'

interface Props {
    activeSubTab: string
    onSubTabChange: (value: string) => void
}

function FiltroEstado({ activeSubTab, onSubTabChange }: Props) {
    return (
        <Tabs defaultValue="all" value={activeSubTab} onValueChange={onSubTabChange}>
            <TabsList>
                <TabsTrigger
                    value="all"
                >
                    Todos
                </TabsTrigger>
                <TabsTrigger
                    value="recibido"
                >
                    Recibidos
                </TabsTrigger>
                <TabsTrigger
                    value="en preparación"
                >
                    En preparación
                </TabsTrigger>
                <TabsTrigger
                    value="en camino"
                >
                    En camino
                </TabsTrigger>
            </TabsList>
        </Tabs>
    )
}

export default FiltroEstado
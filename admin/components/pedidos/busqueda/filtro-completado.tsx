import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import React from 'react'

interface Props {
    activeTab: string
    onTabChange: (value: string) => void
}

function FiltroCompletado({ activeTab, onTabChange }: Props) {
    return (
        <div><Tabs defaultValue='activos' value={activeTab} onValueChange={onTabChange}>
            <TabsList>
                <TabsTrigger value="activos">Activos</TabsTrigger>
                <TabsTrigger value="completados">Completados</TabsTrigger>
                <TabsTrigger value="todos">Todos</TabsTrigger>
            </TabsList>
        </Tabs></div>
    )
}

export default FiltroCompletado
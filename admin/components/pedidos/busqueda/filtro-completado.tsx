import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import React from 'react'

interface Props {
    activeTab: 'Activos' | 'Completados' | 'Todos'
    onTabChange: (value: 'Activos' | 'Completados' | 'Todos') => void
}

function FiltroCompletado({ activeTab, onTabChange }: Props) {
    return (
        <div><Tabs defaultValue='Todos' value={activeTab} onValueChange={(value) => onTabChange(value as 'Activos' | 'Completados' | 'Todos')}>
            <TabsList>
                <TabsTrigger value="Todos">Todos</TabsTrigger>
                <TabsTrigger value="Activos">Activos</TabsTrigger>
                <TabsTrigger value="Completados">Completados</TabsTrigger>
            </TabsList>
        </Tabs></div>
    )
}

export default FiltroCompletado
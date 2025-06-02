"use client"

import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface MenuSearchProps {
    searchTerm: string
    onSearchChange: (value: string) => void
}

export function MenuSearch({ searchTerm, onSearchChange }: MenuSearchProps) {
    return (
        <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
                type="search"
                placeholder="Buscar productos..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
            />
        </div>
    )
}

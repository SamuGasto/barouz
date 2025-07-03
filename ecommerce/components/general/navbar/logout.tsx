"use client"
import React from 'react'
import { Button } from '@/components/ui/button'
import { LogOut } from 'lucide-react'
import { createClient } from '@/utils/supabase/client'

function Logout() {
    const supabase = createClient()
    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut()
        if (error) {
            console.error('Error al cerrar sesión:', error)
        }
    }
    return (
        <Button variant="outline" onClick={handleLogout}><LogOut className="mr-2 h-4 w-4" /> Logout</Button>
    )
}

export default Logout
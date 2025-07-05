"use client"
import React from 'react'
import { Button } from '@/components/ui/button'
import { LogOut } from 'lucide-react'
import { createClient } from '@/utils/supabase/client'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

function Logout() {
    const router = useRouter()

    const handleLogout = async () => {
        const supabase = createClient();
        const { error } = await supabase.auth.signOut()
        if (error) {
            console.error('Error al cerrar sesión:', error)
            toast.error('Error al cerrar sesión')
            return
        }
        toast.success('Sesión cerrada correctamente')
        router.push('/')
    }
    return (
        <Button variant="outline" onClick={handleLogout}><LogOut className="h-4 w-4" /></Button>
    )
}

export default Logout
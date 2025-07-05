"use client"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { LogIn, LogOut, Settings } from 'lucide-react'
import React from 'react'
import { ThemeSwitcher } from './theme-switcher'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { createClient } from '@/utils/supabase/client'
import { useAuth } from '@/components/providers/auth-provider'
import { Button } from '@/components/ui/button'

function UserData() {
    const router = useRouter()
    const { user } = useAuth()

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
        <div className='flex flex-row items-center gap-2'>
            {!user ?
                <Button variant="default" onClick={() => { router.push('/login') }}><LogIn className="h-4 w-4" />Iniciar Sesión</Button> :
                <p className='text-xs'>Hola, <span className='font-bold'>{user?.nombre}</span></p>
            }
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <div className='border rounded-md p-2 cursor-pointer'>
                        <Settings className='h-4 w-4' />
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem className='flex items-center cursor-pointer'><ThemeSwitcher /></DropdownMenuItem>
                    {user && <DropdownMenuItem className='flex flex-row items-center gap-2 cursor-pointer' onClick={() => handleLogout()}><LogOut className='h-4 w-4' />Cerrar Sesión</DropdownMenuItem>}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default UserData
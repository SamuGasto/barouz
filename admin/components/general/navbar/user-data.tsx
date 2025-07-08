"use client"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { LogIn, LogOut, Settings } from 'lucide-react'
import React from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useAuth } from '@/components/providers/auth-provider'
import { Button } from '@/components/ui/button'
import { signOutAction } from '@/app/actions'
import { ThemeSwitcher } from '../theme-switcher'

function UserData() {
    const router = useRouter()
    const { user, loading, updateUser } = useAuth()

    const handleLogout = async () => {
        try {
            const { success } = await signOutAction()
            if (success) {
                // Actualizar el estado de autenticación
                await updateUser()
                toast.success('Sesión cerrada correctamente')
                router.push('/login')
            }
        } catch (error) {
            console.error('Error al cerrar sesión:', error)

        }
    }
    return (
        <div className='flex flex-row items-center gap-2'>
            {loading ?
                <p>Cargando...</p> :
                user ? <p className='text-xs'>Hola, <span className='font-bold'>{user?.nombre}</span></p> :
                    <Button variant="default" onClick={() => { router.push('/login') }}>
                        <LogIn className="h-4 w-4" />Iniciar Sesión
                    </Button>
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
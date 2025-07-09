import React from 'react'
import { usuarioService } from '@/services/usuarios';
import { useQuery } from '@tanstack/react-query';

function useUsuarios() {
    return useQuery({
        queryKey: ["usuarios"],
        queryFn: () => usuarioService.obtenerTodosLosUsuarios(),
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: true,
    })
}

export function useUsuarioByID(id: string) {
    return useQuery({
        queryKey: ["usuario", id],
        queryFn: () => usuarioService.obtenerUsuarioPorID(id),
        staleTime: 5 * 60 * 1000,
    })
}

export default useUsuarios
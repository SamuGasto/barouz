import React from 'react'
import UsuarioService from '@/services/usuarios';

function useUsuarios() {
    const [usuarioService, setUsuarioService] = React.useState(new UsuarioService())
    const [loading, setLoading] = React.useState(true)

    React.useEffect(() => {
        const getData = async () => {
            await usuarioService.obtenerTodosLosUsuarios().then(() => setLoading(false))
        }
        getData()
    }, [])

    return { usuarioService, loading }
}

export default useUsuarios
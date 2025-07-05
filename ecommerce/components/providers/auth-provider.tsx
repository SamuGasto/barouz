// contexts/AuthContext.tsx
'use client'; // ¡Importante! Este es un Client Component

import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from 'react';
import { User } from '@supabase/supabase-js';
import { createClient } from '@/utils/supabase/client'; // Asegúrate de que la ruta sea correcta
import { toast } from 'sonner';

type UserExtend = User & {
    nombre: string;
}

interface AuthProviderProps {
    user: UserExtend | null;
    loading: boolean;
}

const AuthContext = createContext<AuthProviderProps | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<UserExtend | null>(null);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    useEffect(() => {
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange(async (_event, session) => {
            if (session?.user) {
                const { data: userDB, error: errorInUserDB } = await supabase.from('usuario').select('nombre').eq('id', session.user.id).single();
                if (errorInUserDB) {
                    console.error('Error al obtener el usuario:', errorInUserDB)
                    toast.error('Error al obtener el usuario')
                    return
                }
                setUser({ ...session.user, nombre: userDB?.nombre })
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        // Inicialmente, verifica si ya hay una sesión
        supabase.auth.getSession().then(async ({ data: { session } }) => {
            if (session?.user) {
                const { data: userDB, error: errorInUserDB } = await supabase.from('usuario').select('nombre').eq('id', session.user.id).single();
                if (errorInUserDB) {
                    console.error('Error al obtener el usuario:', errorInUserDB)
                    toast.error('Error al obtener el usuario')
                    return
                }
                setUser({ ...session.user, nombre: userDB?.nombre })
            } else {
                setUser(null);
            }
            setLoading(false);
        });



        return () => subscription.unsubscribe(); // Limpieza al desmontar
    }, [supabase]);

    return (
        <AuthContext.Provider value={{ user, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
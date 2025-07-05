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
        const FetchUser = async () => {
            const user = await supabase.auth.getUser();
            if (user.data.user) {
                const { data: userDB, error } = await supabase.from('usuario').select('nombre').eq('id', user.data.user.id).single();
                if (!userDB?.nombre || error) {
                    toast.error(error?.message || "Error al obtener el usuario");
                }
                const userFinal: UserExtend = {
                    ...user.data.user,
                    nombre: userDB?.nombre || ""
                }

                setUser(userFinal);
            }
        }
        FetchUser();
        setLoading(false);
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
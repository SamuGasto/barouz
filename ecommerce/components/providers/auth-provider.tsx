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
        // Log 9: AuthProvider montado
        console.log("AUTH PROVIDER: Componente montado. Iniciando verificación de sesión.");

        const fetchUserData = async (sessionUser: User | null) => {
            // Log 10: Datos de usuario de la sesión de Supabase
            console.log("AUTH PROVIDER: Sesión de Supabase recibida:", sessionUser ? sessionUser.id : "No hay sesión");

            if (sessionUser) {
                const { data: userDB, error: errorInUserDB } = await supabase
                    .from('usuario')
                    .select('nombre')
                    .eq('id', sessionUser.id)
                    .single();

                if (errorInUserDB) {
                    // Log 11: Error al obtener nombre de la DB
                    console.error('AUTH PROVIDER ERROR: Error al obtener nombre del usuario de la DB:', errorInUserDB.message);
                    toast.error('Error al cargar los datos del usuario.');
                    setUser(sessionUser as UserExtend); // Aún así, establece el usuario básico
                } else {
                    // Log 12: Nombre del usuario de la DB obtenido
                    console.log("AUTH PROVIDER: Nombre del usuario de la DB obtenido:", userDB?.nombre);
                    setUser({ ...sessionUser, nombre: userDB?.nombre });
                }
            } else {
                setUser(null);
            }
            setLoading(false); // La carga inicial o después del cambio ha terminado
            // Log 13: Carga del AuthProvider finalizada
            console.log("AUTH PROVIDER: loading es ahora false. Estado final del usuario:", user ? user.id : "null");
        };

        // 1. Obtener la sesión inicial
        supabase.auth.getSession().then(({ data: { session } }) => {
            fetchUserData(session?.user || null);
        }).catch(error => {
            // Log 14: Error al obtener la sesión inicial
            console.error("AUTH PROVIDER ERROR: Error al obtener la sesión inicial con getSession:", error.message);
            setLoading(false);
            setUser(null);
        });

        // 2. Suscribirse a los cambios de estado
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            // Log 15: Evento de cambio de estado de autenticación
            console.log("AUTH PROVIDER: Evento onAuthStateChange:", event, "Sesión:", session ? session.user?.id : "null");
            fetchUserData(session?.user || null);
        });

        return () => {
            // Log 16: AuthProvider desmontado / Limpieza de suscripción
            console.log("AUTH PROVIDER: Limpieza de suscripción onAuthStateChange.");
            subscription.unsubscribe();
        };
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
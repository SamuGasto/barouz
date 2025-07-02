// utils/supabase/server.ts
import { Database } from "@/types/supabase";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * Crea y devuelve un cliente de Supabase para su uso en el servidor.
 * Esta función debe ser llamada DENTRO de un Server Component, un Route Handler,
 * o una Server Action, ya que utiliza la API `cookies()` de Next.js.
 *
 * @returns Un cliente de Supabase configurado para el entorno del servidor.
 */
export const createClient = async () => {
  // Obtiene el almacén de cookies del contexto de la solicitud del servidor.
  // 'cookies()' solo puede ser llamado en el servidor.
  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        // Método para obtener todas las cookies del almacén de cookies.
        getAll() {
          return cookieStore.getAll();
        },
        // Método para establecer cookies.
        // El bloque try/catch es para manejar el caso en que 'set' es llamado
        // desde un Server Component, lo cual puede ocurrir si el middleware
        // ya ha refrescado la sesión del usuario.
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch (error) {
            // Este error significa que el método `set` de la cookie fue llamado
            // desde un Server Component. Esto es un comportamiento esperado si
            // tienes un middleware refrescando las sesiones de usuario.
            // Para más detalles, consulta:
            // https://supabase.com/docs/guides/auth/server-side/nextjs#refreshing-server-component-sessions
            console.warn(
              "No se pudieron establecer las cookies desde el Server Component:",
              error
            );
          }
        },
      },
    }
  );
};

// IMPORTANTE:
// Se eliminan las siguientes líneas:
// export const supabaseServer = createClient();
// export default supabaseServer;
//
// No debes exportar una instancia del cliente de Supabase que ya haya sido inicializada
// en el nivel superior del módulo, ya que esto causaría que `cookies()` se ejecute
// prematuramente en contextos no válidos (como Client Components).
// En su lugar, importa la función `createClient` y llámala (con `await`)
// directamente dentro de tus Server Components, Route Handlers o Server Actions.

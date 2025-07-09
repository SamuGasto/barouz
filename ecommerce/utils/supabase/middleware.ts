import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/mis-pedidos", "/checkout"];
const authRoutes = {
  login: "/login",
  register: "/register",
};

export const updateSession = async (request: NextRequest) => {
  // Log 17: Inicio de Middleware
  console.log(
    "MIDDLEWARE: Iniciando procesamiento de solicitud para:",
    request.nextUrl.pathname
  );

  // This `try/catch` block is only here for the interactive tutorial.
  // Feel free to remove once you have Supabase connected.
  try {
    // Create an unmodified response
    let response = NextResponse.next({
      request: {
        headers: request.headers,
      },
    });

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            // Log 18: Obteniendo todas las cookies en middleware
            console.log("MIDDLEWARE: Leyendo cookies de la solicitud.");
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value }) =>
                request.cookies.set(name, value)
              );
              response = NextResponse.next({
                request,
              });
              cookiesToSet.forEach(({ name, value, options }) =>
                response.cookies.set(name, value, options)
              );
              // Log 19: Cookies actualizadas en la respuesta del middleware
              console.log("MIDDLEWARE: Cookies actualizadas en la respuesta.");
            } catch (error) {
              // Log 20: Error al establecer cookies en middleware
              console.error(
                "MIDDLEWARE ERROR: Falló el seteo de cookies en response:",
                error
              );
            }
          },
        },
      }
    );

    // This will refresh session if expired - required for Server Components
    // https://supabase.com/docs/guides/auth/server-side/nextjs
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    // Log 21: Resultado de getUser en middleware
    if (userError) {
      console.error(
        "MIDDLEWARE ERROR: Error al obtener usuario en middleware:",
        userError.message
      );
    } else {
      console.log("MIDDLEWARE: Usuario en sesión:", user ? user.id : "null");
    }

    // protected routes
    if (
      protectedRoutes.some((route) =>
        request.nextUrl.pathname.startsWith(route)
      ) &&
      !user
    ) {
      // Log 22: Redirección por ruta protegida sin usuario
      console.log(
        "MIDDLEWARE: Usuario no autenticado en ruta protegida. Redirigiendo a /login"
      );
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // Log 24: Middleware finalizado, continuando con la respuesta
    console.log("MIDDLEWARE: Solicitud procesada, continuando.");
    return response;
  } catch (e: any) {
    // If you are here, a Supabase client could not be created!
    // This is likely because you have not set up environment variables.
    // Check out http://localhost:3000 for Next Steps.
    // Log 25: Error general en middleware
    console.error(
      "MIDDLEWARE FATAL ERROR: Error inesperado en middleware:",
      e.message,
      e
    );
    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    });
  }
};

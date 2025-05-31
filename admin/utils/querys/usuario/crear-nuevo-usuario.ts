import type { Database } from "@/types/supabase";
import { createClient } from "@/utils/supabase/server";

async function crearNuevoUsuario(datos: {
  nombre: string;
  apellido: string;
  telefono: string;
  direccion: string;
  email: string;
  password: string;
}) {
  const supabase = await createClient();

  const { data: dataUsuario, error: errorUsuario } = await supabase
    .from("usuario")
    .insert([
      {
        nombre: datos.nombre,
        apellido: datos.apellido,
        telefono: datos.telefono,
        direccion: datos.direccion,
        email: datos.email,
        password: datos.password,
      },
    ])
    .select();

  if (errorUsuario) {
    console.error("Error al crear usuario:", errorUsuario);
    return null;
  }

  const { data: dataAuth, error: errorAuth } = await supabase.auth.signUp({
    email: datos.email,
    password: datos.password,
    phone: datos.telefono,
  });

  if (errorAuth) {
    console.error("Error al crear usuario:", errorAuth);
    return null;
  }

  return dataUsuario;
}

export default crearNuevoUsuario;

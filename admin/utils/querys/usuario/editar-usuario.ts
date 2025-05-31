import { createClient } from "@/utils/supabase/server";

async function editarUsuario(
  id: string,
  newDatos: {
    nombre?: string;
    apellido?: string;
    telefono?: string;
    direccion?: string;
    email?: string;
    password?: string;
  },
) {
  const supabase = await createClient();

  const { data: dataUsuario, error: errorUsuario } = await supabase
    .from("usuario")
    .update(newDatos)
    .eq("id", id);

  if (errorUsuario) {
    console.error("Error al editar usuario:", errorUsuario);
    return null;
  }

  return dataUsuario;
}

export default editarUsuario;

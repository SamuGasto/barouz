import { Database } from "@/types/supabase";
import { supabase } from "@/utils/supabase/client";

type UsuarioRow = Database["public"]["Tables"]["usuario"]["Row"];
type UsuarioInsert = Database["public"]["Tables"]["usuario"]["Insert"];
type UsuarioUpdate = Database["public"]["Tables"]["usuario"]["Update"];

class UsuarioService {
  public async obtenerTodosLosUsuarios(): Promise<UsuarioRow[]> {
    const { data, error } = await supabase.from("usuario").select("*");

    if (error) {
      console.error("Error al obtener datos de la base de usuarios:", error);
      throw error;
    }

    return data;
  }

  public async obtenerUsuarioPorID(id: string): Promise<UsuarioRow> {
    if (!id || id === "") {
      throw new Error("No se proporciono un ID");
    }

    const { data, error } = await supabase
      .from("usuario")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error al obtener datos de la base de usuarios:", error);
      throw error;
    }

    return data;
  }

  public async crearUsuario(usuario: UsuarioInsert): Promise<UsuarioRow> {
    const { data, error } = await supabase
      .from("usuario")
      .insert([usuario])
      .select("*")
      .single();

    if (error) {
      console.error("Error al crear usuario:", error);
      throw error;
    }

    return data;
  }

  public async actualizarUsuario(usuario: UsuarioUpdate): Promise<UsuarioRow> {
    if (!usuario.id || usuario.id === "") {
      throw new Error("No se proporciono un ID");
    }

    const { data, error } = await supabase
      .from("usuario")
      .update(usuario)
      .eq("id", usuario.id)
      .select("*")
      .single();

    if (error) {
      console.error("Error al actualizar usuario:", error);
      throw error;
    }

    return data;
  }

  public async eliminarUsuario(id: string): Promise<boolean> {
    const { error } = await supabase.from("usuario").delete().eq("id", id);

    if (error) {
      console.error("Error al eliminar usuario:", error);
      throw error;
    }

    return true;
  }
}

export const usuarioService = new UsuarioService();
export default usuarioService;

import { Database } from "@/types/supabase";
import { supabase } from "@/utils/supabase/client";

class UsuarioService {
  public usuarios: Database["public"]["Tables"]["usuario"]["Row"][];

  constructor() {
    this.usuarios = [];
  }

  public async obtenerTodosLosUsuarios(): Promise<
    Database["public"]["Tables"]["usuario"]["Row"][]
  > {
    try {
      const { data, error } = await supabase.from("usuario").select("*");

      if (error) {
        console.error("Error al obtener usuarios:", error);
        return [];
      }

      this.usuarios = data;
      return data;
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
      return [];
    }
  }
}

export default UsuarioService;

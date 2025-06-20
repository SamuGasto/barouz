import { SupabaseClient } from "@supabase/supabase-js";
import Supabase from "@/lib/supabase";
import { Database } from "@/types/supabase";

class UsuarioService {
  private client: SupabaseClient<any, "public", any>;

  constructor() {
    this.client = Supabase.getClient();
  }

  public async obtenerTodosLosUsuarios(): Promise<
    Database["public"]["Tables"]["usuario"]["Row"][]
  > {
    try {
      const { data, error } = await this.client.from("usuario").select("*");

      if (error) {
        console.error("Error al obtener usuarios:", error);
        return [];
      }

      return data;
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
      return [];
    }
  }
}

export default UsuarioService;

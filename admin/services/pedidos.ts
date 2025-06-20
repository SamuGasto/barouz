import Supabase from "@/lib/supabase";
import { Database } from "@/types/supabase";
import { SupabaseClient } from "@supabase/supabase-js";

class PedidoService {
  private client: SupabaseClient<any, "public", any>;

  constructor() {
    this.client = Supabase.getClient();
  }

  public async obtenerTodosLosPedidos(): Promise<
    Database["public"]["Tables"]["pedido_final"]["Row"][]
  > {
    try {
      const { data, error } = await this.client
        .from("pedido_final")
        .select("*");

      if (error) {
        console.error("Error al obtener pedidos:", error);
        return [];
      }

      return data;
    } catch (error) {
      console.error("Error al obtener pedidos:", error);
      return [];
    }
  }
}

export default PedidoService;

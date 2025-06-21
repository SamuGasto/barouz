import { Database } from "@/types/supabase";
import { supabase } from "@/utils/supabase/client";

class PedidoService {
  public pedidos: Database["public"]["Tables"]["pedido_final"]["Row"][];

  constructor() {
    this.pedidos = [];
  }

  public async cargarPedidos(): Promise<
    Database["public"]["Tables"]["pedido_final"]["Row"][]
  > {
    try {
      const { data, error } = await supabase.from("pedido_final").select("*");

      if (error) {
        console.error("Error al obtener pedidos:", error);
        return [];
      }

      this.pedidos = data;
      return data;
    } catch (error) {
      console.error("Error al obtener pedidos:", error);
      return [];
    }
  }
}

export default PedidoService;

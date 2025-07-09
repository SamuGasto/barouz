import { createClient } from "@/utils/supabase/client";

class HorariosService {
  async getHorarios() {
    const supabase = createClient();
    const { data: horarios, error } = await supabase
      .from("horario")
      .select("*");
    if (error) throw error;
    return horarios;
  }
  async getHorarioPorLocal(local_id: string) {
    const supabase = createClient();
    const { data: horario, error } = await supabase
      .from("horario")
      .select("*")
      .eq("local_id", local_id)
      .single();
    if (error) throw error;
    return horario;
  }
}

export const horariosService = new HorariosService();
export default horariosService;

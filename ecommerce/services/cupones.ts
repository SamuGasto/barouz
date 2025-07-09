import { createClient } from "@/utils/supabase/client";

class CuponesService {
  public async obtenerTodosLosCupones() {
    const supabase = createClient();
    const { data: cupones } = await supabase.from("cupon").select("*");
    return cupones;
  }

  public async obtenerCuponPorId(id: string) {
    const supabase = createClient();
    const { data: cupon } = await supabase
      .from("cupon")
      .select("*")
      .eq("id", id);
    return cupon;
  }
}

export const cuponesService = new CuponesService();
export default cuponesService;

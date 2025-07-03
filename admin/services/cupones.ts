import { createClient } from "@/utils/supabase/client";
import {
  CuponRow,
  CuponInsert,
  CuponUpdate,
} from "@/types/tipos_supabase_resumidos";

class CuponesService {
  public async obtenerTodosLosCupones(): Promise<CuponRow[]> {
    const supabase = createClient();
    const { data, error } = await supabase.from("cupon").select("*");

    if (error) {
      console.error("Error al obtener cupones:", error);
      throw error;
    }

    return data;
  }

  public async obtenerCuponPorId(id: string): Promise<CuponRow> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("cupon")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error al obtener cupon:", error);
      throw error;
    }

    return data;
  }

  public async crearCupon(cupon: CuponInsert): Promise<CuponRow> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("cupon")
      .insert(cupon)
      .select("*")
      .single();

    if (error) {
      console.error("Error al crear cupon:", error);
      throw error;
    }

    return data;
  }

  public async editarCupon(cupon: CuponUpdate): Promise<CuponRow> {
    const supabase = createClient();
    if (!cupon.id) {
      throw new Error("El ID del cupon es requerido");
    }

    const { data, error } = await supabase
      .from("cupon")
      .update(cupon)
      .eq("id", cupon.id)
      .select("*")
      .single();

    if (error) {
      console.error("Error al editar cupon:", error);
      throw error;
    }

    return data;
  }

  public async eliminarCupon(id: string): Promise<boolean> {
    const supabase = createClient();
    const { error } = await supabase.from("cupon").delete().eq("id", id);

    if (error) {
      console.error("Error al eliminar cupon:", error);
      throw error;
    }

    return true;
  }
}

export const cuponesService = new CuponesService();
export default cuponesService;

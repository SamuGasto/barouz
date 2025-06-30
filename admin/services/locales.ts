import { Database } from "@/types/supabase";
import {
  LocalRow,
  LocalInsert,
  LocalUpdate,
  DiaSemana,
  LocalConHorarios,
} from "@/types/tipos_supabase_resumidos";
import supabase from "@/utils/supabase/client";

export type Locale = Database["public"]["Tables"]["local"]["Row"] & {
  horarios?: Database["public"]["Tables"]["horario"]["Row"][];
};

export type LocaleInsert = Database["public"]["Tables"]["local"]["Insert"] & {
  horarios?: Database["public"]["Tables"]["horario"]["Insert"][];
};

export type LocaleUpdate = Database["public"]["Tables"]["local"]["Update"] & {
  horarios?: Database["public"]["Tables"]["horario"]["Update"][];
};

class LocalesService {
  public async getLocales(): Promise<LocalConHorarios[]> {
    // Primero obtenemos los locales
    const { data: locales, error } = await supabase
      .from("local")
      .select("*, horarios(*)")
      .order("nombre", { ascending: true });

    if (error) {
      console.error("Error fetching locales:", error);
      throw error;
    }

    // Luego obtenemos todos los horarios
    const { data: horarios, error: horariosError } = await supabase
      .from("horario")
      .select("*");

    if (horariosError) {
      console.error("Error fetching horarios:", horariosError);
      throw horariosError;
    }

    // Combinamos los datos
    return (locales || []).map((locale) => ({
      ...locale,
      horarios: (horarios || []).filter((h) => h.local_id === locale.id),
    }));
  }

  public async getLocaleById(id: string): Promise<LocalConHorarios | null> {
    // Obtener el local
    const { data: locale, error } = await supabase
      .from("local")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !locale) {
      console.error("Error fetching locale:", error);
      throw error;
    }

    // Obtener sus horarios
    const { data: horarios, error: horariosError } = await supabase
      .from("horario")
      .select("*")
      .eq("local_id", id);

    if (horariosError) {
      console.error("Error fetching horarios:", horariosError);
      throw horariosError;
    }

    return {
      ...locale,
      horarios: horarios || [],
    };
  }

  public async createLocale({
    horarios = [],
    ...locale
  }: LocaleInsert): Promise<Locale> {
    const { data: newLocale, error } = await supabase
      .from("local")
      .insert(locale)
      .select()
      .single();

    if (error) {
      console.error("Error creating locale:", error);
      throw error;
    }

    // Crear horarios si existen
    if (horarios && horarios.length > 0) {
      await this.saveHorarios(newLocale.id, horarios);
    }

    return this.getLocaleById(newLocale.id) as Promise<Locale>;
  }

  public async updateLocale({
    id,
    horarios = [],
    ...updates
  }: LocaleUpdate & { id: string }): Promise<Locale> {
    const { error } = await supabase.from("local").update(updates).eq("id", id);

    if (error) {
      console.error("Error updating locale:", error);
      throw error;
    }

    // Ensure we're passing a properly typed array to saveHorarios with local_id
    if (horarios && Array.isArray(horarios)) {
      const typedHorarios = horarios
        .filter(
          (h): h is { dia: DiaSemana; hora_inicio: string; hora_fin: string } =>
            Boolean(h?.dia && h?.hora_inicio && h?.hora_fin)
        )
        .map((horario) => ({
          ...horario,
          local_id: id, // Add the local_id to each horario
        }));

      await this.saveHorarios(id, typedHorarios);
    }

    return this.getLocaleById(id) as Promise<Locale>;
  }

  public async deleteLocale(id: string): Promise<void> {
    // Primero eliminamos los horarios asociados
    await supabase.from("horario").delete().eq("local_id", id);

    // Luego eliminamos el local
    const { error } = await supabase.from("local").delete().eq("id", id);

    if (error) {
      console.error("Error deleting locale:", error);
      throw error;
    }
  }

  public async saveHorarios(
    localId: string,
    horarios: Database["public"]["Tables"]["horario"]["Insert"][]
  ): Promise<void> {
    // Filter out any incomplete horarios and ensure required fields
    const validHorarios = horarios
      .filter((h) => h.dia && h.hora_inicio && h.hora_fin)
      .map((horario) => ({
        ...horario,
        local_id: localId,
        dia: horario.dia as DiaSemana, // Ensure dia is not undefined
        hora_inicio: horario.hora_inicio || "",
        hora_fin: horario.hora_fin || "",
      }));

    // Delete existing horarios
    await supabase.from("horario").delete().eq("local_id", localId);

    // Only insert if we have valid horarios
    if (validHorarios.length > 0) {
      const { error } = await supabase.from("horario").insert(validHorarios);
      if (error) {
        console.error("Error saving horarios:", error);
        throw error;
      }
    }
  }
}

export const localesService = new LocalesService();
export default localesService;

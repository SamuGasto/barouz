import { Database } from "@/types/supabase";
import {
  LocalConHorarios,
  HorarioInsert
} from "@/types/tipos_supabase_resumidos";
import supabase from "@/utils/supabase/client";

type Horario = Database["public"]["Tables"]["horario"]["Row"];

export type Locale = Database["public"]["Tables"]["local"]["Row"] & {
  horarios: Horario[];
};

export type LocaleInsert = Database["public"]["Tables"]["local"]["Insert"] & {
  horarios?: HorarioInsert[];
};

export type LocaleUpdate = Database["public"]["Tables"]["local"]["Update"] & {
  horarios?: HorarioInsert[];
};

class LocalesService {
  public async getLocales(): Promise<LocalConHorarios[]> {
    const { data: locales, error } = await supabase
      .from("local")
      .select(`
        *,
        horarios:horario(*)
      `)
      .order("nombre", { ascending: true });

    if (error) {
      console.error("Error fetching locales:", error);
      throw error;
    }

    return (locales || []).map((locale) => ({
      ...locale,
      horarios: locale?.horarios || [],
    })) as LocalConHorarios[];
  }

  public async getLocaleById(id: string): Promise<LocalConHorarios | null> {
    const { data: locale, error } = await supabase
      .from("local")
      .select(`
        *,
        horarios:horario(*)
      `)
      .eq("id", id)
      .single();

    if (error) {
      console.error(`Error fetching locale ${id}:`, error);
      return null;
    }

    return {
      ...locale,
      horarios: locale?.horarios || [],
    } as LocalConHorarios;
  }

  public async createLocale(localeData: LocaleInsert): Promise<LocalConHorarios> {
    const { horarios, ...localeWithoutHorarios } = localeData;

    // Insert the locale
    const { data: newLocale, error: localeError } = await supabase
      .from('local')
      .insert(localeWithoutHorarios)
      .select()
      .single();

    if (localeError || !newLocale) {
      throw new Error(localeError?.message || 'Failed to create locale');
    }

    // Save horarios if provided
    if (horarios && horarios.length > 0) {
      await this.saveHorarios(newLocale.id, horarios);
    }

    // Return the complete locale with horarios
    const completeLocale = await this.getLocaleById(newLocale.id);
    if (!completeLocale) {
      throw new Error('Failed to fetch created locale');
    }

    return completeLocale;
  }

  public async updateLocale(id: string, updates: LocaleUpdate): Promise<LocalConHorarios> {
    const { horarios, ...localeUpdates } = updates;

    // Update basic locale data
    const { data: updatedLocale, error: updateError } = await supabase
      .from('local')
      .update(localeUpdates)
      .eq('id', id)
      .select()
      .single();

    if (updateError || !updatedLocale) {
      throw new Error(updateError?.message || 'Failed to update locale');
    }

    // Save horarios if provided
    if (horarios && horarios.length > 0) {
      await this.saveHorarios(id, horarios);
    }

    // Return the updated locale with horarios
    const updatedLocaleWithHorarios = await this.getLocaleById(id);
    if (!updatedLocaleWithHorarios) {
      throw new Error('Failed to fetch updated locale');
    }

    return updatedLocaleWithHorarios;
  }

  public async deleteLocale(id: string): Promise<void> {
    // First delete related schedules
    const { error: scheduleError } = await supabase
      .from("horario")
      .delete()
      .eq("local_id", id);
    
    if (scheduleError) {
      console.error('Error deleting schedules:', scheduleError);
      throw new Error('Failed to delete related schedules');
    }
    
    // Then delete the locale
    const { error: deleteError } = await supabase
      .from("local")
      .delete()
      .eq("id", id);
      
    if (deleteError) {
      console.error('Error deleting locale:', deleteError);
      throw new Error('Failed to delete locale');
    }
  }

  private async saveHorarios(localId: string, horarios: HorarioInsert[]): Promise<void> {
    if (!localId) {
      throw new Error('Local ID is required to save horarios');
    }

    // First delete existing schedules
    const { error: deleteError } = await supabase
      .from('horario')
      .delete()
      .eq('local_id', localId);

    if (deleteError) {
      console.error('Error deleting existing schedules:', deleteError);
      throw new Error('Failed to delete existing schedules');
    }

    // If no new schedules, we're done
    if (!horarios || horarios.length === 0) {
      return;
    }

    // Filter valid schedules
    const horariosValidos = horarios.filter(h => 
      h?.dia && h?.hora_inicio && h?.hora_fin
    );

    if (horariosValidos.length === 0) {
      return;
    }

    // Insert new schedules
    const { error: insertError } = await supabase
      .from('horario')
      .insert(
        horariosValidos.map(h => ({
          ...h,
          local_id: localId
        }))
      );

    if (insertError) {
      console.error('Error saving schedules:', insertError);
      throw new Error('Failed to save schedules');
    }
  }
}

// Create a single instance of the service
const localesService = new LocalesService();

export { localesService as default };

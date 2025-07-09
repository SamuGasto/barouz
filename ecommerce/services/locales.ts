import { createClient } from "@/utils/supabase/client";

class LocalesService {
  async getLocales() {
    const supabase = createClient();
    const { data: locales, error } = await supabase.from("local").select("*");
    if (error) throw error;
    return locales;
  }
}

export const localesService = new LocalesService();
export default localesService;

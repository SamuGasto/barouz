import { createClient as createClientServer } from "@/utils/supabase/server";
import { createClient as createClientClient } from "@/utils/supabase/client";
import { SupabaseClient } from "@supabase/supabase-js";

class Supabase {
  private static supabaseClient: SupabaseClient<any, "public", any>;
  private static supabaseServer: Promise<SupabaseClient<any, "public", any>>;

  constructor() {
    Supabase.supabaseClient = createClientClient();
    Supabase.supabaseServer = createClientServer();
  }

  public static getClient(): SupabaseClient<any, "public", any> {
    if (!Supabase.supabaseClient) {
      Supabase.supabaseClient = createClientClient();
    }
    return Supabase.supabaseClient;
  }

  public static getServer(): Promise<SupabaseClient<any, "public", any>> {
    if (!Supabase.supabaseServer) {
      Supabase.supabaseServer = createClientServer();
    }
    return Supabase.supabaseServer;
  }
}

export default Supabase;

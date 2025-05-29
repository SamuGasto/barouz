
import TarjetaEmpresaAuth from "@/components/general/tarjeta-empresa-auth";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {

  const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
  
    if (user) {
      return redirect("/protected");
    }

  return (
    <>
        <div className="flex h-screen w-full items-center justify-center md:flex-row flex-col">
        <TarjetaEmpresaAuth />
        <div className="flex w-full h-full items-center justify-center">
          {children}
        </div>
        </div>
    </>
  );
}

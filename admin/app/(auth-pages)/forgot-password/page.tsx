import { forgotPasswordAction } from "@/app/actions";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function ForgotPassword() {
  return (
    <>
    
      <form className="flex flex-col w-96 p-10 md:p-4">
        <div className="flex flex-row items-center gap-2">
          <Link href="/sign-in">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <div>
            <h1 className="text-2xl font-medium">Recuperar Contraseña</h1>
            <p className="text-sm text-secondary-foreground">
            ¿No tienes una cuenta?<br />
            <span className="font-semibold">Comunicate con un administrador</span>
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
          <Label htmlFor="email">Email</Label>
          <Input name="email" placeholder="you@example.com" required />
          <SubmitButton formAction={forgotPasswordAction}>
            Recuperar Contraseña
          </SubmitButton>
        </div>
      </form>
    </>
  );
}

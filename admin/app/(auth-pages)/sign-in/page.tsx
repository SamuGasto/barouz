import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default async function Login(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;


  return (
    <form className="flex flex-col w-96 p-10 md:p-4">
      <h1 className="text-2xl font-medium">Iniciar Sesión</h1>
      <p className="text-sm text-foreground">
        No tienes una cuenta?<br />
        Comunicate con un administrador
      </p>
      <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
        <Label htmlFor="email">Correo Electronico</Label>
        <Input name="email" placeholder="you@example.com" required />
        <div className="flex justify-between items-center">
          <Label htmlFor="password">Contraseña</Label>
          <Link
            className="text-xs text-foreground underline"
            href="/forgot-password"
          >
            ¿Olvidaste tu contraseña?
          </Link>
        </div>
        <Input
          type="password"
          name="password"
          placeholder="Tu contraseña"
          required
        />
        <SubmitButton pendingText="Iniciando Sesión..." formAction={signInAction}>
          Iniciar Sesión
        </SubmitButton>
        <FormMessage message={searchParams} />
      </div>
    </form>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/providers/auth-provider";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2, Mail, Lock, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { signInAction } from "@/app/actions";
import PasswordInput from "@/components/auth_pages/password";
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'; // Importa este tipo

const formSchema = z.object({
    email: z.string().email("Por favor ingresa un correo electrónico válido"),
    password: z.string().min(1, "La contraseña es requerida"),
});

type FormValues = z.infer<typeof formSchema>;

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { updateUser } = useAuth();
    const router2 = useRouter() as AppRouterInstance; // Castea el tipo para acceder a .isRedirectError


    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (values: FormValues) => {
        setIsLoading(true);
        // Log 1: Valores del formulario antes de enviar
        console.log("LOGIN CLIENT: Enviando valores de formulario:", values);

        try {
            const result = await signInAction(values);

            if (!result.success) {
                toast.error("Error al iniciar sesión");
                return;
            }

            // Actualizar el estado de autenticación
            await updateUser();

            console.log("LOGIN CLIENT: Inicio de sesión exitoso. Redireccionando...");
            toast.success("¡Inicio de sesión exitoso!");
            router.back(); // La Server Action ya maneja la redirección
        } catch (error: any) {
            // Log 2: Error capturado del Server Action
            console.error("LOGIN CLIENT ERROR: Error al intentar iniciar sesión:", error.message, error);

        } finally {
            setIsLoading(false);
            console.log("LOGIN CLIENT: Proceso de login finalizado.");
        }
    };

    return (
        <div className="container flex h-screen w-screen flex-col items-center justify-center">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
                <div className="flex flex-col space-y-2 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Iniciar sesión
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Ingresa tus credenciales para acceder a tu cuenta
                    </p>
                </div>

                <div className="grid gap-6">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Correo electrónico</FormLabel>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                            <FormControl>
                                                <Input
                                                    type="email"
                                                    placeholder="tucorreo@ejemplo.com"
                                                    className="pl-9"
                                                    disabled={isLoading}
                                                    autoComplete="username"
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                />
                                            </FormControl>
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="flex items-center justify-between">
                                            <FormLabel>Contraseña</FormLabel>
                                            <p
                                                onClick={() => router.replace("/recuperar-contrasena")}
                                                className="text-xs text-muted-foreground hover:underline"
                                            >
                                                ¿Olvidaste tu contraseña?
                                            </p>
                                        </div>
                                        <PasswordInput field={field} />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button
                                type="submit"
                                className="w-full bg-brand-primary hover:bg-brand-primary/90"
                                disabled={isLoading}
                            >
                                {isLoading && (
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                )}
                                Iniciar sesión
                            </Button>
                        </form>
                    </Form>


                    <p className="px-8 text-center text-sm text-muted-foreground">
                        ¿No tienes una cuenta?{" "}
                        <Link
                            href="/register"
                            className="underline underline-offset-4 hover:text-brand-primary"
                        >
                            Regístrate
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
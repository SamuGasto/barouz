"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2, Mail, Lock, Eye, EyeOff, User, CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { RolesInsert, UsuarioInsert } from "@/types/resumen-tipos";

// OWASP Compliant Password Schema
const passwordSchema = z
    .string()
    .min(12, "La contraseña debe tener al menos 12 caracteres")
    .regex(/[A-Z]/, "Debe contener al menos una letra mayúscula")
    .regex(/[a-z]/, "Debe contener al menos una letra minúscula")
    .regex(/[0-9]/, "Debe contener al menos un número")
    .regex(/[^A-Za-z0-9]/, "Debe contener al menos un carácter especial")
    .refine(
        (password) => !/(.)\1{2,}/.test(password),
        "No debe contener secuencias de caracteres repetidos"
    )
    .refine(
        (password) => !/(123|234|345|456|567|678|789|890|012|abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz)/i.test(password),
        "No debe contener secuencias comunes"
    );

const formSchema = z.object({
    fullName: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
    email: z.string().email("Por favor ingresa un correo electrónico válido"),
    password: passwordSchema,
    confirmPassword: z.string().min(1, "Confirma tu contraseña"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
});

type FormValues = z.infer<typeof formSchema>;

// Password strength checker
const checkPasswordStrength = (password: string) => {
    const requirements = {
        minLength: password.length >= 12,
        hasUppercase: /[A-Z]/.test(password),
        hasLowercase: /[a-z]/.test(password),
        hasNumber: /[0-9]/.test(password),
        hasSpecialChar: /[^A-Za-z0-9]/.test(password),
        noRepeatedChars: !/(.)\1{2,}/.test(password),
        noCommonSequences: !/(123|234|345|456|567|678|789|890|012|abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz)/i.test(password),
    };

    const strength = Object.values(requirements).filter(Boolean).length;
    const strengthPercentage = (strength / Object.keys(requirements).length) * 100;

    return { requirements, strengthPercentage };
};

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState<{
        requirements: Record<string, boolean>;
        strengthPercentage: number;
    } | null>(null);
    const [redirectCountdown, setRedirectCountdown] = useState<number | null>(null);

    const router = useRouter();
    const supabase = createClient();

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullName: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
        mode: "onChange",
    });

    const onSubmit = async (values: FormValues) => {
        setIsLoading(true);

        try {
            // Check if user already exists
            const { data: userExists } = await supabase
                .from('usuario')
                .select('email')
                .eq('email', values.email)
                .single();

            if (userExists) {
                toast.error("Este correo ya está registrado");
                return;
            }

            // Create user in Supabase Auth
            const { data: authData, error: signUpError } = await supabase.auth.signUp({
                email: values.email,
                password: values.password,
                options: {
                    data: {
                        full_name: values.fullName,
                    },
                    emailRedirectTo: `${window.location.origin}/auth/callback`,
                },
            });

            if (signUpError) {
                throw signUpError;
            }

            const dataUsuario: UsuarioInsert = {
                id: authData.user?.id,
                gmail: values.email,
                nombre: values.fullName,
                rol: "cliente",
                telefono: "",
                direccion: "",
                created_at: new Date().toISOString(),
            };

            // Create user in the database
            const { error: dbError } = await supabase
                .from('usuario')
                .insert(dataUsuario);

            if (dbError) {
                throw dbError;
            }


            const rolInsertar: RolesInsert = {
                id_usuario: authData.user?.id || "",
                rol: 'cliente',
            };

            const { data: rolUsuario, error: rolError } = await supabase.from('roles_usuarios').insert(rolInsertar)

            if (rolError) {
                toast.error("Error al crear el rol del usuario");
                throw rolError;
            }


            toast.success("¡Registro exitoso!");
            setRedirectCountdown(3); // Iniciar cuenta regresiva de 3 segundos
            const countdown = setInterval(() => {
                setRedirectCountdown((prev) => {
                    if (prev === 1) {
                        clearInterval(countdown);
                        // **Elimina router.refresh() aquí**

                        router.replace("/login");
                        return null;
                    }
                    return prev ? prev - 1 : null;
                });
            }, 1000);

        } catch (error: any) {
            console.error("Registration error:", error);
            toast.error(error.message || "Error al registrar la cuenta. Por favor, inténtalo de nuevo.");
        } finally {
            setIsLoading(false);
        }
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const password = e.target.value;
        if (password.length > 0) {
            setPasswordStrength(checkPasswordStrength(password));
        } else {
            setPasswordStrength(null);
        }
        form.setValue("password", password, { shouldValidate: true });
    };

    const getStrengthColor = (percentage: number) => {
        if (percentage < 40) return "bg-red-500";
        if (percentage < 70) return "bg-yellow-500";
        return "bg-green-500";
    };

    return (
        <div className="container flex py-10 w-screen flex-col items-center justify-center">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
                <div className="flex flex-col space-y-2 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Crear una cuenta
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Ingresa tus datos para crear una cuenta
                    </p>
                </div>

                <div className="grid gap-6">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="fullName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nombre completo</FormLabel>
                                        <div className="relative">
                                            <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                            <FormControl>
                                                <Input
                                                    placeholder="Tu nombre completo"
                                                    className="pl-9"
                                                    disabled={isLoading}
                                                    value={field.value}
                                                    onChange={(e) => {
                                                        field.onChange(e);
                                                    }}
                                                />
                                            </FormControl>
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

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
                                                    autoComplete="email"
                                                    value={field.value}
                                                    onChange={(e) => {
                                                        field.onChange(e);
                                                    }}
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
                                        <FormLabel>Contraseña</FormLabel>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                            <FormControl>
                                                <Input
                                                    type={showPassword ? "text" : "password"}
                                                    placeholder="••••••••••••"
                                                    className="pl-9 pr-10"
                                                    disabled={isLoading}
                                                    autoComplete="new-password"
                                                    value={field.value}
                                                    onChange={(e) => {
                                                        field.onChange(e);
                                                        handlePasswordChange(e);
                                                    }}
                                                />
                                            </FormControl>
                                            <button
                                                type="button"
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                                onClick={() => setShowPassword(!showPassword)}
                                            >
                                                {showPassword ? (
                                                    <EyeOff className="h-4 w-4" />
                                                ) : (
                                                    <Eye className="h-4 w-4" />
                                                )}
                                            </button>
                                        </div>

                                        {passwordStrength && (
                                            <div className="mt-2 space-y-2">
                                                <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                                                    <div
                                                        className={cn(
                                                            "h-full transition-all duration-300",
                                                            getStrengthColor(passwordStrength.strengthPercentage)
                                                        )}
                                                        style={{ width: `${passwordStrength.strengthPercentage}%` }}
                                                    />
                                                </div>

                                                <div className="grid grid-cols-1 gap-1 text-xs text-muted-foreground">
                                                    <PasswordRequirement
                                                        valid={passwordStrength.requirements.minLength}
                                                        text="Mínimo 12 caracteres"
                                                    />
                                                    <PasswordRequirement
                                                        valid={passwordStrength.requirements.hasUppercase}
                                                        text="Al menos una mayúscula"
                                                    />
                                                    <PasswordRequirement
                                                        valid={passwordStrength.requirements.hasLowercase}
                                                        text="Al menos una minúscula"
                                                    />
                                                    <PasswordRequirement
                                                        valid={passwordStrength.requirements.hasNumber}
                                                        text="Al menos un número"
                                                    />
                                                    <PasswordRequirement
                                                        valid={passwordStrength.requirements.hasSpecialChar}
                                                        text="Al menos un carácter especial"
                                                    />
                                                    <PasswordRequirement
                                                        valid={passwordStrength.requirements.noRepeatedChars}
                                                        text="Sin caracteres repetidos"
                                                    />
                                                    <PasswordRequirement
                                                        valid={passwordStrength.requirements.noCommonSequences}
                                                        text="Sin secuencias comunes"
                                                    />
                                                </div>
                                            </div>
                                        )}

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Confirmar contraseña</FormLabel>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                            <FormControl>
                                                <Input
                                                    type={showConfirmPassword ? "text" : "password"}
                                                    placeholder="••••••••••••"
                                                    className="pl-9 pr-10"
                                                    disabled={isLoading}
                                                    autoComplete="new-password"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <button
                                                type="button"
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            >
                                                {showConfirmPassword ? (
                                                    <EyeOff className="h-4 w-4" />
                                                ) : (
                                                    <Eye className="h-4 w-4" />
                                                )}
                                            </button>
                                        </div>
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
                                Crear cuenta
                            </Button>
                        </form>
                    </Form>

                    <p className="px-8 text-center text-sm text-muted-foreground">
                        ¿Ya tienes una cuenta?{" "}
                        <Link
                            href="/login"
                            className="underline underline-offset-4 hover:text-brand-primary"
                        >
                            Inicia sesión
                        </Link>
                    </p>
                    {redirectCountdown && (
                        <p className="text-sm text-muted-foreground">
                            Redirigiendo a la página de inicio en {redirectCountdown} segundos...
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

// Helper component for password requirements
function PasswordRequirement({ valid, text }: { valid: boolean; text: string }) {
    return (
        <div className="flex items-center gap-2">
            {valid ? (
                <CheckCircle className="h-3.5 w-3.5 text-green-500" />
            ) : (
                <XCircle className="h-3.5 w-3.5 text-red-500" />
            )}
            <span className={cn(valid ? "text-green-600" : "text-red-600")}>
                {text}
            </span>
        </div>
    );
}
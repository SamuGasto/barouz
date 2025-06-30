// app/(auth-pages)/forgot-password/page.tsx
"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { signInWithOtp } from "@/app/actions"
import { toast } from "sonner"
import { VerificarOTP } from "@/components/forgot-password/verificar-otp"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"

export default function ForgotPassword() {
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)
  const email = searchParams.get("email")

  const handleSubmit = async (formData: FormData) => {
    const email = formData.get("email")?.toString()
    if (!email) {
      toast.error("El correo es requerido")
      return
    }

    setIsLoading(true)
    try {
      const { error } = await signInWithOtp({ email })
      if (error) {
        toast.error(error)
      } else {
        window.location.href = `/forgot-password?email=${encodeURIComponent(email)}`
      }
    } catch (error) {
      toast.error("Error al enviar el código")
    } finally {
      setIsLoading(false)
    }
  }

  if (email) {
    return (
      <div className="flex flex-col w-full max-w-md p-6 space-y-6">
        <VerificarOTP email={email} />
      </div>
    )
  }

  return (
    <div className="flex flex-col w-full max-w-md p-6 space-y-6">
      <div className="space-y-2 text-center">
        <Link
          href="/sign-in"
          className="inline-flex items-center text-sm text-muted-foreground hover:underline"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Volver al inicio de sesión
        </Link>
        <h1 className="text-2xl font-semibold">Recuperar contraseña</h1>
        <p className="text-sm text-muted-foreground">
          Ingresa tu correo electrónico para recibir un código de verificación
        </p>
      </div>

      <form action={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Correo electrónico</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="tucorreo@ejemplo.com"
            required
          />
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Enviando código...
            </>
          ) : 'Enviar código'}
        </Button>
      </form>
    </div>
  )
}
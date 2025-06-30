// app/protected/reset-password/page.tsx
"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { updatePassword } from "@/app/actions"
import { toast } from "sonner"
import { Loader2, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function ResetPassword() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const email = searchParams.get("email")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        router.push("/protected/pedidos")
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [isSuccess, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) {
      toast.error("No se encontró el correo electrónico")
      return
    }

    if (password !== confirmPassword) {
      toast.error("Las contraseñas no coinciden")
      return
    }

    if (password.length < 6) {
      toast.error("La contraseña debe tener al menos 6 caracteres")
      return
    }

    setIsLoading(true)
    try {
      const { error } = await updatePassword({ email, password })
      if (error) {
        toast.error(error)
      } else {
        toast.success("¡Contraseña actualizada correctamente!", {
          description: "Serás redirigido a la página de pedidos",
          icon: <CheckCircle className="w-5 h-5 text-green-500" />,
          action: {
            label: "Ir ahora",
            onClick: () => router.push("/protected/pedidos")
          }
        })
        setIsSuccess(true)
      }
    } catch (error) {
      toast.error("Error al actualizar la contraseña")
    } finally {
      setIsLoading(false)
    }
  }

  if (!email) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md p-8 space-y-4 text-center">
          <h1 className="text-2xl font-semibold">Enlace inválido</h1>
          <p className="text-muted-foreground">
            El enlace de restablecimiento no es válido o ha expirado.
          </p>
          <div className="pt-4">
            <Button asChild>
              <Link href="/protected/pedidos">Volver a pedidos</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md p-8 space-y-6 text-center">
          <div className="flex justify-center">
            <div className="bg-green-100 p-3 rounded-full">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
          </div>
          <h1 className="text-2xl font-semibold">¡Contraseña actualizada!</h1>
          <p className="text-muted-foreground">
            Has actualizado tu contraseña correctamente.
          </p>
          <p className="text-sm text-muted-foreground">
            Redirigiendo a la página de pedidos...
          </p>
          <div className="pt-4">
            <Button onClick={() => router.push("/protected/pedidos")}>
              Ir a pedidos ahora
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-card rounded-lg shadow-sm border">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold">Nueva contraseña</h1>
          <p className="text-muted-foreground">
            Crea una nueva contraseña para {email}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Nueva contraseña
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={11}
              placeholder="Mínimo 11 caracteres"
              className="h-11"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="text-sm font-medium">
              Confirmar contraseña
            </label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={11}
              placeholder="Vuelve a escribir tu contraseña"
              className="h-11"
            />
          </div>

          <Button
            type="submit"
            className="w-full h-11"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Actualizando...
              </>
            ) : 'Actualizar contraseña'}
          </Button>
        </form>
      </div>
    </div>
  )
}
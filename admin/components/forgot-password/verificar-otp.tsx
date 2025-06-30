// components/forgot-password/verificar-otp.tsx
"use client"

import { Button } from "@/components/ui/button"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { verifyOtp } from "@/app/actions"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

export function VerificarOTP({ email }: { email: string }) {
    const [otp, setOtp] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const handleVerify = async () => {
        if (otp.length !== 6) {
            toast.error("El código debe tener 6 dígitos")
            return
        }

        setIsLoading(true)
        try {
            const result = await verifyOtp({ email, token: otp })
            if (result?.error) {
                toast.error(result.error)
            } else {
                toast.success("¡Código verificado!")
                router.push(`/protected/reset-password?email=${encodeURIComponent(email)}`)
            }
        } catch (error) {
            toast.error("Error al verificar el código")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="space-y-6 w-full">
            <div>
                <h2 className="text-2xl font-semibold">Verifica tu correo</h2>
                <p className="text-sm text-muted-foreground mt-1">
                    Ingresa el código de 6 dígitos enviado a {email}
                </p>
            </div>

            <div className="space-y-6">
                <div className="flex justify-center">
                    <InputOTP
                        maxLength={6}
                        value={otp}
                        onChange={(value) => setOtp(value)}
                    >
                        <InputOTPGroup>
                            {Array(6).fill(0).map((_, i) => (
                                <InputOTPSlot key={i} index={i} />
                            ))}
                        </InputOTPGroup>
                    </InputOTP>
                </div>

                <Button
                    onClick={handleVerify}
                    className="w-full"
                    disabled={isLoading || otp.length !== 6}
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Verificando...
                        </>
                    ) : 'Verificar código'}
                </Button>

                <Button
                    variant="ghost"
                    size="sm"
                    className="w-full"
                    onClick={() => window.location.href = '/forgot-password'}
                >
                    Cambiar correo
                </Button>
            </div>
        </div>
    )
}
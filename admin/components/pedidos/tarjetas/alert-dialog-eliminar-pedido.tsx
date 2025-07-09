"use client"

import React from 'react'
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { CircleX } from "lucide-react"
import { useCambiarEstadoPedidoFinal } from '@/hooks/usePedidosFinales'
import z from 'zod/v4'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const razonScheme = z.object({
    razon: z.string().min(1, "La razón es requerida")
})

function AlertDialogEliminarPedido({ pedido_id }: { pedido_id: string }) {
    const { mutate: cambiarEstadoPedidoFinal } = useCambiarEstadoPedidoFinal()

    const form = useForm<z.infer<typeof razonScheme>>({
        resolver: zodResolver(razonScheme),
        defaultValues: {
            razon: ""
        }
    })

    function onSubmit(values: z.infer<typeof razonScheme>) {
        cambiarEstadoPedidoFinal({
            pedido_final_id: pedido_id,
            estado: "Cancelado",
            razon_cancelacion: values.razon
        })
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm" className="h-8 px-2 text-xs">
                    <CircleX className="h-3 w-3 mr-1" />
                    Cancelar
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <AlertDialogHeader>
                            <AlertDialogTitle>Cancelar pedido</AlertDialogTitle>
                            <AlertDialogDescription>
                                ¿Estás seguro de cancelar este pedido?
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <div className="space-y-4">
                            <FormField
                                control={form.control}
                                name="razon"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Razón</FormLabel>
                                        <FormDescription>
                                            Ingrese la razón por la cual desea cancelar el pedido.
                                        </FormDescription>
                                        <FormControl>
                                            <Input placeholder="Ingrese la razón" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <AlertDialogFooter className="pt-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => {
                                        form.reset();
                                        // Close the dialog
                                        document.body.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
                                    }}
                                >
                                    Cancelar
                                </Button>
                                <Button type="submit" variant="destructive">
                                    Confirmar
                                </Button>
                            </AlertDialogFooter>
                        </div>
                    </form>
                </Form>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default AlertDialogEliminarPedido
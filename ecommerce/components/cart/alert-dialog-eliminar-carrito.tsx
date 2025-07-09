"use client"
import React from 'react'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Button } from '../ui/button';

interface AlertDialogEliminarCarritoProps {
    funcionEliminar: () => void;
}

function AlertDialogEliminarCarrito({ funcionEliminar }: AlertDialogEliminarCarritoProps) {
    const [open, setOpen] = React.useState(false);
    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild><Button variant="outline">Eliminar todo</Button></AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Eliminar todo</AlertDialogTitle>
                    <AlertDialogDescription>
                        ¿Estás seguro de eliminar todo el carrito?
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <Button variant="destructive" onClick={() => { funcionEliminar(); setOpen(false); }}>Eliminar todo</Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default AlertDialogEliminarCarrito
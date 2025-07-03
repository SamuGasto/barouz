"use client"
import React from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash2 } from 'lucide-react';
import { Button } from '../ui/button';

interface AlertDialogDeleteProps {
    funcionEliminar: () => void;
}

function AlertDialogDelete({ funcionEliminar }: AlertDialogDeleteProps) {
    const [open, setOpen] = React.useState(false);
    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger className='flex flex-row items-center gap-2 cursor-pointer text-red-500'><Trash2 className="h-5 w-5" />
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Eliminar</AlertDialogTitle>
                    <AlertDialogDescription>
                        ¿Estás seguro de eliminar este pedido?
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className='cursor-pointer'>Cancelar</AlertDialogCancel>
                    <Button onClick={() => { funcionEliminar(); setOpen(false); }} variant="destructive">Eliminar</Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default AlertDialogDelete
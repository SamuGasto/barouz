import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ShoppingBag } from "lucide-react"

function DialogNuevoPedido() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button><ShoppingBag className="mr-2 h-5 w-5" /> Agregar Pedido</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Nuevo Pedido</DialogTitle>
                    <DialogDescription>
                        Ingresa los datos del nuevo pedido
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button>Guardar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default DialogNuevoPedido
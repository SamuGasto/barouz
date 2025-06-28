import { TarjetaPedido } from "./tarjeta-pedido"
import { TodosLosPedidos } from "@/types/res_pedidos_final"
import { Tables } from "@/types/supabase"

interface Props {
    pedidosFinales: TodosLosPedidos[]
    searchTerm: string
    type: "active" | "completed" | "cancelled" | "all"
    activeSubTab?: string
    usuarios: Tables<'usuario'>[]
    onCancel?: (orderId: string) => void
    onUpdateStatus: (orderId: string) => void
    onReactivate?: (orderId: string) => void
}

export function ListaTarjetas({
    pedidosFinales,
    searchTerm,
    type,
    activeSubTab,
    usuarios,
    onCancel,
    onUpdateStatus,
    onReactivate,
}: Props) {

    return (
        <div className="flex flex-col md:flex-wrap w-full max-w-7xl gap-2">
            {pedidosFinales?.map((pedido_final) => (
                <TarjetaPedido
                    key={pedido_final.pedido_final.informacion.id}
                    pedido_final={pedido_final.pedido_final}
                    usuarios={usuarios}
                    onCancel={onCancel}
                    onUpdateStatus={onUpdateStatus}
                    onReactivate={onReactivate}
                    showCancelButton={type === "active"}
                    showReactivateButton={type === "cancelled"}
                />
            ))}
        </div>
    )
}

import { TarjetaPedido } from "./tarjeta-pedido"
import { EstadoVacio } from "./estado-vacio"
import usePedidosFinal from "@/hooks/usePedidos"
import { Tables } from "@/types/supabase"

interface Props {
    searchTerm: string
    type: "active" | "completed" | "cancelled" | "all"
    activeSubTab?: string
    usuarios: Tables<'usuario'>[]
    onCancel?: (orderId: string) => void
    onUpdateStatus: (orderId: string) => void
    onReactivate?: (orderId: string) => void
}

export function ListaTarjetas({
    searchTerm,
    type,
    activeSubTab,
    usuarios,
    onCancel,
    onUpdateStatus,
    onReactivate,
}: Props) {

    const { data: pedidosFinales, isLoading: pedidosLoading } = usePedidosFinal();

    const isBusy = pedidosLoading

    if (isBusy) {
        return <EstadoVacio searchTerm={searchTerm} type={type} activeSubTab={activeSubTab} />
    }

    return (
        <div className="flex flex-col md:flex-wrap w-full max-w-7xl gap-2">
            {pedidosFinales?.map((pedido) => (
                <TarjetaPedido
                    key={pedido.id}
                    pedido_final={pedido}
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

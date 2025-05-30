import { TarjetaPedido } from "./tarjeta-pedido"
import type { Database } from "@/types/supabase"
import { EstadoVacio } from "./estado-vacio"
import { Menu } from "@/utils/querys/menu/obtener-menu"

interface Props {
    pedidos: Database['public']['Tables']['pedido_final']['Row'][]
    searchTerm: string
    type: "active" | "completed" | "cancelled" | "all"
    activeSubTab?: string
    onEdit: (pedido: Database['public']['Tables']['pedido_final']['Row']) => void
    onCancel?: (orderId: string) => void
    onUpdateStatus: (orderId: string) => void
    onReactivate?: (orderId: string) => void
    menu: Menu
    todosUsuarios: Database['public']['Tables']['usuario']['Row'][]
}

export function ListaTarjetas({
    pedidos,
    todosUsuarios,
    menu,
    searchTerm,
    type,
    activeSubTab,
    onEdit,
    onCancel,
    onUpdateStatus,
    onReactivate,
}: Props) {
    if (pedidos.length === 0) {
        return <EstadoVacio searchTerm={searchTerm} type={type} activeSubTab={activeSubTab} />
    }

    return (
        <div className="space-y-4">
            {pedidos.map((pedido) => (
                <TarjetaPedido
                    key={pedido.id}
                    pedido={pedido}
                    onEdit={onEdit}
                    onCancel={onCancel}
                    onUpdateStatus={onUpdateStatus}
                    onReactivate={onReactivate}
                    showCancelButton={type === "active"}
                    showReactivateButton={type === "cancelled"}
                    menu={menu}
                    todosUsuarios={todosUsuarios}
                />
            ))}
        </div>
    )
}

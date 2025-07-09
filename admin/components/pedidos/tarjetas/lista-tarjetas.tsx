import { TarjetaPedido } from "./tarjeta-pedido"
import { TodosLosPedidos } from "@/types/res_pedidos_final"
import { Database, Tables } from "@/types/supabase"

interface Props {
    pedidosFinales: TodosLosPedidos[]
    searchTerm: string
    type: 'Activos' | 'Completados' | 'Todos'
    activeSubTab?: 'Todos' | Database['public']['Enums']['EstadoPedidos']
    usuarios: Tables<'usuario'>[]
}

export function ListaTarjetas({
    pedidosFinales,
    searchTerm,
    type,
    activeSubTab,
    usuarios,
}: Props) {

    function AplicarFiltros() {
        return pedidosFinales?.filter((pedido_final) => {
            if (searchTerm) {
                let returnedValue = false;
                const searchTermLower = searchTerm.toLowerCase().trim();

                if (pedido_final.pedido_final.informacion.fecha_hora?.toLowerCase().trim().includes(searchTermLower)) returnedValue = true;
                if (pedido_final.pedido_final.pedidos.some((pedido) => pedido.producto?.nombre?.toLowerCase().trim().includes(searchTermLower))) returnedValue = true;
                if (pedido_final.pedido_final.pedidos.some((pedido) => pedido.extras.some((extra) => extra.extra?.nombre?.toLowerCase().trim().includes(searchTermLower)))) returnedValue = true;
                if (pedido_final.pedido_final.informacion.razon_cancelacion?.toLowerCase().trim().includes(searchTermLower)) returnedValue = true;
                if (pedido_final.pedido_final.informacion.direccion?.toLowerCase().trim().includes(searchTermLower)) returnedValue = true;
                if (pedido_final.pedido_final.usuario.nombre?.toLowerCase().trim().includes(searchTermLower)) returnedValue = true;

                return returnedValue;
            }

            if (type === "Todos") {
                if (activeSubTab !== "Todos" && pedido_final.pedido_final.informacion.estado !== activeSubTab) return false;
                return true;
            };

            if (type === "Activos") {
                if (pedido_final.pedido_final.informacion.estado === "Entregado" || pedido_final.pedido_final.informacion.estado === "Cancelado") return false;
                if (activeSubTab !== "Todos" && pedido_final.pedido_final.informacion.estado !== activeSubTab) return false;
                return true;
            };

            if (type === "Completados") {
                if (pedido_final.pedido_final.informacion.estado !== "Entregado") return false;
                if (activeSubTab !== "Todos" && pedido_final.pedido_final.informacion.estado !== activeSubTab) return false;
                return true;
            };

            return true;
        })
    }

    return (
        <div className="flex flex-row flex-wrap  w-full max-w-[95%] mx-auto gap-3 py-2">
            {AplicarFiltros()?.map((pedido_final) => {
                return (<TarjetaPedido
                    key={pedido_final.pedido_final.informacion.id}
                    pedido_final={pedido_final.pedido_final}
                    usuarios={usuarios}
                />)
            })}
        </div>
    )
}

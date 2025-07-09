import { Badge } from "@/components/ui/badge"
import { CheckCircle, AlertCircle, Truck } from "lucide-react"
import type { Database } from "@/types/supabase"

interface Props {
    status: Database['public']['Enums']['EstadoPedidos']
}

export const ColoresEstadoPedido = {
    "Recibido": "bg-sky-100 text-sky-800 border-sky-200 dark:bg-sky-900 dark:text-sky-200 dark:border-sky-800",
    "En preparación": "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-200 dark:border-yellow-800/30",
    "En camino": "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-200 dark:border-blue-800/30",
    "Entregado": "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-200 dark:border-green-800/30",
    "Cancelado": "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-200 dark:border-red-800/30",
    "": "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/30 dark:text-gray-200 dark:border-gray-800/30",
}

export function PedidoBadge({ status }: Props) {
    const getStatusConfig = (status: Database['public']['Enums']['EstadoPedidos']) => {
        switch (status) {
            case "Recibido":
                return {
                    className: ColoresEstadoPedido[status],
                    icon: <AlertCircle className="mr-1 h-3 w-3" />,
                    text: "Recibido",
                }
            case "En preparación":
                return {
                    className: ColoresEstadoPedido[status],
                    icon: <AlertCircle className="mr-1 h-3 w-3" />,
                    text: "En preparación",
                }
            case "En camino":
                return {
                    className: ColoresEstadoPedido[status],
                    icon: <Truck className="mr-1 h-3 w-3" />,
                    text: "En camino",
                }
            case "Entregado":
                return {
                    className: ColoresEstadoPedido[status],
                    icon: <CheckCircle className="mr-1 h-3 w-3" />,
                    text: "Entregado",
                }

            default:
                return {
                    className: ColoresEstadoPedido[""],
                    icon: null,
                    text: status,
                }
        }
    }

    const config = getStatusConfig(status)

    return (
        <Badge variant="outline" className={config.className}>
            {config.icon}
            {config.text}
        </Badge>
    )
}

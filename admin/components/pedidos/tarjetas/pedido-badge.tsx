import { Badge } from "@/components/ui/badge"
import { CheckCircle, AlertCircle, Truck } from "lucide-react"
import type { Database } from "@/types/supabase"

interface Props {
    status: Database['public']['Enums']['EstadoPedidos']
}

export function PedidoBadge({ status }: Props) {
    const getStatusConfig = (status: Database['public']['Enums']['EstadoPedidos']) => {
        switch (status) {
            case "Recibido":
                return {
                    className: "bg-sky-100 text-sky-800 border-sky-200 dark:bg-sky-900 dark:text-sky-200 dark:border-sky-800",
                    icon: <AlertCircle className="mr-1 h-3 w-3" />,
                    text: "Recibido",
                }
            case "En preparación":
                return {
                    className:
                        "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-200 dark:border-yellow-800/30",
                    icon: <AlertCircle className="mr-1 h-3 w-3" />,
                    text: "En preparación",
                }
            case "En camino":
                return {
                    className:
                        "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-200 dark:border-blue-800/30",
                    icon: <Truck className="mr-1 h-3 w-3" />,
                    text: "En camino",
                }
            case "Entregado":
                return {
                    className:
                        "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-200 dark:border-green-800/30",
                    icon: <CheckCircle className="mr-1 h-3 w-3" />,
                    text: "Entregado",
                }

            default:
                return {
                    className:
                        "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/30 dark:text-gray-200 dark:border-gray-800/30",
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

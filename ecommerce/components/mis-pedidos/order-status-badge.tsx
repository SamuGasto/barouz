import { CheckCircle, Clock, XCircle, Package, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { OrderStatus } from "@/types/pedidos";

export const STATUS_CONFIG = {
  Entregado: {
    icon: CheckCircle,
    color: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    label: "Entregado",
  },
  "En preparación": {
    icon: Clock,
    color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
    label: "En preparación",
  },
  Recibido: {
    icon: Clock,
    color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
    label: "Recibido",
  },
  Cancelado: {
    icon: XCircle,
    color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
    label: "Cancelado",
  },
  "En camino": {
    icon: Package,
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
    label: "En camino",
  },
} as const;

interface OrderStatusBadgeProps {
  status: OrderStatus;
}

export function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  const config = STATUS_CONFIG[status] || {
    icon: AlertCircle,
    color: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
    label: status,
  };
  const Icon = config.icon;

  return (
    <Badge className={`${config.color} flex items-center gap-1`}>
      <Icon className="h-3.5 w-3.5" />
      {config.label}
    </Badge>
  );
}

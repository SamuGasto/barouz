interface Props {
    searchTerm?: string
    type: "active" | "completed" | "cancelled" | "all"
    activeSubTab?: string
}

export function EstadoVacio({ searchTerm, type, activeSubTab }: Props) {
    const getEmptyMessage = () => {
        if (searchTerm) {
            return {
                title: `No se encontraron pedidos ${type === "active" ? "activos" : type === "completed" ? "completados" : type === "cancelled" ? "cancelados" : ""} que coincidan con "${searchTerm}"`,
                subtitle: "Intenta con otra búsqueda",
            }
        }

        switch (type) {
            case "active":
                return {
                    title: `No hay pedidos activos ${activeSubTab !== "all" ? `en estado "${activeSubTab}"` : ""} en este momento`,
                    subtitle: "Los pedidos aparecerán aquí cuando se creen",
                }
            case "completed":
                return {
                    title: "No hay pedidos completados en este momento",
                    subtitle: "Los pedidos completados aparecerán aquí",
                }
            case "cancelled":
                return {
                    title: "No hay pedidos cancelados en este momento",
                    subtitle: "Los pedidos cancelados aparecerán aquí",
                }
            case "all":
                return {
                    title: "No hay pedidos registrados",
                    subtitle: "Crea un nuevo pedido para comenzar",
                }
            default:
                return {
                    title: "No hay pedidos",
                    subtitle: "Los pedidos aparecerán aquí",
                }
        }
    }

    const message = getEmptyMessage()

    return (
        <div className="text-center py-8 text-sky-500 dark:text-sky-400 bg-sky-50/70 dark:bg-sky-900/30 rounded-md">
            {message.title}
            <br />
            <span className="text-sm">{message.subtitle}</span>
        </div>
    )
}
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash } from "lucide-react"
import Image from "next/image"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"

import type { Product } from "@/types/product";
import { Card, CardContent } from "@/components/ui/card"
import { toast } from "sonner"

interface MenuProductCardProps {
    item: Product;
    onEdit: (item: Product) => void;
    onDelete?: (itemId: string) => Promise<void>;
}

export function MenuProductCard({ item, onEdit, onDelete }: MenuProductCardProps) {
    const [imageError, setImageError] = useState(false)
    const [showDeleteDialog, setShowDeleteDialog] = useState(false)

    const handleImageError = () => {
        setImageError(true)
    }

    const handleDelete = () => {
        setShowDeleteDialog(false)
        if (onDelete) {
            onDelete(item.id).then(() => {
                toast.success("Producto eliminado exitosamente")
            }).catch((error) => {
                if (error.code == "23503") {
                    toast.error("Error al eliminar producto ya que esta siendo utilizado en un pedido")
                }
                else {
                    toast.error("Error al eliminar producto, intentalo de nuevo más tarde")
                }
            })
        }
    }

    return (
        <Card className="p-2">
            <div className="relative h-32 sm:h-48 w-full">
                {!imageError && item.imagen ? (
                    <Image
                        src={item.imagen || "/placeholder.svg"}
                        alt={item.nombre}
                        fill
                        className="object-cover rounded-lg dark:shadow-none shadow-lg"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        onError={handleImageError}
                    />
                ) : (
                    <div className="flex items-center justify-center h-full">
                        <div className="text-center">
                            <div className="text-4xl mb-2">🧇</div>
                            <div className="text-sm">Sin imagen</div>
                        </div>
                    </div>
                )}
            </div>

            <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                    <div className="font-semibold">{item.nombre}</div>
                    <Badge
                        variant={item.disponible ? "default" : "outline"}
                        className={item.disponible ? "" : "border"}
                    >
                        {item.disponible ? "Disponible" : "Agotado"}
                    </Badge>
                </div>

                <div className="text-sm mb-3 line-clamp-2">{item.descripcion}</div>

                <div className="font-bold text-lg truncate">${item.precio?.toLocaleString()}</div>

                <div className="flex flex-col sm:flex-row gap-2 mt-2 justify-end">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onEdit(item)}
                    >
                        <Edit className="mr-2 h-3 w-3" />
                        Editar
                    </Button>
                    {onDelete && (
                        <>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setShowDeleteDialog(true)}
                                className="border-red-200 text-red-600 hover:bg-red-50 dark:border-red-900/30 dark:text-red-400 dark:hover:bg-red-950/30 dark:hover:text-red-300"
                            >
                                <Trash className="mr-2 h-3 w-3" />
                                Eliminar
                            </Button>
                            <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>¿Eliminar producto?</DialogTitle>
                                    </DialogHeader>
                                    <div className="py-2">
                                        <p>¿Estás seguro de que deseas eliminar <b>{item.nombre}</b>? Esta acción no se puede deshacer.</p>
                                    </div>

                                    <DialogFooter>
                                        <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
                                            Cancelar
                                        </Button>
                                        <Button variant="destructive" onClick={handleDelete}>
                                            Sí, eliminar
                                        </Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </>
                    )}
                </div>
            </div>
        </Card>
    )
}

"use client"

import { Dialog, DialogContent, DialogTitle, DialogHeader } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { useCrearExtra, useActualizarExtra } from "@/hooks/useExtras"
import { toast } from "sonner"
import { ExtraRow } from "@/types/tipos_supabase_resumidos"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useObtenerCategoriasExtras } from "@/hooks/useExtras"
import { Label } from "../ui/label"
import { CategoriaProductos } from "@/types/tipos_supabase_resumidos"

export function ExtraDialog({ open, onOpenChange, extra, categoria_producto }: {
    open: boolean,
    onOpenChange: (open: boolean) => void,
    extra?: ExtraRow,
    categoria_producto: CategoriaProductos
}) {
    const [nombre, setNombre] = useState("")
    const [precio, setPrecio] = useState("")
    const [categoria, setCategoria] = useState("")
    const [categoriaNueva, setCategoriaNueva] = useState("")
    const { mutateAsync: crear, isPending: crearLoading } = useCrearExtra()
    const { mutateAsync: actualizar, isPending: actualizarLoading } = useActualizarExtra()
    const { data: categorias, isPending: cargandoCategorias } = useObtenerCategoriasExtras()

    useEffect(() => {
        if (extra) {
            setNombre(extra.nombre || "")
            setPrecio(extra.precio?.toString() || "")
            setCategoria(extra.categoria || "")
        } else {
            setNombre("")
            setPrecio("")
            setCategoria("")
        }
    }, [extra, open])


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!nombre || !precio) {
            toast.error("Completa todos los campos")
            return
        }
        if (extra) {
            await actualizar({
                id: extra.id,
                nombre,
                precio: parseFloat(precio),
                categoria: categoria === "Nueva" ? categoriaNueva : categoria,
                tipo: "incremental",
                "categoria-producto": categoria_producto,
            })
            toast.success(`Extra (${nombre}) actualizado`)
        } else {
            await crear({
                nombre,
                precio: parseFloat(precio),
                categoria: categoria === "Nueva" ? categoriaNueva : categoria,
                tipo: "incremental",
                "categoria-producto": categoria_producto,
            })
            toast.success(`Extra (${nombre}) creado`)
        }
        onOpenChange(false)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{extra ? "Editar Extra" : "Añadir Extra"}</DialogTitle>
                </DialogHeader>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <Label htmlFor="nombre">Nombre</Label>
                    <Input id="nombre" placeholder="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} />
                    <Label htmlFor="precio">Precio</Label>
                    <Input id="precio" placeholder="Precio" type="number" min={0} step={1} value={precio} onChange={e => setPrecio(e.target.value)} />
                    <Label htmlFor="categoria">Categoria</Label>
                    <div className="flex flex-row gap-2 w-full">
                        <Select value={categoria} onValueChange={setCategoria}>
                            <SelectTrigger className="flex w-full">
                                <SelectValue id="categoria" placeholder="Categoria" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Nueva categoria</SelectLabel>
                                    <SelectItem value="Nueva">Crear Nueva Categoria</SelectItem>
                                </SelectGroup>
                                <SelectGroup>
                                    <SelectLabel>Categorias existentes</SelectLabel>
                                    {categorias?.map((categoria) => (
                                        <SelectItem key={categoria} value={categoria}>{categoria}</SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        {categoria === "Nueva" && (
                            <Input id="categoria-nueva" placeholder="Nueva Categoria" value={categoriaNueva} onChange={e => setCategoriaNueva(e.target.value)} />
                        )}
                    </div>
                    <Button type="submit" className="w-full" disabled={crearLoading || actualizarLoading}>
                        {extra ? "Actualizar" : "Crear"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}
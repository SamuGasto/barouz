// app/protected/locales/page.tsx
"use client"

import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import { LocaleCard } from "@/components/locales/LocaleCard"
import { LocaleForm } from "@/components/locales/LocaleForm"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Plus } from "lucide-react"
import { toast } from "sonner"
import { useLocales, useCreateLocale, useUpdateLocale, useDeleteLocale } from "@/hooks/useLocales"
import { LocalConHorarios } from "@/types/tipos_supabase_resumidos"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function LocalesPage() {
  const { data: locales = [], isLoading } = useLocales()
  const createLocale = useCreateLocale()
  const updateLocale = useUpdateLocale()
  const deleteLocale = useDeleteLocale()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingLocale, setEditingLocale] = useState<LocalConHorarios | null>(null)

  const handleCreate = () => {
    setEditingLocale(null)
    setIsDialogOpen(true)
  }

  const handleEdit = (locale: LocalConHorarios) => {
    setEditingLocale(locale)
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm("¿Estás seguro de que deseas eliminar este local?")) {
      try {
        await deleteLocale.mutateAsync(id)
        toast.success("Local eliminado correctamente")
      } catch (error) {
        toast.error("Error al eliminar el local")
      }
    }
  }

  const handleSubmit = async (data: Parameters<typeof createLocale.mutateAsync>[0]) => {
    try {
      if (editingLocale?.id) {
        // For update, we need to pass the id and spread the rest as updates
        await updateLocale.mutateAsync({ ...data, id: editingLocale.id })
      } else {
        await createLocale.mutateAsync(data)
      }
      setIsDialogOpen(false)
    } catch (error) {
      console.error("Error saving locale:", error)
      toast.error("Error al guardar el local")
    }
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Gestión de Locales</h1>
        <Button onClick={handleCreate}>
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Local
        </Button>
      </div>

      {isLoading ? (
        <div>Cargando locales...</div>
      ) : locales.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No hay locales registrados</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {locales.map((locale) => (
            <LocaleCard
              key={locale.id}
              locale={locale}
              onEdit={() => handleEdit(locale)}
              onDelete={() => handleDelete(locale.id)}
            />
          ))}
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingLocale ? "Editar Local" : "Nuevo Local"}
            </DialogTitle>
          </DialogHeader>
          <LocaleForm
            initialData={editingLocale}
            onSubmit={handleSubmit}
            onCancel={() => setIsDialogOpen(false)}
            isLoading={createLocale.isPending || updateLocale.isPending}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}
"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Plus, Edit, Trash2 } from "lucide-react";

// TODO: Ajusta estos imports a tu estructura real
// import { obtenerCupones, crearCupon, editarCupon, eliminarCupon } from "@/utils/querys/promociones";
// import ImageUpload from "@/components/ui/image-upload";

// Tipos base (ajusta según tus tipos reales)
type Cupon = {
  id: string;
  nombre: string;
  descripcion: string;
  imagen_url: string;
  tipo_descuento: "porcentaje" | "monto";
  valor_descuento: number;
  fecha_inicio: string;
  fecha_fin: string;
  hora_inicio: string;
  hora_fin: string;
  disponible: boolean;
};

export default function PromocionesPage() {
  const [cupones, setCupones] = useState<Cupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editCupon, setEditCupon] = useState<Cupon | null>(null);

  // Fetch cupones (simulado, reemplaza por fetch real)
  useEffect(() => {
    setLoading(true);
    // obtenerCupones().then((data) => {
    //   setCupones(data);
    //   setLoading(false);
    // });
    setTimeout(() => {
      setCupones([]); // Muestra vacío por ahora
      setLoading(false);
    }, 500);
  }, []);

  function handleAdd() {
    setEditCupon(null);
    setDialogOpen(true);
  }

  function handleEdit(cupon: Cupon) {
    setEditCupon(cupon);
    setDialogOpen(true);
  }

  function handleDelete(cupon: Cupon) {
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1000)),
      {
        loading: "Eliminando...",
        success: "Cupón eliminado",
        error: "Error al eliminar",
      }
    );
    // eliminarCupon(cupon.id).then(() => ... )
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-2">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestión de Promociones y Cupones</h1>
        <Button onClick={handleAdd} className="gap-2">
          <Plus size={18} /> Nuevo cupón
        </Button>
      </div>
      {loading ? (
        <div className="text-center py-8">Cargando...</div>
      ) : cupones.length === 0 ? (
        <div className="text-center text-muted-foreground py-8">
          No hay cupones registrados.
        </div>
      ) : (
        <div className="grid gap-4">
          {cupones.map((cupon) => (
            <div key={cupon.id} className="flex items-center justify-between rounded-lg border p-4 bg-white shadow-sm">
              <div className="flex flex-col gap-1">
                <span className="font-semibold text-lg">{cupon.nombre}</span>
                <span className="text-sm text-muted-foreground">{cupon.descripcion}</span>
                <div className="flex gap-2 mt-1">
                  <Badge variant="outline">{cupon.tipo_descuento === "porcentaje" ? "%" : "$"} {cupon.valor_descuento}</Badge>
                  <Badge variant={cupon.disponible ? "default" : "destructive"}>{cupon.disponible ? "Activo" : "Inactivo"}</Badge>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="icon" variant="outline" onClick={() => handleEdit(cupon)}>
                  <Edit size={16} />
                </Button>
                <Button size="icon" variant="destructive" onClick={() => handleDelete(cupon)}>
                  <Trash2 size={16} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <CuponDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        cupon={editCupon}
        onSave={(cupon) => {
          setDialogOpen(false);
          // Actualiza lista de cupones (optimista)
        }}
      />
    </div>
  );
}

// --- Diálogo para crear/editar cupón ---
type CuponDialogProps = {
  open: boolean;
  onClose: () => void;
  cupon: Cupon | null;
  onSave: (cupon: Cupon) => void;
};

function CuponDialog({ open, onClose, cupon, onSave }: CuponDialogProps) {
  const [form, setForm] = useState<Cupon>(
    cupon || {
      id: "",
      nombre: "",
      descripcion: "",
      imagen_url: "",
      tipo_descuento: "porcentaje",
      valor_descuento: 0,
      fecha_inicio: "",
      fecha_fin: "",
      hora_inicio: "",
      hora_fin: "",
      disponible: true,
    }
  );
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (cupon) setForm(cupon);
    else setForm({
      id: "",
      nombre: "",
      descripcion: "",
      imagen_url: "",
      tipo_descuento: "porcentaje",
      valor_descuento: 0,
      fecha_inicio: "",
      fecha_fin: "",
      hora_inicio: "",
      hora_fin: "",
      disponible: true,
    });
  }, [cupon, open]);

  function handleChange<K extends keyof Cupon>(key: K, value: Cupon[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit() {
    setSubmitting(true);
    // Aquí iría la lógica real de crear/editar
    setTimeout(() => {
      onSave(form);
      setSubmitting(false);
      toast.success("Cupón guardado exitosamente");
    }, 1000);
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{cupon ? "Editar cupón" : "Nuevo cupón"}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-2">
          <div className="grid gap-1">
            <Label>Nombre</Label>
            <Input
              value={form.nombre}
              onChange={(e) => handleChange("nombre", e.target.value)}
              disabled={submitting}
              required
            />
          </div>
          <div className="grid gap-1">
            <Label>Descripción</Label>
            <Textarea
              value={form.descripcion}
              onChange={(e) => handleChange("descripcion", e.target.value)}
              disabled={submitting}
              required
            />
          </div>
          {/* Aquí puedes agregar ImageUpload para imagen_url */}
          <div className="grid gap-1">
            <Label>Tipo de descuento</Label>
            <select
              className="border rounded px-2 py-1"
              value={form.tipo_descuento}
              onChange={(e) => handleChange("tipo_descuento", e.target.value as Cupon["tipo_descuento"])}
              disabled={submitting}
            >
              <option value="porcentaje">Porcentaje (%)</option>
              <option value="monto">Monto ($)</option>
            </select>
          </div>
          <div className="grid gap-1">
            <Label>Valor</Label>
            <Input
              type="number"
              value={form.valor_descuento}
              onChange={(e) => handleChange("valor_descuento", Number(e.target.value))}
              disabled={submitting}
              required
              min={0}
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="grid gap-1">
              <Label>Fecha inicio</Label>
              <Input
                type="date"
                value={form.fecha_inicio}
                onChange={(e) => handleChange("fecha_inicio", e.target.value)}
                disabled={submitting}
                required
              />
            </div>
            <div className="grid gap-1">
              <Label>Fecha fin</Label>
              <Input
                type="date"
                value={form.fecha_fin}
                onChange={(e) => handleChange("fecha_fin", e.target.value)}
                disabled={submitting}
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="grid gap-1">
              <Label>Hora inicio</Label>
              <Input
                type="time"
                value={form.hora_inicio}
                onChange={(e) => handleChange("hora_inicio", e.target.value)}
                disabled={submitting}
                required
              />
            </div>
            <div className="grid gap-1">
              <Label>Hora fin</Label>
              <Input
                type="time"
                value={form.hora_fin}
                onChange={(e) => handleChange("hora_fin", e.target.value)}
                disabled={submitting}
                required
              />
            </div>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <Switch
              checked={form.disponible}
              onCheckedChange={(v) => handleChange("disponible", v)}
              disabled={submitting}
            />
            <span className="text-sm">Disponible</span>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={submitting}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit} disabled={submitting}>
            Guardar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

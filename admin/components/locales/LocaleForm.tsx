import { useForm, useFieldArray, type SubmitHandler, type Control, type UseFormReturn } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { LocalConHorarios, LocalInsert, HorarioInsert } from "@/types/tipos_supabase_resumidos"
import { Plus, Trash2 } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { formatTimeString, parseTimeToDBFormat } from "@/lib/timeUtils"

// Extend the form types to include our custom form props
declare module "@/components/ui/form" {
  interface FormProps extends Omit<React.HTMLAttributes<HTMLFormElement>, 'onSubmit'> {
    form: UseFormReturn<FormValues>
    onSubmit: (data: FormValues) => void
  }
}

type DiaSemana = "Lunes" | "Martes" | "Miércoles" | "Jueves" | "Viernes" | "Sábado" | "Domingo"

interface HorarioForm extends Omit<HorarioInsert, 'local_id' | 'created_at'> {
  id?: string
}

// Form schema
const formSchema = z.object({
  nombre: z.string().min(1, "El nombre es requerido"),
  direccion: z.string().min(1, "La dirección es requerida"),
  telefono: z.string().default(""),
  latitud: z.string()
    .refine(val => val === "" || !isNaN(Number(val)) && Number(val) >= -90 && Number(val) <= 90, "Latitud inválida")
    .default(""),
  longitud: z.string()
    .refine(val => val === "" || !isNaN(Number(val)) && Number(val) >= -180 && Number(val) <= 180, "Longitud inválida")
    .default(""),
  horarios: z.array(
    z.object({
      id: z.string().optional(),
      dia: z.enum(["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"] as const, {
        required_error: "El día es requerido"
      }),
      hora_inicio: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Formato HH:MM"),
      hora_fin: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Formato HH:MM")
    })
  ).default([])
})

type FormValues = z.infer<typeof formSchema> & {
  horarios: Array<{
    id?: string;
    dia: DiaSemana;
    hora_inicio: string;
    hora_fin: string;
  }>;
}

interface LocaleFormProps {
  initialData?: LocalConHorarios | null
  onSubmit: (data: Omit<LocalInsert, 'id' | 'created_at'> & {
    horarios?: HorarioInsert[]
  }) => Promise<void>
  onCancel: () => void
  isLoading?: boolean
}

export function LocaleForm({ initialData, onSubmit, onCancel, isLoading }: LocaleFormProps) {
  // Helper function to format time for display
  const formatTimeForInput = (timeStr?: string | null): string => {
    if (!timeStr) return '';
    // If it's already in HH:MM format, return as is
    if (/^\d{2}:\d{2}$/.test(timeStr)) return timeStr;
    
    // Otherwise, parse from timetz format
    const timePart = timeStr.split('+')[0].split('T')[1] || timeStr;
    return timePart.substring(0, 5); // Return only HH:MM part
  };

  const defaultValues = {
    nombre: initialData?.nombre || "",
    direccion: initialData?.direccion || "",
    telefono: initialData?.telefono || "",
    latitud: initialData?.latitud?.toString() || "",
    longitud: initialData?.longitud?.toString() || "",
    horarios: initialData?.horarios?.map(h => ({
      id: h.id,
      dia: h.dia,
      hora_inicio: formatTimeForInput(h.hora_inicio) || "09:00",
      hora_fin: formatTimeForInput(h.hora_fin) || "18:00"
    })) || []
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema) as any, 
    defaultValues
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "horarios" as const
  })

  const addSchedule = () => {
    append({
      dia: "Lunes",
      hora_inicio: "09:00",
      hora_fin: "18:00"
    })
  }

  const handleSubmit: SubmitHandler<FormValues> = async (formData) => {
    try {
      const isNew = !initialData?.id;

      // Prepare the base locale data
      const localeData: Omit<LocalInsert, 'id' | 'created_at'> = {
        nombre: formData.nombre,
        direccion: formData.direccion,
        telefono: formData.telefono || "",
        latitud: formData.latitud ? parseFloat(formData.latitud) : 0,
        longitud: formData.longitud ? parseFloat(formData.longitud) : 0,
      };

      // For existing locales, include horarios with local_id
      if (!isNew && formData.horarios.length > 0) {
        const horariosWithLocalId = formData.horarios.map(horario => ({
          ...horario,
          dia: horario.dia as DiaSemana,
          hora_inicio: parseTimeToDBFormat(horario.hora_inicio),
          hora_fin: parseTimeToDBFormat(horario.hora_fin),
          local_id: initialData.id // This is safe because we're in the !isNew block
        }));

        await onSubmit({
          ...localeData,
          horarios: horariosWithLocalId as HorarioInsert[]
        });
      } else {
        // For new locales, include the horarios in the submission
        const horariosWithFormattedTimes = formData.horarios.map(horario => ({
          ...horario,
          hora_inicio: parseTimeToDBFormat(horario.hora_inicio),
          hora_fin: parseTimeToDBFormat(horario.hora_fin)
        }));
        
        await onSubmit({
          ...localeData,
          horarios: horariosWithFormattedTimes as HorarioInsert[]
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      // Optionally show error to user
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="nombre"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input placeholder="Nombre del local" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="telefono"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Teléfono</FormLabel>
                <FormControl>
                  <Input placeholder="Teléfono" {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="direccion"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Dirección</FormLabel>
                <FormControl>
                  <Textarea placeholder="Dirección completa" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="latitud"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Latitud</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="any"
                    placeholder="Ej: -34.603722"
                    {...field}
                    value={field.value === undefined ? "" : field.value}
                    onChange={(e) => field.onChange(e.target.value === "" ? undefined : e.target.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="longitud"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Longitud</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="any"
                    placeholder="Ej: -58.381592"
                    {...field}
                    value={field.value === undefined ? "" : field.value}
                    onChange={(e) => field.onChange(e.target.value === "" ? undefined : e.target.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Horarios</h3>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addSchedule}
            >
              <Plus className="mr-2 h-4 w-4" />
              Agregar horario
            </Button>
          </div>

          <div className="border rounded-md p-4">
            <ScrollArea className="h-[200px] pr-4">
              <div className="space-y-4">
                {fields.length === 0 ? (
                  <p className="text-sm text-muted-foreground p-4 text-center">
                    No hay horarios definidos. Agrega al menos un horario.
                  </p>
                ) : (
                  fields.map((field, index) => (
                    <div key={field.id} className="flex items-center gap-2">
                      <div className="grid flex-1 grid-cols-3 gap-2">
                        <FormField
                          control={form.control}
                          name={`horarios.${index}.dia`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className={index > 0 ? "sr-only" : ""}>
                                Día
                              </FormLabel>
                              <FormControl>
                                <select
                                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                  value={field.value}
                                  onChange={(e) => field.onChange(e.target.value as DiaSemana)}
                                >
                                  <option value="Lunes">Lunes</option>
                                  <option value="Martes">Martes</option>
                                  <option value="Miércoles">Miércoles</option>
                                  <option value="Jueves">Jueves</option>
                                  <option value="Viernes">Viernes</option>
                                  <option value="Sábado">Sábado</option>
                                  <option value="Domingo">Domingo</option>
                                </select>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`horarios.${index}.hora_inicio`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className={index > 0 ? "sr-only" : ""}>
                                Hora inicio
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type="time"
                                  value={field.value || ''}
                                  aria-describedby={`hora-inicio-${index}-description`}
                                  onChange={(e) => field.onChange(e.target.value)}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`horarios.${index}.hora_fin`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className={index > 0 ? "sr-only" : ""}>
                                Hora fin
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type="time"
                                  value={field.value || ''}
                                  aria-describedby={`hora-fin-${index}-description`}
                                  className="w-full"
                                  onChange={(e) => field.onChange(e.target.value)}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => remove(index)}
                        className="self-center"
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  ))
                )}
              </div>
            </ScrollArea>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancelar
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Guardando..." : "Guardar"}
          </Button>
        </div>
      </form>
    </Form>
  )
}

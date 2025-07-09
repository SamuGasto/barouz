import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Pencil, Trash2, MapPin, Phone, Clock } from "lucide-react"
import { LocalConHorarios } from "@/types/tipos_supabase_resumidos"
import { ScrollArea } from "../ui/scroll-area"
import { Badge } from "../ui/badge"
import { formatTimeString } from "@/lib/timeUtils"

type LocaleCardProps = {
  locale: LocalConHorarios
  onEdit: () => void
  onDelete: () => void
}

export function LocaleCard({ locale, onEdit, onDelete }: LocaleCardProps) {
  const daysOfWeek = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"]

  // Group schedules by day
  const schedulesByDay = daysOfWeek.map(day => ({
    day,
    schedules: (locale.horarios || []).filter(h => h.dia === day)
  })).filter(day => day.schedules.length > 0)

  return (
    <Card className="w-full max-w-md overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl font-bold text-primary">{locale.nombre}</CardTitle>
            <CardDescription className="mt-1">
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mr-2" />
                {locale.direccion}
              </div>
              {locale.telefono && (
                <div className="flex items-center mt-1 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4 mr-2" />
                  {locale.telefono}
                </div>
              )}
              {locale.latitud && locale.longitud && (
                <div className="mt-2">
                  <Badge variant="outline" className="text-xs font-mono">
                    {locale.latitud.toFixed(6)}, {locale.longitud.toFixed(6)}
                  </Badge>
                </div>
              )}
            </CardDescription>
          </div>
          <div className="flex space-x-1">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8" 
              onClick={onEdit}
              title="Editar local"
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-destructive hover:text-destructive"
              onClick={onDelete}
              title="Eliminar local"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="rounded-md border">
          <div className="flex items-center bg-muted/50 px-4 py-2">
            <Clock className="h-4 w-4 mr-2" />
            <span className="font-medium">Horarios</span>
          </div>
          {schedulesByDay.length > 0 ? (
            <ScrollArea className="h-[200px] px-4 py-2">
              <div className="space-y-3">
                {schedulesByDay.map(({ day, schedules }) => (
                  <div key={day} className="text-sm">
                    <div className="font-medium text-foreground">{day}</div>
                    <div className="mt-1 space-y-1">
                      {schedules.map((s, i) => (
                        <div key={i} className="flex items-center justify-between bg-muted/20 rounded px-2 py-1 text-sm">
                          <span className="text-muted-foreground">
                            {formatTimeString(s.hora_inicio)} - {formatTimeString(s.hora_fin)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          ) : (
            <div className="p-4 text-center">
              <p className="text-sm text-muted-foreground">Sin horarios definidos</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

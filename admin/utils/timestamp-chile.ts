export function getCurrentTimestampWithChileOffset(): string {
  // 1. Creamos un nuevo objeto Date. Esto nos da la fecha y hora local del sistema.
  const now = new Date();

  // 2. Obtenemos el offset de la zona horaria en minutos.
  // El método getTimezoneOffset() devuelve la diferencia en minutos entre UTC y la hora local.
  // Para Chile (GMT-4), esto te dará un valor positivo, por ejemplo 240, ya que Chile está "detrás" de UTC.
  const offsetMinutes = now.getTimezoneOffset();

  // 3. Convertimos el offset a horas y minutos.
  // Usamos Math.abs() para asegurarnos de que el valor sea positivo para el cálculo de horas/minutos.
  const offsetHours = Math.abs(Math.floor(offsetMinutes / 60));
  const offsetMins = Math.abs(offsetMinutes % 60);

  // 4. Determinamos el signo del offset (+ o -).
  // Si el offset es positivo (el horario local está detrás de UTC), el signo es '-'.
  // Si es negativo (el horario local está delante de UTC), el signo es '+'.
  // En Chile (GMT-4), el offset es -04:00, que es "detrás" de UTC, por lo que el signo es '-'.
  const offsetSign = offsetMinutes > 0 ? "-" : "+";

  // 5. Formateamos las partes del offset para que siempre tengan dos dígitos (ej. "04:00" en lugar de "4:0").
  const formattedOffsetHours = String(offsetHours).padStart(2, "0");
  const formattedOffsetMins = String(offsetMins).padStart(2, "0");

  // 6. Generamos el string de la fecha en formato ISO 8601 (YYYY-MM-DDTHH:MM:SS.sssZ)
  // toISOString() convierte la fecha a formato UTC (con la 'Z' al final), que es lo que necesitas como base.
  const isoString = now.toISOString();

  // 7. Reemplazamos la 'Z' (que indica UTC) con nuestro offset calculado.
  // Tomamos la parte de la fecha y hora de la cadena ISO (sin la 'Z')

  const formattedTimestamp =
    isoString.split(".")[0] +
    `${offsetSign}${formattedOffsetHours}:${formattedOffsetMins}`;

  return formattedTimestamp;
}

export function parseTimestamp(timestampzString: string): {
  date: string;
  time: string;
} {
  // 1. Creamos un objeto Date a partir del string.
  // JavaScript lo parseará automáticamente y lo ajustará a la zona horaria local.
  const dateObject = new Date(timestampzString);

  // 2. Formateamos la fecha a una cadena 'YYYY-MM-DD'.
  // Puedes usar métodos como getFullYear(), getMonth(), getDate()
  // para construir el string de fecha.
  const year = dateObject.getFullYear();
  // getMonth() devuelve un valor de 0 a 11, por eso sumamos 1.
  const month = String(dateObject.getMonth() + 1).padStart(2, "0");
  const day = String(dateObject.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;

  // 3. Formateamos la hora a una cadena 'HH:MM:SS'.
  // Usamos getHours(), getMinutes(), getSeconds() para construir el string de hora.
  const hours = String(dateObject.getHours()).padStart(2, "0");
  const minutes = String(dateObject.getMinutes()).padStart(2, "0");
  const seconds = String(dateObject.getSeconds()).padStart(2, "0");
  const formattedTime = `${hours}:${minutes}:${seconds}`;

  // 4. Devolvemos un objeto con la fecha y la hora separadas.
  return { date: formattedDate, time: formattedTime };
}

// Formatea un string de tiempo (HH:MM:SS o HH:MM:SS+HH:MM) a formato HH:MM AM/PM
export const formatTimeString = (timeStr?: string | null): string => {
  if (!timeStr) return '';
  
  // Extraer solo la parte de la hora (HH:MM:SS) si hay información de zona horaria
  const timePart = timeStr.split('+')[0].split('T')[1] || timeStr;
  
  // Dividir en horas, minutos y segundos
  const [hours, minutes] = timePart.split(':').map(Number);
  
  // Convertir a formato 12 horas
  const period = hours >= 12 ? 'PM' : 'AM';
  const hours12 = hours % 12 || 12;
  
  return `${hours12}:${minutes.toString().padStart(2, '0')} ${period}`;
};

// Convierte un string de tiempo en formato HH:MM AM/PM a formato HH:MM:SS para la base de datos
export const parseTimeToDBFormat = (timeStr: string): string => {
  if (!timeStr) return '';
  
  // Si ya está en formato HH:MM:SS, devolverlo tal cual
  if (/^\d{2}:\d{2}:\d{2}$/.test(timeStr)) {
    return timeStr;
  }
  
  // Convertir de formato 12h a 24h
  const [time, period] = timeStr.split(' ');
  let [hours, minutes] = time.split(':').map(Number);
  
  if (period === 'PM' && hours < 12) {
    hours += 12;
  } else if (period === 'AM' && hours === 12) {
    hours = 0;
  }
  
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:00`;
};

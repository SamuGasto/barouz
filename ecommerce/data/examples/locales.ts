import { Local } from "../tipos";

const locales: Local[] = [
  {
    id: "1",
    nombre: "Local Principal",
    direccion: "Guillermo Shell 185, Requinoa, Requínoa, O'Higgins",
    telefono: "Telefono 1",
    horarios: [
      {
        id: "1",
        dia: "Lunes",
        hora_inicio: "08:00",
        hora_fin: "17:00",
      },
      {
        id: "2",
        dia: "Martes",
        hora_inicio: "08:00",
        hora_fin: "17:00",
      },
      {
        id: "3",
        dia: "Miercoles",
        hora_inicio: "08:00",
        hora_fin: "17:00",
      },
      {
        id: "4",
        dia: "Jueves",
        hora_inicio: "08:00",
        hora_fin: "17:00",
      },
      {
        id: "5",
        dia: "Viernes",
        hora_inicio: "08:00",
        hora_fin: "17:00",
      },
      {
        id: "6",
        dia: "Sabado",
        hora_inicio: "08:00",
        hora_fin: "17:00",
      },
    ],
    latitud: -34.284882158754215,
    longitud: -70.81802492200268,
  },
];

export default locales;

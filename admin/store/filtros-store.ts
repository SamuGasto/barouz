

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type FiltrosState = {
  filtro_texto_pedidos: string;
  filtro_completados_pedidos: number[];
  filtro_estado_pedidos: number[];
};

export type Actions = {
  setFiltroTextoPedidos: (texto: string) => void;
  setFiltroCompletadosPedidos: (completados: number[]) => void;
  setFiltroEstadoPedidos: (estado: number[]) => void;
};

export type FiltrosStore = FiltrosState & Actions;

export const createFiltrosStore = () => {
  return create<FiltrosStore>()(
    persist(
      (set, get) => ({
        filtro_texto_pedidos: "",
        filtro_completados_pedidos: [0, 0, 1], // Activos, Completados, Todos
        filtro_estado_pedidos: [1, 0, 0, 0], // Todos, Recibidos, En preparacion, En camino
        setFiltroTextoPedidos: (texto: string) =>
          set((state) => ({ ...state, filtro_texto_pedidos: texto })),
        setFiltroCompletadosPedidos: (completados: number[]) =>
          set((state) => ({
            ...state,
            filtro_completados_pedidos: completados,
          })),
        setFiltroEstadoPedidos: (estado: number[]) =>
          set((state) => ({ ...state, filtro_estado_pedidos: estado })),
      }),
      { name: "filtros" },
    ),
  );
};
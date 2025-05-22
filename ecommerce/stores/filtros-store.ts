import { create } from "zustand";
import { persist } from "zustand/middleware";

export type FiltrosState = {
  filtro_texto: string;
  filtro_categoria: number[];
};

export type Actions = {
  setFiltroTexto: (texto: string) => void;
  setFiltroCategoria: (categoria: number[]) => void;
};

export type FiltrosStore = FiltrosState & Actions;

export const createFiltrosStore = () => {
  return create<FiltrosStore>()(
    persist(
      (set, get) => ({
        filtro_texto: "",
        filtro_categoria: [0, 0, 0, 0, 0, 0, 0],
        setFiltroTexto: (texto: string) =>
          set((state) => ({ ...state, filtro_texto: texto })),
        setFiltroCategoria: (categoria: number[]) =>
          set((state) => ({ ...state, filtro_categoria: categoria })),
      }),
      { name: "filtros" },
    ),
  );
};

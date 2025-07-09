import { CategoriaProductos } from "@/types/resumen-tipos";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type FiltrosState = {
  filtro_texto: string;
  filtro_categoria: CategoriaProductos[];
};

export type Actions = {
  setFiltroTexto: (texto: string) => void;
  setFiltroCategoria: (categoria: CategoriaProductos[]) => void;
};

export type FiltrosStore = FiltrosState & Actions;

export const createFiltrosStore = () => {
  return create<FiltrosStore>()(
    persist(
      (set, get) => ({
        filtro_texto: "",
        filtro_categoria: [
          "Waffles",
          "Helados",
          "Churros",
          "Waffle Cookies",
          "Postres",
          "Bebidas",
          "Otros",
        ],
        setFiltroTexto: (texto: string) =>
          set((state) => ({ ...state, filtro_texto: texto })),
        setFiltroCategoria: (categoria: CategoriaProductos[]) =>
          set((state) => ({ ...state, filtro_categoria: categoria })),
      }),
      { name: "filtros" }
    )
  );
};

import { CuponRow } from "@/types/resumen-tipos";
import { Database } from "@/types/supabase";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// Tipos
export type ExtraCarrito = {
  extra_id: string;
  nombre: string;
  cantidad: number;
  precio: number;
  precio_final: number;
  categoria: string;
};

export type ItemCarrito = {
  id: string; // ID único para cada ítem en el carrito
  producto_id: string;
  nombre: string;
  cantidad: number;
  precio_unitario: number;
  precio_final: number;
  imagen: string;
  extras: ExtraCarrito[];
  notas?: string;
  fecha_agregado: string;
};

export type CarritoState = {
  items: ItemCarrito[];
  totalItems: number;
  cupon: CuponRow | null;
};

export type CarritoActions = {
  agregarAlCarrito: (
    item: Omit<ItemCarrito, "id" | "fecha_agregado" | "precio_final">
  ) => void;
  eliminarDelCarrito: (id: string) => void;
  actualizarCantidad: (id: string, cantidad: number) => void;
  actualizarExtras: (id: string, extras: ExtraCarrito[]) => void;
  limpiarCarrito: () => void;
  aplicarCupon: (cupon: CuponRow) => void;
  eliminarCupon: () => void;
  isCuponUsado: (cupon: string) => boolean;
};

export type CarritoStore = CarritoState & CarritoActions;

// Función para calcular el total de un ítem
const calcularTotalItem = (
  precio: number,
  cantidad: number,
  extras: ExtraCarrito[]
) => {
  const totalExtras = extras.reduce(
    (sum, extra) => sum + extra.precio_final,
    0
  );
  return precio * cantidad + totalExtras;
};

export const createCarritoStore = () => {
  return create<CarritoStore>()(
    persist(
      (set, get) => ({
        items: [],
        totalItems: 0,
        cupon: null,

        agregarAlCarrito: (item) =>
          set((state) => {
            const id = crypto.randomUUID();
            const nuevoItem: ItemCarrito = {
              ...item,
              id,
              fecha_agregado: new Date().toISOString(),
              precio_final: calcularTotalItem(
                item.precio_unitario,
                item.cantidad,
                item.extras
              ),
            };

            return {
              ...state,
              items: [...state.items, nuevoItem],
              totalItems: state.totalItems + 1,
            };
          }),

        eliminarDelCarrito: (id) =>
          set((state) => ({
            ...state,
            items: state.items.filter((item: ItemCarrito) => item.id !== id),
            totalItems: state.totalItems - 1,
            cupon: state.items.length === 0 ? null : state.cupon,
          })),

        actualizarCantidad: (id, cantidad) =>
          set((state) => ({
            ...state,
            items: state.items.map((item: ItemCarrito) =>
              item.id === id
                ? {
                    ...item,
                    cantidad,
                    precio_final: calcularTotalItem(
                      item.precio_unitario,
                      cantidad,
                      item.extras
                    ),
                  }
                : item
            ),
          })),

        actualizarExtras: (id, extras) =>
          set((state) => ({
            ...state,
            items: state.items.map((item: ItemCarrito) =>
              item.id === id
                ? {
                    ...item,
                    extras,
                    precio_final: calcularTotalItem(
                      item.precio_unitario,
                      item.cantidad,
                      extras
                    ),
                  }
                : item
            ),
          })),

        limpiarCarrito: () =>
          set((state) => ({ ...state, items: [], totalItems: 0, cupon: null })),

        aplicarCupon: (cupon) => set((state) => ({ ...state, cupon })),

        eliminarCupon: () => set((state) => ({ ...state, cupon: null })),

        isCuponUsado: (cupon) => {
          const { cupon: cuponActual } = get();
          return cuponActual?.nombre === cupon;
        },
      }),
      {
        name: "carrito-storage",
        storage: createJSONStorage(() => localStorage),
      }
    )
  );
};

"use client";
import { FiltrosStore, createFiltrosStore } from "@/stores/filtros-store";
import { createContext, ReactNode, useContext, useRef } from "react";
import { useStore } from "zustand";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export type FiltrosStoreApi = ReturnType<typeof createFiltrosStore>;

const FiltrosStoreContext = createContext<FiltrosStoreApi | undefined>(
  undefined,
);

export interface FiltrosStoreProviderProps {
  children: ReactNode;
}

export const FiltrosStoreProvider = ({
  children,
}: FiltrosStoreProviderProps) => {
  const storeRef = useRef<FiltrosStoreApi>(null);
  if (!storeRef.current) {
    storeRef.current = createFiltrosStore();
  }

  return (
    <FiltrosStoreContext.Provider value={storeRef.current}>
      {children}
    </FiltrosStoreContext.Provider>
  );
};

export const useFiltrosStore = <T,>(
  selector: (store: FiltrosStore) => T,
): T => {
  const filtrosStoreContext = useContext(FiltrosStoreContext);

  if (!filtrosStoreContext) {
    throw new Error(
      "useFiltrosStore must be used within a FiltrosStoreProvider",
    );
  }

  return useStore(filtrosStoreContext, selector);
};

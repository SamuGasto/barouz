"use client";
import { createContext, ReactNode, useContext, useRef } from "react";
import { useStore } from "zustand";
import { createFiltrosStore, FiltrosStore } from "@/store/filtros-store";

export type FiltrosStoreApi = ReturnType<typeof createFiltrosStore>;

const FiltrosStoreContext = createContext<FiltrosStoreApi | undefined>(undefined);

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
    selector: (store: FiltrosStore) => T
): T => {
    const store = useContext(FiltrosStoreContext);

    if (!store) {
        throw new Error(
            "useFiltrosStore must be used within a FiltrosStoreProvider"
        );
    }

    return useStore(store, selector);
};
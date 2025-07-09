"use client";
import { CarritoStore, createCarritoStore } from "@/stores/carrito";
import { createContext, ReactNode, useContext, useRef } from "react";
import { useStore } from "zustand";

export type CarritoStoreApi = ReturnType<typeof createCarritoStore>;

const CarritoStoreContext = createContext<CarritoStoreApi | undefined>(undefined);

export interface CarritoStoreProviderProps {
    children: ReactNode;
}

export const CarritoStoreProvider = ({
    children,
}: CarritoStoreProviderProps) => {
    const storeRef = useRef<CarritoStoreApi>(null);
    if (!storeRef.current) {
        storeRef.current = createCarritoStore();
    }

    return (
        <CarritoStoreContext.Provider value={storeRef.current}>
            {children}
        </CarritoStoreContext.Provider>
    );
};

export const useCarritoStore = <T,>(
    selector: (store: CarritoStore) => T
): T => {
    const carritoStoreContext = useContext(CarritoStoreContext);

    if (!carritoStoreContext) {
        throw new Error(
            "useCarritoStore must be used within a CarritoStoreProvider"
        );
    }

    return useStore(carritoStoreContext, selector);
};
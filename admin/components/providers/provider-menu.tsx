"use client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FiltrosStoreProvider } from "./filtros-store-provider";

const queryClient = new QueryClient();

export default function MenuProvider({ children }: { children: React.ReactNode }) {
    return (
        <FiltrosStoreProvider>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </FiltrosStoreProvider>
    );
}
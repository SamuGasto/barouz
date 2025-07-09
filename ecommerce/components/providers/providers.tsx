"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { CarritoStoreProvider } from "./carrito-provider";
import { FiltrosStoreProvider } from "./filtros-provider";
import { AuthProvider } from "./auth-provider";

const queryClient = new QueryClient();

export const Providers = ({ children }: { children: React.ReactNode }) => {
    return <QueryClientProvider client={queryClient}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <CarritoStoreProvider>
                <FiltrosStoreProvider>
                    <AuthProvider>
                        {children}
                    </AuthProvider>
                </FiltrosStoreProvider>
            </CarritoStoreProvider>
        </ThemeProvider></QueryClientProvider>;
};
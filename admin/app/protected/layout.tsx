import NavbarProtected from "@/components/general/navbar/navbar-protected";
import { FiltrosStoreProvider } from "@/components/providers/filtros-store-provider";

export default function ProtectedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <NavbarProtected />
            <FiltrosStoreProvider>
                <div className="flex w-full flex-col gap-20 px-5">
                    {children}
                </div>
            </FiltrosStoreProvider>
        </>
    );
}
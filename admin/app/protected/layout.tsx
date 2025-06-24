import NavbarProtected from "@/components/general/navbar/navbar-protected";
import MenuProvider from "@/components/providers/provider-menu";
import { Toaster } from "@/components/ui/sonner";

export default function ProtectedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <NavbarProtected />
            <MenuProvider>
                <div className="flex w-full flex-col gap-20 px-5">
                    {children}
                </div>
                <Toaster richColors />
            </MenuProvider>
        </>
    );
}
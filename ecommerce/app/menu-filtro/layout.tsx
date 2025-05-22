import { FiltrosStoreProvider } from "@/components/providers/filtros-provider";
import React from "react";

function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <FiltrosStoreProvider>{children}</FiltrosStoreProvider>
    </div>
  );
}

export default Layout;

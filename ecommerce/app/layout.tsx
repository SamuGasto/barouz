import { Geist } from "next/font/google";
import "@/globals.css";
import Navbar from "@/components/general/navbar/navbar";
import Footer from "@/components/general/footer/footer";
import { Metadata } from "next";
import og_image from "@/images/barouz-logo.png";
import { Providers } from "@/components/providers/providers";
import { Toaster } from "sonner";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Barouz",
  description: "Tienda de Helados, Waffles, Churros y más",
  keywords: ["Helados", "Waffles", "Churros", "Postres", "Bebidas", "Barouz"],
  openGraph: {
    title: "Barouz",
    description: "Tienda de Helados, Waffles, Churros y más",
    type: "website",
    locale: "es-CL",
    siteName: "Barouz",
    url: "https://barouz.cl",
    images: [
      {
        url: og_image.src,
        width: og_image.width,
        height: og_image.height,
        alt: "Barouz",
      },
    ],
  },
};

const geistSans = Geist({
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={geistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <Providers>
          <div className="flex w-full flex-1 flex-col items-center">
            <nav className="flex w-full h-16 border p-3 px-5">
              <Navbar />
            </nav>
            <div className="flex w-full flex-col items-center justify-center gap-6">
              <main className="flex w-full flex-col items-center gap-6">
                {children}
              </main>
            </div>
            <Footer />
          </div>
          <Toaster richColors />
        </Providers>
      </body>
    </html>
  );
}

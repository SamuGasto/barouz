import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "@/globals.css";
import Navbar from "@/components/general/navbar/navbar";
import Footer from "@/components/general/footer/footer";
import Banner from "@/components/pagina-principal/banner";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Barouz",
  description: "Tienda de Helados, Waffles, Churros y más",
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
    <html lang="en" className={geistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="flex min-h-screen flex-col items-center">
            <div className="flex w-full flex-1 flex-col items-center">
              <Navbar />
              <div className="flex w-full flex-col items-center justify-center gap-6">
                {children}
              </div>

              <Footer />
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}

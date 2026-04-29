import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import "leaflet/dist/leaflet.css";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("http://127.0.0.1:3000"),
  title: {
    default: "Grünewald Gruppe",
    template: "%s | Grünewald Gruppe",
  },
  description:
    "Unternehmenswebsite der Grünewald Gruppe für Privatkunden, Gewerbebau, Klimadecken, Personal und zentrale Steuerung.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className={`${montserrat.className} min-h-screen`}>
        <div className="relative flex min-h-screen flex-col">
          <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(219,228,242,0.12),transparent_34%)]" />
          <Header />
          <main className="flex w-full flex-1 flex-col gap-10 py-6 sm:py-8 lg:gap-12 lg:py-10">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}

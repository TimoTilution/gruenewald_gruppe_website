import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { ScrollToTop } from "@/components/scroll-to-top";
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
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
          <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(219,228,242,0.13),transparent_34%)]" />
          <ScrollToTop />
          <Header />
          <main className="relative z-0 flex w-full flex-1 flex-col gap-14 py-8 sm:py-10 lg:gap-20 lg:py-14">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}

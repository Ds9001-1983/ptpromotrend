import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { CursorProvider } from "@/components/providers/CursorProvider";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Footer } from "@/components/layout/Footer";
import { StickyMobileBar } from "@/components/layout/StickyMobileBar";
import { site } from "@/content/site-config";
import "./globals.css";

const switzer = localFont({
  src: "./fonts/Switzer-Variable.woff2",
  variable: "--font-switzer",
  weight: "100 900",
  display: "swap",
});

const generalSans = localFont({
  src: "./fonts/GeneralSans-Variable.woff2",
  variable: "--font-general-sans",
  weight: "200 700",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.domain),
  title: {
    default:
      "Werbeartikel aus Wiehl im Oberbergischen | PROMOtrend – Annette Herrmann",
    template: "%s | PROMOtrend Wiehl",
  },
  description:
    "Werbeartikel, Werbemittel und Mitarbeiterbekleidung mit deinem Logo — kuratiert aus über 100.000 Artikeln und persönlich beraten von Annette Herrmann. Schreib ihr direkt per WhatsApp.",
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: site.name,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#fafaf7",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de" className={`${switzer.variable} ${generalSans.variable}`}>
      <body>
        <SmoothScrollProvider>
          <SiteHeader />
          {children}
          <Footer />
          <StickyMobileBar />
          <CursorProvider />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}

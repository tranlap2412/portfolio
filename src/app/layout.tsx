import { LinguiClientProvider } from "@/components/lingui-client-provider";
import Navbar from "@/components/navbar";
import { SiteBackground } from "@/components/site-background";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";
import { initLingui } from "@/i18n/init";
import { resolveLocale } from "@/i18n/locales";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

const fontSans = FontSans({
  subsets: ["latin", "vietnamese"],
  display: "swap",
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL(DATA.url),
  title: {
    default: DATA.name + " — Timeline Portfolio",
    template: `%s | ${DATA.name}`,
  },
  description: DATA.description,
  openGraph: {
    title: `${DATA.name}`,
    description: DATA.description,
    url: DATA.url,
    siteName: `${DATA.name}`,
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: `${DATA.name}`,
    card: "summary_large_image",
  },
  verification: {
    google: "",
    yandex: "",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = resolveLocale(headers().get("x-locale"));
  initLingui(locale);

  return (
    <html lang={locale} className="dark">
      <body
        className={cn(
          "relative z-10 min-h-screen font-sans antialiased max-w-2xl mx-auto px-6 pt-12 pb-28 sm:pt-24 sm:pb-32",
          fontSans.variable,
        )}
      >
        <SiteBackground />
        <LinguiClientProvider locale={locale}>
          <TooltipProvider delayDuration={0}>
            {children}
            <Navbar />
          </TooltipProvider>
        </LinguiClientProvider>
      </body>
    </html>
  );
}

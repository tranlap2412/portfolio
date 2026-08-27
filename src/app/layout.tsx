import { LinguiClientProvider } from "@/components/lingui-client-provider";
import Navbar from "@/components/navbar";
import { SocialRails } from "@/components/social-rails";
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
          "relative z-10 mx-auto min-h-screen max-w-3xl px-6 pb-32 pt-14 font-sans antialiased sm:px-8 sm:pb-36 sm:pt-24 print:max-w-none print:bg-white print:px-0 print:py-0 print:text-black",
          fontSans.variable,
        )}
      >
        <div className="print-hidden">
          <SiteBackground />
        </div>
        <LinguiClientProvider locale={locale}>
          <TooltipProvider delayDuration={0}>
            {children}
            <SocialRails />
            <div className="print-hidden">
              <Navbar />
            </div>
          </TooltipProvider>
        </LinguiClientProvider>
      </body>
    </html>
  );
}

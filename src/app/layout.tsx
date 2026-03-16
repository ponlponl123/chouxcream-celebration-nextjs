import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { siteConfig } from "@/config/site";
import { fontJapanese, fontSans, fontThai } from "@/config/fonts";
import { JetBrains_Mono } from "next/font/google";
import Footer from "@/components/footer";
import { Providers } from "./providers";
import { cn } from "@/lib/utils";
import clsx from "clsx";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      suppressHydrationWarning
      lang="en"
      className={cn("font-mono", jetbrainsMono.variable)}
    >
      <head />
      <body
        className={clsx(
          "min-h-screen text-foreground bg-background font-sans antialiased apply-custom-cursor",
          fontSans.variable,
          fontThai.variable,
          fontJapanese.variable,
        )}
        style={{
          scrollbarWidth: "thin",
        }}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div className="relative flex flex-col min-h-screen">
            {children}
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}

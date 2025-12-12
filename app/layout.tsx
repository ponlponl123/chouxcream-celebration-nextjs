import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { Link } from "@heroui/link";
import clsx from "clsx";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontJapanese, fontSans, fontThai } from "@/config/fonts";

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
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen text-foreground bg-background font-sans antialiased",
          fontSans.variable,
          fontThai.variable,
          fontJapanese.variable
        )}
        style={{
          scrollbarWidth: "thin",
        }}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div className="relative flex flex-col min-h-screen">
            {children}
            <footer className="w-full flex items-center justify-center py-4">
              <Link
                isExternal
                className="flex items-center gap-1 text-current/60 text-xs opacity-40"
                href="https://ponlponl123.com"
                title="ponlponl123.com homepage"
              >
                <span className="text-default-300">Made with 💛 by</span>
                <p className="text-current">Ponlponl123</p>
              </Link>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "./_components/theme-provider";
import { AppProvider } from "./app/context/app_context";

import "./globals.css";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Financeiro Alffa",
  description: "App financeiro Alffa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AppProvider>
            <SessionProvider>
              {children}
            </SessionProvider>
          </AppProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

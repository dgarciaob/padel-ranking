import { Chivo } from "next/font/google";
import type { Metadata } from "next";

import "./globals.css";

import { cn } from "@/lib/utils";

import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";

const chivo = Chivo({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ranking Padel",
  description: "Ranking de padel y categorización",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={cn("min-h-screen overflow-x-hidden", chivo.className)}>
          <main>{children}</main>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}

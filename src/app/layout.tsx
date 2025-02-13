import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "@/trpc/react";

export const metadata: Metadata = {
  title: "Kool eCFR",
  description: "Code of Federal Regulations - A point in time eCFR system",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <TRPCReactProvider>
          <main className="from-lightBlue to-darkBlue flex min-h-screen flex-col items-center bg-gradient-to-b text-white">
            {children}
          </main>
        </TRPCReactProvider>
      </body>
    </html>
  );
}

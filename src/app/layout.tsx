import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/globals/nav-bar";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import Footer from "@/components/globals/footer";
import ReactQueryProvider from "@/components/globals/provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CaseCobra - Custom Phone Cases",
  description: "Create your own custom phone case with CaseCobra.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ReactQueryProvider>
            <Navbar />
            <main className="flex flex-col min-h-[calc(100vh-3.5rem-1px)]">
              <div className="flex-1 flex flex-col h-full">{children}</div>
              <Footer />
            </main>
          </ReactQueryProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}

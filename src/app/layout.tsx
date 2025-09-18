import Footer from "@/components/globals/footer";
import Navbar from "@/components/globals/nav-bar";
import ReactQueryProvider from "@/components/globals/provider";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Recursive } from 'next/font/google';
import "./globals.css";

const recursive = Recursive({
  variable: "--font-recursive",
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
          className={`${recursive.variable} antialiased`}
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

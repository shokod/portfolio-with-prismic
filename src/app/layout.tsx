import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";


const urbanist = Urbanist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Delvin Shoko Portfolio",
  description: "A portfolio website for Delvin Shoko",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-slate-900 text-slate-100">
      <Header />
      <body className={urbanist.className}>
        {children}
        {/* <div className="h-[200vh]"></div> */}
      </body>
    </html>
  );
}

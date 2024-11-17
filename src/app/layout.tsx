import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import BaseColors from "../../public/colors";
import MainLayout from "@/components/MainLayout";
import RadialGradient from "@/components/RadialGradient/RadialGradient";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hitanshu Gajjar",
  description: "React Native Developer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <MainLayout>{children}</MainLayout>
        <RadialGradient />
      </body>
    </html>
  );
}

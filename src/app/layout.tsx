import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MainLayout from "@/components/MainLayout";
import RadialGradient from "@/components/RadialGradient/RadialGradient";
import CustomCursor from "@/components/CustomCursor";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hitanshu Gajjar",
  description: "Senior Software Engineer – React Native & Frontend",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <CustomCursor />
        <MainLayout>{children}</MainLayout>
        <RadialGradient />
      </body>
    </html>
  );
}

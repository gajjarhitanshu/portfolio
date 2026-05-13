import type { Metadata } from "next";
import { Syne, Space_Mono, Inter } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "600", "700", "800"],
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Hitanshu Gajjar — Senior Software Engineer",
  description:
    "Senior Software Engineer specialising in React Native, Frontend Architecture, and AI-integrated applications.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${syne.variable} ${spaceMono.variable} ${inter.variable}`}>
      <body>
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Bungee, Fredoka, IBM_Plex_Mono } from "next/font/google";
import OperationsHeader from "@/components/OperationsHeader";
import "./globals.css";

const fredoka = Fredoka({
  variable: "--font-guayacos",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const bungee = Bungee({
  variable: "--font-bungee",
  subsets: ["latin"],
  weight: ["400"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Los Guayacos Operations",
  description: "Staff operations dashboard for Los Guayacos orders and menu management.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${fredoka.variable} ${bungee.variable} ${ibmPlexMono.variable} antialiased bg-background text-foreground`}>
        <OperationsHeader />
        <main>{children}</main>
      </body>
    </html>
  );
}

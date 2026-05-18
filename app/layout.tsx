import type { Metadata } from "next";
import localFont from "next/font/local";
import { M_PLUS_Rounded_1c } from "next/font/google";
import "./globals.css";
import { WalletProvider } from "@/components/providers/WalletProvider";

const mPlus = M_PLUS_Rounded_1c({
  weight: ["400", "500", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-anime",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Shelby Cloud",
  description: "High performance, decentralized storage on Aptos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${mPlus.variable} ${geistMono.variable} font-sans antialiased min-h-screen bg-background text-foreground`}
      >
        <WalletProvider>{children}</WalletProvider>
      </body>
    </html>
  );
}

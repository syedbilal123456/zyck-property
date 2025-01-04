import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Appbar from "@/components/Appbar";
import SignInPanel from "@/components/signInPanel";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ZYCK Real Estate",
  description: "Best Real Estate Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
          <Appbar>
            <SignInPanel />
          </Appbar>
          {children}
      </body>
    </html>
  );
}

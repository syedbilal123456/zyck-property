import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/views/Footer";
import Navbar from "@/components/views/Navbar";
import SignInPanel from "@/components/ui/SignInPanel";
import { ToastContainer } from "react-toastify";
import {Providers} from "./provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Zyck Property – Your Trusted Real Estate Partner",
  description: "Explore properties for sale, rent, and real estate services with Zyck Property. Simplifying real estate across Pakistan.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Any global <head> elements can go here */}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar>
          <SignInPanel />
        </Navbar>

        <Providers>
          {children}
        </Providers>
        <ToastContainer />
        <Footer />
      </body>
    </html>
  );
}

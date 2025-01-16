import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/views/Footer";
import Navbar from "@/components/views/Navbar";
import SignInPanel from "@/components/ui/SignInPanel";
import { ToastContainer } from "react-toastify";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Zyck property",
  description: "Created by Zyck technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      <Navbar>
        <SignInPanel/>
          </Navbar>
          
            {children}
          <ToastContainer />
        <Footer/>
      </body>
    </html>
  );
}

"use client";

import Link from "next/link";
import React, { ReactNode, useRef, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

import MobNav from "./MobNav";

interface Props {
  children: ReactNode;
}

const Navbar = ({ children }: Props) => {
  const pathname = usePathname();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const closeTimeout = useRef<NodeJS.Timeout | null>(null);

  const navLinks = [
    { href: "/", label: "HOME" },
    { href: "/properties/buy", label: "BUY" },
    { href: "/properties/rent", label: "RENT" },
    { href: "/user/properties", label: "SELL" },
    { href: "/pricing", label: "PRICING" },
    { href: "/about", label: "ABOUT US" },
    { href: "/FAQs", label: "FAQS" },
  ];

  const isActive = (href: string) => pathname === href;


  return (
    <nav className="bg-background shadow-md sticky top-0 z-50 w-full px-4 lg:px-10">
      {/* Navbar for Small Screens */}

      <div className="flex w-full lg:hidden items-center justify-between">
        <MobNav />
        <div className="flex justify-center ">
          <Link href="/">
            <Image
              className="lg:w-28 md:w-28 sm:w-20"
              src="/logo.png"
              width={150}
              height={150}
              alt="zyck"
            />
          </Link>
        </div>
      </div>

      <div className="flex w-full lg:hidden items-center justify-between py-3">
        <MobNav />
        <Link href="/">
          <Image src="/logo.png" width={120} height={40} alt="zyck" className="w-24" />
        </Link>
        <div>{children}</div>
      </div>

      {/* Navbar for Large Screens */}
      <div className="hidden lg:flex items-center justify-between py-4">
        {/* Logo */}
        <Link href="/">
          <Image src="/logo.png" width={150} height={50} alt="zyck" className="w-36" />
        </Link>

        {/* Navigation Links */}
        <ul className="flex space-x-6 text-md font-medium">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link 
                href={link.href} 
                className={`hover:text-green-500 transition-colors duration-300 ${isActive(link.href) ? "text-green-500 font-medium" : "text-gray-700"}`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right Side (e.g., User Actions) */}
        <div className="flex items-center space-x-4">{children}</div>
      </div>
    </nav>
  );
};

export default Navbar;

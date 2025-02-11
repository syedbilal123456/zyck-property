"use client";

import Link from "next/link";
import React, { ReactNode, useRef, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
<<<<<<< .merge_file_hhGx0v

=======
>>>>>>> .merge_file_boQNMP
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

  const handleMouseEnter = () => {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current);
    }
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimeout.current = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 200);
  };

  return (
    <nav className="bg-background shadow-md sticky top-0 z-50 w-full px-4 lg:px-10">
      {/* Navbar for Small Screens */}
<<<<<<< .merge_file_hhGx0v
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
=======
      <div className="flex w-full lg:hidden items-center justify-between py-3">
        <MobNav />
        <Link href="/">
          <Image src="/logo.png" width={120} height={40} alt="zyck" className="w-24" />
        </Link>
>>>>>>> .merge_file_boQNMP
        <div>{children}</div>
      </div>

      {/* Navbar for Large Screens */}
      <div className="hidden lg:flex items-center justify-between py-4">
        {/* Logo */}
        <Link href="/">
          <Image src="/logo.png" width={150} height={50} alt="zyck" className="w-36" />
        </Link>

<<<<<<< .merge_file_hhGx0v
        {/* Navbar Center */}
        <div className="navbar-center">
          <ul className="menu menu-horizontal px-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={isActive(link.href) ? "text-green-500" : ""}
                >
                  {link.label}
                </Link>
              </li>
            ))}

            {/* Dropdown for Pages */}
            <li
              className="relative z-[10000]"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <span className="cursor-pointer">PAGES</span>
              {isDropdownOpen && (
                <ul
                  className="absolute left-0 top-full mt-2 bg-white shadow-lg rounded-md w-40 flex flex-col"
                >
                  <li>
                    <Link
                      href="/properties/buy"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      BUY
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/properties/rent"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      RENT
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/user/properties"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      SELL
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      CO-WORK SPACE
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      PROJECT
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </div>
=======
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
>>>>>>> .merge_file_boQNMP

        {/* Right Side (e.g., User Actions) */}
        <div className="flex items-center space-x-4">{children}</div>
      </div>
    </nav>
  );
};

export default Navbar;

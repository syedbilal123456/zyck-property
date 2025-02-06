"use client";
import Link from "next/link";
import React, { ReactNode, useState, useRef } from "react";
import Image from "next/image";

import MobNav from "./MobNav";

interface Props {
  children: ReactNode;
}

const Navbar = ({ children }: Props) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const closeTimeout = useRef<NodeJS.Timeout | null>(null);  // Used to manage timeout

  const handleMouseEnter = () => {
    // When mouse enters, we open the dropdown
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current); // Clear any previous timeout
    }
    setIsDropdownOpen(true); // Open the dropdown
  };

  const handleMouseLeave = () => {
    // Add a small delay before closing the dropdown
    closeTimeout.current = setTimeout(() => {
      setIsDropdownOpen(false); // Close the dropdown
    }, 200);  // 200ms delay for smooth transition
  };

  return (
    <div className="navbar bg-background px-10">
      {/* Navbar for Small Screens */}
      <div className="flex w-full lg:hidden items-center justify-between">
        <MobNav />
        <div className="flex justify-center">
          <Link href="/">
            <Image src="/logo.png" width={150} height={150} alt="zyck" />
          </Link>
        </div>
        <div>{children}</div>
      </div>

      {/* Navbar for Large Screens */}
      <div className="hidden lg:flex w-full justify-around">
        <div className="navbar-start">
          <Link href="/">
            <Image src="/logo.png" width={150} height={150} alt="zyck" />
          </Link>
        </div>

        <div className="navbar-center">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link className="text-primary" href="/">HOME</Link>
            </li>

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

            <li>
              <Link href="/about">ABOUT US</Link>
            </li>
            <li>
              <Link href="/FAQs">FAQS</Link>
            </li>
          </ul>
        </div>

        <div className="flex navbar-end justify-end">{children}</div>
      </div>
    </div>
  );
};

export default Navbar;

"use client"
import React, { useState } from 'react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import Link from 'next/link';
const MobNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div>
       <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild>
            <button className="text-white focus:outline-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              {/* Accessible DialogTitle */}
              <SheetTitle>
                <span className="sr-only">Navigation Menu</span>
              </SheetTitle>
            </SheetHeader>
            <div className="flex flex-col space-y-4 mt-4">
              <Link href="/" className="text-lg font-semibold" onClick={closeMenu}>
                HOME
              </Link>
              <Link href="/buy" className="text-lg font-semibold" onClick={closeMenu}>
                BUY
              </Link>
              <Link href="/rent" className="text-lg font-semibold" onClick={closeMenu}>
                RENT
              </Link>
              <Link href="/rent" className="text-lg font-semibold" onClick={closeMenu}>
                SELL
              </Link>
              <Link href="/about" className="text-lg font-semibold" onClick={closeMenu}>
                ABOUT US
              </Link>
              <Link href="/FAQs" className="text-lg font-semibold" onClick={closeMenu}>
                FAQS
              </Link>
            </div>
          </SheetContent>
        </Sheet>
    </div>
  )
}

export default MobNav
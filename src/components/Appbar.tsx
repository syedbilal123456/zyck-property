"use client";

import Link from "next/link";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Appbar = ({ children }: Props) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="shadow-md bg-white">
      <nav className="flex items-center justify-between p-4">
        {/* Mobile Menu Toggle */}
        <button
          className="sm:hidden text-gray-700"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? "✖" : "☰"}
        </button>

        {/* Brand */}
        <div className="flex items-center">
          <Link
            href="/"
            className="flex items-center text-primary-400 hover:text-primary-600 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor" />
            <p className="font-bold text-gray-800 ml-2">ZYCK. Real Estate</p>
          </Link>
        </div>

        {/* Center Navigation (hidden on mobile) */}
        <div className="hidden sm:flex gap-4 justify-center">
          {/* Add navigation items here if needed */}
        </div>

        {/* End Navigation */}
        <div className="hidden sm:flex">{children}</div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="sm:hidden mt-2 flex flex-col space-y-2 px-4 text-gray-800">
          {children}
        </div>
      )}
    </header>
  );
};

export default Appbar;

"use client";
import Link from "next/link";
import React, { ReactNode } from "react";
import Image from "next/image";

import MobNav from "./MobNav";


interface Props {
  children: ReactNode;
}

const Navbar = ({ children }: Props) => {
  return (
    <div className="navbar bg-background lg:px-10 px-4 ">
      {/* Navbar for Small Screens */}
      <div className="flex w-full lg:hidden items-center justify-between">
        {/* Menu Icon on the Left */}
        <MobNav/>

        {/* Logo in the Center */}
        <div className="flex justify-center ">
          <Link href="/">
            <Image className="lg:w-28 md:w-28 sm:w-20" src="/logo.png" width={150} height={150} alt="zyck" />
          </Link>
        </div>

        {/* Sign-in Button on the Right */}
        <div>{children}</div>
      </div>

      {/* Navbar for Large Screens */}
      <div className="hidden lg:flex w-full  justify-around">
        {/* Navbar Start */}
        <div className="navbar-start">
          <Link href="/">
            <Image src="/logo.png" width={150} height={150} alt="zyck" />
          </Link>
        </div>

        {/* Navbar Center */}
        <div className="navbar-center">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link className="text-primary" href="/">HOME</Link>
            </li>
            <li>
              <Link href="/properties/buy">BUY</Link>
            </li>
            <li>
              <Link href="/properties/rent">RENT</Link>
            </li>
            <li>
              <Link href="/user/properties">SELL</Link>
            </li>
            <li>
              <Link href="/pricing">PRICING</Link>
            </li>
            <li>
              <Link href="/about">ABOUT US</Link>
            </li>
            <li>
              <Link href="/FAQs">FAQS</Link>
            </li>
            
          </ul>
        </div>

        {/* Navbar End */}
        <div className="flex navbar-end justify-end">{children}</div>
      </div>
       
    </div>
  );
};

export default Navbar;

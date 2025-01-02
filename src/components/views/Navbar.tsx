"use client"
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { Button } from '../ui/button'

const Navbar = () => {
  return (
   
        <div className="navbar bg-background px-10 ">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16" />
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-black rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li><a>HOME</a></li>
        <li>
          <a>LISTING</a>
          <ul className="p-2">
            <li><a>FEATURED</a></li>
            <li><a>SAlE</a></li>
            <li><a>RENT</a></li>
          </ul>
        </li>
        <li><a>ABOUT US</a></li>
         <li><a>Contact</a></li>
        <li><a>FAQS</a></li>
      </ul>
    </div>
   <Link href={"/"}>
   <Image src={"/logo.png"} width={150} height={150} alt='zyck'/>
   </Link>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1 ">
      <li><Link href={"/"}>HOME</Link></li>
      <li>
        <details>
          <summary>LISTINGS</summary>
          <ul className="p-2  bg-background">
            <li><Link href={"/"}>FEATURED</Link></li>
            <li><Link href={"/"}>SALE</Link></li>
            <li><Link href={"/"}>RENT</Link></li>
          </ul>
        </details>
      </li>
      <li><Link href={"/"}>ABOUT US</Link></li>
      <li><Link href={"/"}>Contact</Link></li>
      <li><Link href={"/"}>FAQS</Link></li>
    </ul>
  </div>
  <div className="navbar-end hidden lg:flex gap-2">
<Button variant="outline">Add Listing</Button>
<Button>Sign In</Button>

</div>
 
</div>
   
  )
}

export default Navbar
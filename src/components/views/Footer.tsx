import Image from 'next/image'
import React from 'react'

import { Button } from '../ui/button'
import Link from 'next/link'

const Footer = () => {
  return (
    <>
    <footer className="footer mt-5 bg-black text-base-200 p-10">
    <aside>
     <Image src={"/logo.png"} alt='zyck' width={200} height={200}/>
    </aside>
    <nav>
      <h6 className="footer-title">Popular Searches</h6>
      <Link href={"/"} className="link link-hover">Appartment For Sale</Link>
      <Link href={"/"} className="link link-hover">Appartment For Rent</Link>
      <Link href={"/"} className="link link-hover">House For Sale</Link>
      <Link href={"/"} className="link link-hover">Office For Rent</Link>
    
    </nav>
    <nav>
      <h6 className="footer-title">Company</h6>
      <Link href={"/about"} className="link link-hover">About us</Link>
      <Link href={"/contact"} className="link link-hover">Contact</Link>
      <Link href={"FAQs"} className="link link-hover">FAQs</Link>
    </nav>
    <nav>
      <h6 className="footer-title">Legal</h6>
      <p className="link link-hover">Terms of use</p>
      <p className="link link-hover">Privacy policy</p>
      <p className="link link-hover">Cookie policy</p>
    </nav>
    {/* <form>
    <h6 className="footer-title">Newsletter</h6>
    <fieldset className="form-control">
      <label className="label">
        <span >Enter your email address</span>
      </label>
      <div className="join">
        <input
          type="text"
          placeholder="username@site.com"
          className="input input-bordered join-item" />
        <Button className="h-12 join-item">Subscribe</Button>
      </div>
    </fieldset>
  </form> */}
  </footer>
  <div className='text-center bg-background text-foreground border-t-2'>
  <p className='py-5'>Copyright © 2025. Zyck  Real Estate by Zyck Technology.</p>
  </div>
  </>
  )
}

export default Footer
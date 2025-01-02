import Image from 'next/image'
import React from 'react'
import logo from "@/assets/logo.png"
import { Button } from '../ui/button'

const Footer = () => {
  return (
    <>
    <footer className="footer bg-black text-base-200 p-10">
    <aside>
     <Image src={logo} alt='zyck' width={200} height={200}/>
    </aside>
    <nav>
      <h6 className="footer-title">Popular Searches</h6>
      <a className="link link-hover">Appartment For Sale</a>
      <a className="link link-hover">Appartment For Rent</a>
      <a className="link link-hover">House For Sale</a>
      <a className="link link-hover">Office For Rent</a>
    
    </nav>
    <nav>
      <h6 className="footer-title">Company</h6>
      <a className="link link-hover">About us</a>
      <a className="link link-hover">Contact</a>
      <a className="link link-hover">FAQs</a>
    </nav>
    <nav>
      <h6 className="footer-title">Legal</h6>
      <a className="link link-hover">Terms of use</a>
      <a className="link link-hover">Privacy policy</a>
      <a className="link link-hover">Cookie policy</a>
    </nav>
    {/* <form>
    <h6 className="footer-title">Newsletter</h6>
    <fieldset className="form-control w-80">
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
  <p className='py-5'>Copyright © 2025. Zyck – Real Estate by Zyck Technology.</p>
  </div>
  </>
  )
}

export default Footer
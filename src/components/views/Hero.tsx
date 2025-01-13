"use client"
import { Search } from 'lucide-react'
import Link from 'next/link'
import React from 'react'



const Hero = () => {

  return (
    <>
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage: "url(/background.jpg)",
        }}>
        <div className="hero-overlay bg-opacity-60 "></div>
        <div className="flex flex-col hero-content text-center text-white">
          <div className="max-w-4xl">
            <h1 className="mb-5 text-3xl font-bold">Welcome to ZYCK Property – Your Gateway to Exceptional Real Estate Opportunities</h1>
          </div>
          <div className='max-w-lg'>
            <h2 className="mb-5 text-5xl font-bold">Find the Perfect Space That You Need</h2>
            <p>ZYCK Property connects you to real estate solutions that meet your lifestyle, budget, and aspirations. Be it finding a dream home, an ideal investment, or a premier rental property, this platform gives you an easy experience for bringing your vision into reality.</p>
          </div>
            <div className='w-full flex justify-center items-center'>
            <Link href={'/search'} className='flex justify-center items-center gap-2 w-1/2 h-auto p-3 bg-primary rounded-lg mt-3  '>Search <Search/></Link>
            </div>
        </div>
      </div>
    </>
  )
}

export default Hero
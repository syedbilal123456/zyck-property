"use client"

import React from 'react'
import { Searchbar } from './Searchbar'



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
          <Searchbar/>
        </div>
      </div>
    </>
  )
}

export default Hero
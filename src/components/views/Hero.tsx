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
            <h1 className="mb-5 text-3xl font-bold">Welcome to ZYCK Property – Your Gateway to Exceptional Property Marketplace Opportunities</h1>
          </div>
          <div className='max-w-lg'>
            <h2 className="mb-5 text-5xl font-bold">Find the Perfect Property That You Need</h2>
          </div>
          <Searchbar/>
        </div>
      </div>
    </>
  )
}

export default Hero
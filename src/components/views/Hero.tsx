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
        <div className="hero-content text-center text-white">
          <div className="max-w-md">
            <h1 className="mb-5 text-4xl font-bold">The Best Way To</h1>
            <h1 className="mb-5 text-5xl font-bold">Find Your Dream Home.</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem eligendi dolor consectetur labore, explicabo repellat ab eaque suscipit. Itaque quas quos exercitationem dolor qui quidem laudantium cumque quod dicta impedit.</p>
            <Link href={'/search'} className='flex justify-center items-center gap-2 w-auto h-auto p-3 bg-primary rounded-lg mt-3  '>Search <Search/></Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Hero
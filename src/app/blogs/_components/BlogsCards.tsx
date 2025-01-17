"use client"
import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface Props {
    [x: string]: any
    Blogs : 
        {
            image : string,
            title : string,
            para : string
        }[]
    
}
const BlogsCards = ({ Blogs }: Props) => {
    return (
            <section className="text-gray-100 body-font overflow-hidden">
                <div className="w-[80vw] h-auto px-5 py-24 mx-auto">
                    {Blogs.map((data: { image: string | StaticImport; title: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; para: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined }, index: React.Key | null | undefined) => (
                    <div key={index} className="-my-8 divide-y-2 divide-gray-100">
                        <div className="py-8 flex flex-wrap gap-5 md:flex-nowrap">
                            <div className="md:w-92 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                                <Image src={data.image} width={500} height={500} alt=''/>
                            </div>
                            <div className="md:flex-grow">
                                <h2 className="text-2xl font-medium text-gray-100 title-font mb-2">
                                    {data.title}
                                </h2>
                                <p className="leading-relaxed">
                                    {data.para}
                                </p>
                                <Link href={'/'} className="text-indigo-500 inline-flex items-center mt-4">
                                    Learn More
                                    <svg
                                        className="w-4 h-4 ml-2"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M5 12h14" />
                                        <path d="M12 5l7 7-7 7" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div> ))}
                </div>
            </section>
    )
}

export default BlogsCards

import React from 'react'
import Breadcrumb from './_components/Breadcrumb'
import Mainbanner from './_components/Mainbanner'
import BlogsCards from './_components/BlogsCards'

const page = () => {
    const Properties = [
        {
            image: "/Property-1.jpg",
            title: "Top 10 Luxury Apartments in Islamabad",
            para: "Explore the most luxurious apartments in Islamabad offering modern amenities, prime locations, and breathtaking views."
        },
        {
            image: "/Property-2.jpg",
            title: "Why Commercial Properties Are the Best Investment in 2025",
            para: "Discover why investing in commercial properties can yield high returns and provide financial stability."
        },
        {
            image: "/Property-3.jpg",
            title: "Smart Homes: The Future of Real Estate",
            para: "Learn how smart home technology is revolutionizing the real estate industry and enhancing modern living."
        },
        {
            image: "/Property-4.jpg",
            title: "5 Tips for First-Time Real Estate Investors",
            para: "Get valuable insights and tips to make informed decisions as a first-time real estate investor."
        },
        {
            image: "/Property-5.jpg",
            title: "DHA Islamabad: A Goldmine for Investors",
            para: "Find out why DHA Islamabad is the go-to destination for real estate investors in Pakistan."
        },
        {
            image: "/Property-6.jpg",
            title: "Sustainable Living: Green Buildings in Real Estate",
            para: "Understand the importance of eco-friendly construction and how green buildings are shaping the future."
        },
        {
            image: "/Property-7.jpg",
            title: "Property Trends to Watch in 2025",
            para: "Stay ahead of the game with the latest property trends, including smart investments and emerging locations."
        }
    ];
    
  return (
    <div>
        <Breadcrumb/>
        <Mainbanner/>
        <BlogsCards Blogs={Properties}/>
    </div>
  )
}

export default page

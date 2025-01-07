import Heading from '@/components/views/Heading'
import Image from 'next/image'
import React from 'react'

const Page = () => {
  return (
    <div>
      {/* Hero Section */}
      <div
        className="my-5 bg-cover bg-center"
        style={{
          backgroundImage: "url(/about.jpg)",
        }}
      >
        <div className="bg-blue-900 p-10 bg-opacity-70 text-white">
          <h1 className="text-4xl font-bold mb-4">About Us</h1>
          <p className="md:w-1/2">
            Zyck Property is Pakistan’s Largest Online Real Estate Portal Connecting Buyers with Sellers within & outside the country.
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="w-full lg:w-3/4 p-10">
        <h2 className="text-2xl font-semibold mb-4">About</h2>
        <p className="mb-4">
          Founded in 2012, RealProperty focuses on luxury real estate services, including sales and rentals in Lahore, Islamabad, Rawalpindi, Karachi, and other residential and commercial areas. RealProperty is known for its professional expertise, excellent customer support, and property consultation by senior experts in the locality. We are a modern, dynamic company that combines technical know-how and knowledge of international and local property markets with a customer-first philosophy.
        </p>

        {/* Repeated Sections */}
        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
        <p className="mb-4">
          Our mission is to provide top-tier real estate services while focusing on customer satisfaction and excellence.
        </p>

        <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
        <p className="mb-4">
          To become the most trusted and innovative real estate platform in the country.
        </p>

        <h2 className="text-2xl font-semibold mb-4">Our Philosophy</h2>
        <p className="mb-4">
          Combining technical know-how with a customer-first philosophy to redefine the real estate experience.
        </p>

        <h2 className="text-2xl font-semibold mb-4">Property Investment Consultation</h2>
        <p className="mb-4">
          We offer expert consultation services for property investments, ensuring informed decisions and optimal returns.
        </p>

        <h2 className="text-2xl font-semibold mb-4">Property Legal Advice</h2>
        <p className="mb-4">
          Our experienced legal advisors provide guidance on property-related legal matters for a seamless experience.
        </p>
      </div>
    </div>
  )
}

export default Page

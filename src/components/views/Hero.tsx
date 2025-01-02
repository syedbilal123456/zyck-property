import React from 'react'
import { Searchbar } from '../views/Searchbar'
import Heading from './Heading'
import { PropertyCard } from './PropertyCard'
import Cities from './Cities'
const properties = [
  {
    image: "/background.jpg",
    title: "Luxury Apartment",
    price: "$1,200/month",
    location: "Downtown, NY",
    description:
      "A spacious luxury apartment with modern amenities and stunning views.",
    features: ["2 Bedrooms", "2 Bathrooms", "Gym Access", "Parking"],
  },
  {
    image: "/background.jpg",
    title: "Modern House",
    price: "$3,000/month",
    location: "Suburban, LA",
    description: "A beautiful modern house in a peaceful neighborhood.",
    features: ["4 Bedrooms", "3 Bathrooms", "Garden", "Garage"],
  },
  {
    image: "/background.jpg",
    title: "Cozy Condo",
    price: "$800/month",
    location: "Uptown, Chicago",
    description: "A cozy condo perfect for singles or couples images and .",
    features: ["1 Bedroom", "1 Bathroom", "City View", "24/7 Security"],
  },
];

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
       <Searchbar/>
      </div>
    </div>
  </div>
  <Heading title="Featured Properties"/>
  <div className="p-4">
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {properties.map((property, index) => (
          <PropertyCard
            key={index}
            image={property.image}
            title={property.title}
            price={property.price}
            location={property.location}
            description={property.description}
            features={property.features}
          />
        ))}
      </div>
    </div>
    <Heading title="Recent Properties for Sell"/>
    <div className="p-4">
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {properties.map((property, index) => (
          <PropertyCard
            key={index}
            image={property.image}
            title={property.title}
            price={property.price}
            location={property.location}
            description={property.description}
            features={property.features}
          />
        ))}
      </div>
    </div>
    <Heading title="Recent Properties for Rent"/>
    <div className="p-4">
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {properties.map((property, index) => (
          <PropertyCard
            key={index}
            image={property.image}
            title={property.title}
            price={property.price}
            location={property.location}
            description={property.description}
            features={property.features}
          />
        ))}
      </div>
    </div>
    <Heading title="Properties By Cities"/>
    <Cities/>
    </>
  )
}

export default Hero
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { PropertyCard } from "@/components/views/PropertyCard";

interface Filters {
  rent: boolean;
  sale: boolean;
}

const properties = [
  {
    image: "/background.jpg",
    title: "Luxury Apartment",
    price: "$1,200/month",
    location: "Downtown, NY",
    description: "A spacious luxury apartment with modern amenities and stunning views.",
    features: {
      area: 1500,
      bathrooms: 2,
      bedrooms: 2,
      hasBalcony: true,
      hasGardenYard: false,
      hasSwimmingPool: true,
      parkingSpots: 1,
      propertyId: 1,
    },
    contact: {
      email: "owner@example.com",
      name: "John Doe",
      phone: "123-456-7890",
    },
  },
  {
    image: "/background.jpg",
    title: "Modern House",
    price: "$3,000/month",
    location: "Suburban, LA",
    description: "A beautiful modern house in a peaceful neighborhood.",
    features: {
      area: 3000,
      bathrooms: 3,
      bedrooms: 4,
      hasBalcony: true,
      hasGardenYard: true,
      hasSwimmingPool: false,
      parkingSpots: 2,
      propertyId: 2,
    },
    contact: {
      email: "owner2@example.com",
      name: "Jane Smith",
      phone: "987-654-3210",
    },
  },
  {
    image: "/background.jpg",
    title: "Cozy Condo",
    price: "$800/month",
    location: "Uptown, Chicago",
    description: "A cozy condo perfect for singles or couples.",
    features: {
      area: 800,
      bathrooms: 1,
      bedrooms: 1,
      hasBalcony: false,
      hasGardenYard: false,
      hasSwimmingPool: false,
      parkingSpots: 0,
      propertyId: 3,
    },
    contact: {
      email: "owner3@example.com",
      name: "Alice Brown",
      phone: "555-123-4567",
    },
  },
];

export default function Search() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortOption, setSortOption] = useState<string>("priceLowToHigh");

  const handleSearch = () => {
    console.log("Search term:", searchTerm);
    console.log("Sort by:", sortOption);
  };

  const filteredProperties = properties
    .filter((property) =>
      property.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOption === "priceLowToHigh") {
        return parseInt(a.price.replace(/[^0-9]/g, "")) - parseInt(b.price.replace(/[^0-9]/g, ""));
      }
      if (sortOption === "priceHighToLow") {
        return parseInt(b.price.replace(/[^0-9]/g, "")) - parseInt(a.price.replace(/[^0-9]/g, ""));
      }
      return 0; // Default case, no sorting
    });

  return (
    <div className="flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="md:w-1/4 w-full p-3">
        <Input
          placeholder="Search listings..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full mb-4 p-2 border border-gray-300 rounded"
        />
        
        <Select value={sortOption} onValueChange={setSortOption}>
          <SelectTrigger className="w-full p-2 border border-gray-300 rounded">
            <SelectValue placeholder="Sort by price" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="priceLowToHigh">Price: Low to High</SelectItem>
            <SelectItem value="priceHighToLow">Price: High to Low</SelectItem>
            <SelectItem value="newestFirst">Newest First</SelectItem>
            <SelectItem value="oldestFirst">Oldest First</SelectItem>
          </SelectContent>
        </Select>

        <Button onClick={handleSearch} className="w-full mt-2 text-white p-2 rounded">
          Search
        </Button>
      </div>

      {/* Property Listings */}
      <div className="md:w-3/4 w-full p-6 border-l-2">
        <h1 className="text-2xl md:px-10 text-primary py-4">Listing Results</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredProperties.length > 0 ? (
            filteredProperties.map((property, index) => (
              <PropertyCard
                key={index}
                image={property.image}
                title={property.title}
                price={property.price}
                location={property.location}
                features={property.features}
                onContact={property.contact}
                status="sold"
              />
            ))
          ) : (
            <p className="col-span-full text-center">No results found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

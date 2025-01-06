"use client";

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { PropertyCard } from '@/components/views/PropertyCard';

// Define Filters interface to type-check the checkbox values (rent and sale)
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
    description: "A cozy condo perfect for singles or couples.",
    features: ["1 Bedroom", "1 Bathroom", "City View", "24/7 Security"],
  },
];

const search = ({searchParams}:any) => {
  
  // State to manage the search term and filters
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filters, setFilters] = useState<Filters>({
    rent: false,
    sale: false,
  });
  const [sortOption, setSortOption] = useState<string>('priceLowToHigh');

  // Handle the search button click event
  const handleSearch = () => {
    console.log('Search term:', searchTerm);
    console.log('Filters:', filters);
    console.log('Sort by:', sortOption);
  };

  // Handle checkbox change for rent and sale filters
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;

    // Update the state with the new checkbox value
    setFilters((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="md:w-1/4 w-full p-3">
        <Input
          placeholder="Search listings..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full mb-4 p-2 border border-gray-300 rounded"
        />
        
        <Select
          value={sortOption}
          onValueChange={setSortOption}
        >
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
        <Button
          onClick={handleSearch}
          className="w-full mt-2 text-white p-2 rounded"
        >
          Search
        </Button>
      </div>

      <div className="md:w-3/4 w-full p-6 border-l-2">
      <h1 className='text-2xl md:px-10 text-primary py-4'>Listing Result...</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
    </div>
  );
};

export default search;

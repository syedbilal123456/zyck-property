"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Cards } from "@/lib/type";
// Import the Loader component
import Loader from "@/components/ui/loader";
import PropertyCardsecond from "@/components/views/secondPropertyCard";

export default function Search() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortOption, setSortOption] = useState<string>("priceLowToHigh");
  const [properties, setProperties] = useState<Cards[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/properties/list");
        if (!response.ok) {
          throw new Error(`Error fetching properties`);
        }
        const data = await response.json();
        setProperties(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched or error occurs
      }
    };
    fetchData();
  }, []);

  const handleSearch = () => {
    console.log("Search term:", searchTerm);
    console.log("Sort by:", sortOption);
  };

  const filteredProperties = properties
    .filter((property) =>
      property.name.toLowerCase().includes(searchTerm.toLowerCase()) || // Match property name
      property.location.city.toLowerCase().includes(searchTerm.toLowerCase()) // Match city
    )
    .sort((a, b) => {
      if (sortOption === "priceLowToHigh") {
        return parseInt(a.price) - parseInt(b.price);
      }
      if (sortOption === "priceHighToLow") {
        return parseInt(b.price) - parseInt(a.price);
      }
      return 0; // Default case, no sorting
    });

  return (
    <div className="flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="md:w-1/4 w-full p-3">
        <Input
          placeholder="Search by name or city..."
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
          </SelectContent>
        </Select>

        <Button onClick={handleSearch} className="w-full mt-2 text-white p-2 rounded">
          Search
        </Button>
      </div>

      {/* Property Listings */}
      <div className="md:w-3/4 w-full p-6 border-l-2">
        <h1 className="text-2xl md:px-10 text-primary py-4">Listing Results</h1>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader /> {/* Show loader while fetching data */}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProperties.length > 0 ? (
              filteredProperties.map((property, index) => (
                <PropertyCardsecond
                  key={index}
                  image={property.images[0]?.url || "/Peshawar.jpg"} // Use first image or placeholder
                  title={property.name}
                  price={property.price}
                  location={property.location.city}
                  status={property.status.value}
                  features={property.feature}
                  onContact={property.contact} 
                  id={property.feature.propertyId}
                                  />
              ))
            ) : (
              <p className="col-span-full text-center">No results found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

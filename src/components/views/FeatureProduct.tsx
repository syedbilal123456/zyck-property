"use client";

import { Cards } from '@/lib/type';
import React, { useEffect, useState } from 'react';
import PropertyCardsecond from '@/components/views/secondPropertyCard';
import Loader from '../ui/loader';

// Import the Loader component

const FeatureProduct = () => {
  const [properties, setProperties] = useState<Cards[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/properties/list');
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.statusText}`);
        }
        const data = await response.json();
        setProperties(data);
      } catch (error) {
        console.error('Error fetching properties:', error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched or error occurs
      }
    };
    fetchData();
  }, []);

  // Filter and reverse the array once during processing
  const propertiesForRent = properties.filter(
    (item) => item.status.value === 'Rent'
  ).reverse().slice(0, 4);
  
  const propertiesForSale = properties
    .filter((item) => item.status.value === 'Sell')
    .reverse()
    .slice(0, 4);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-primary">
        <Loader /> {/* Display loader while data is loading */}
      </div>
    );
  }

  return (
    <>
      {/* Featured Properties Section */}
      <div>
        <div className="px-6 py-12 sm:px-10 sm:py-16">
          <h2 className="text-2xl  md:text-3xl lg:text-4xl font-bold ">
            Featured Properties
          </h2>
        </div>
        <div className="p-4 mx-auto">
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 p-5">
            {properties.slice().reverse().slice(0, 4).map((property) => (
              <PropertyCardsecond
                key={property.feature.propertyId}
                image={property.images[0]?.url || "https://dummyimage.com/400x400"}
                title={property.name}
                price={property.price}
                location={property.location.city}
                status={property.status.value}
                features={property.feature}
                onContact={property.contact}
                id={property.feature.propertyId}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Recent Properties for Rent Section */}
      <div>
        <div className="px-6 py-12 sm:px-10 sm:py-16">
          <h2 className="text-2xl  md:text-3xl lg:text-4xl font-bold ">
            Recent Properties for Rent
          </h2>
        </div>
        <div className="p-4">
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 p-5">
            {propertiesForRent.map((property) => (
              <PropertyCardsecond
                key={property.feature.propertyId}
                image={property.images[0]?.url || "https://dummyimage.com/400x400"}
                title={property.name}
                price={property.price}
                location={property.location.city}
                status={property.status.value}
                features={property.feature}
                onContact={property.contact}
                id={property.feature.propertyId}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Recent Properties for Sale Section */}
      <div>
        <div className="px-6 py-12 sm:px-10 sm:py-16">
          <h2 className="text-2xl  md:text-3xl lg:text-4xl font-bold ">
            Recent Properties for Sell
          </h2>
        </div>
        <div className="p-4">
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 p-5">
            {propertiesForSale.map((property) => (
              <PropertyCardsecond
                key={property.feature.propertyId}
                image={property.images[0]?.url || "https://dummyimage.com/400x400"}
                title={property.name}
                price={property.price}
                location={property.location.city}
                status={property.status.value}
                features={property.feature}
                onContact={property.contact}
                id={property.feature.propertyId}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default FeatureProduct;

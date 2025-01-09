"use client";

import { Cards } from '@/lib/type';
import React, { useEffect, useState } from 'react';
import Heading from '@/components/views/Heading';
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

  const propertiesSlice = properties.slice(0, 4);
  const propertiesForSale = properties
    .filter((item) => item.status.value === 'For Sale')
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
      <div>
        <Heading title="Featured Properties" />
        <div className="p-4 mx-auto">
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 p-5">
            {propertiesSlice.map((property) => (
              <PropertyCardsecond
                key={property.feature.propertyId}
                image={property.images[0]?.url}
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

      <div>
        <Heading title="Recent Properties For Rent" />
        <div className="p-4">
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 p-5">
            {propertiesSlice.map((property) => (
              <PropertyCardsecond
                key={property.feature.propertyId}
                image={property.images[0]?.url}
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

      <div>
        <Heading title="Recent Properties For Sale" />
        <div className="p-4">
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 p-5">
            {propertiesForSale.map((property) => (
              <PropertyCardsecond
                key={property.feature.propertyId}
                image={property.images[0]?.url}
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

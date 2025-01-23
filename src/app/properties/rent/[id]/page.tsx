"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/loader";
import { Cards } from "@/lib/type";
import Image from "next/image";
import React from "react";
import { useEffect, useState } from "react";


// Fetch property function
async function fetchProperty(id: string): Promise<Cards> {
    const url = `/api/properties/${id}`;

    const response = await fetch(url);

    if (!response.ok) {
        if (response.status === 404) {
            throw new Error("Property not found");
        }
        throw new Error("An error occurred while fetching the property");
    }

    return response.json();
}

const Page = ({ params }: { params: Promise<{ id: string }> }) => {
    // Use React.use() to unwrap the params Promise
    const { id } = React.use(params);

    const [property, setProperty] = useState<Cards | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (id) {
            async function loadProperty() {
                try {
                    const data = await fetchProperty(id);
                    setProperty(data);
                } catch (err: any) {
                    setError(err.message || "Something went wrong");
                }
            }

            loadProperty();
        }
    }, [id]);

    if (error) {
        return (
            <section className="text-center py-24 bg-black text-green-500">
                <h1 className="text-2xl font-bold">Error</h1>
                <p>{error}</p>
            </section>
        );
    }

    if (!property) {
        return (
            <section className="text-center py-24 bg-black text-green-500">
                <div className="w-full h-full flex justify-center items-center">
                <Loader/>
                </div>
            </section>
        );
    }

    console.log(property);
    return (
        <section className="text-gray-300 mb-40 body-font overflow-hidden bg-black">
            <div className="container px-5 py-24 mx-auto">
                <div className="lg:w-4/5 mx-auto flex flex-wrap">
                    <Image
                        width={700}
                        height={700}
                        alt={property.name}
                        className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
                        src={property.images[0]?.url || "https://dummyimage.com/400x400"}
                    />
                    <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                        <div className="flex gap-3 items-center mb-4 w rounded-lg">
                            <Badge>{property.status.value}</Badge>
                            <Badge>{property.type.value}</Badge>
                        </div>
                        <h1 className="text-white text-3xl title-font font-medium mb-1">
                            {property.name}
                        </h1>
                        <h2 className="text-sm title-font text-green-500 tracking-widest">
                            {property.description}
                        </h2>
                        {/* Location Section */}
                        <h1 className="text-md mt-4" >Location:</h1>
                        <p className="text-sm text-gray-400 mt-2">
                            City: {property.location.city}
                        </p>
                        <p className="text-sm text-gray-400 mt-2">
                            State: {property.location.state}
                        </p>
                        <div className="flex flex-wrap mt-6 gap-2 items-center pb-5 border-b-2 border-gray-700 mb-5">
                            <Badge>
                                Area {property.feature.area} sqft
                            </Badge>
                            <Badge>
                                {property.feature.bedrooms} Bedrooms
                            </Badge>
                            <Badge>
                                {property.feature.bathrooms} Bathrooms
                            </Badge>

                            {/* Display the Balcony badge only if it exists */}
                            {property.feature?.hasBalcony && (
                                <Badge>
                                    Has Balcony
                                </Badge>
                            )}

                            {/* Display the Garage badge only if it exists */}
                            {property.feature?.hasGarage && (
                                <Badge>
                                    Has Garage
                                </Badge>
                            )}

                            {/* Display the Swimming Pool badge only if it exists */}
                            {property.feature?.hasSwimmingPool && (
                                <Badge>
                                    Has Swimming Pool
                                </Badge>
                            )}
                            {property.feature?.parkingSpots && (
                                <Badge>
                                    ParkingSlot {property.feature.parkingSpots}
                                </Badge>
                            )}
                            {property.feature?.hasSwimmingPool && (
                                <Badge>
                                    Has Swimming Pool
                                </Badge>
                            )}

                        </div>
                        <div className="flex">
                            <span className="title-font font-medium text-2xl text-white">
                                PKR {property.price}
                            </span>
                            <Button className="flex ml-auto text-black bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded">
                            Contact
                            </Button>
                            <button className="rounded-full w-10 h-10 bg-gray-700 p-0 border-0 inline-flex items-center justify-center text-gray-400 ml-4">
                                <svg
                                    fill="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    className="w-5 h-5"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Page;

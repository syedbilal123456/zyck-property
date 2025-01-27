"use client";

import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/loader";
import { Cards } from "@/lib/type";
import { CheckCircle, Mail, Phone, X } from "lucide-react";
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
  function formatPhoneNumber(phone: string): string {
    const formatted = phone.replace(/^0/, "+92");
    return formatted.replace(/(\+92)(\d{3})(\d{4})(\d{3})/, "$1 $2 $3 $4");
  }

  // Use React.use() to unwrap the params Promise
  const [isModalOpen, setIsModalOpen] = useState(false);
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
          <Loader />
        </div>
      </section>
    );
  }

  console.log(property);

  return (
    <section className="text-gray-300 mb-40 body-font overflow-hidden bg-black">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          {/* Image container with fixed aspect ratio */}
          <div className="lg:w-1/2 w-full">
            <div className="relative aspect-[4/3] w-full">
              <img
                alt={property.name}
                className="absolute inset-0 w-full h-full object-cover object-center rounded"
                src={
                  property.images[0]?.url || "https://dummyimage.com/400x400"
                }
              />
            </div>
          </div>
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
            <h1 className="text-md mt-4">Location:</h1>
            <p className="text-sm text-gray-400 mt-2">
              City: {property.location.city}
            </p>
            <p className="text-sm text-gray-400 mt-2">
              State: {property.location.state}
            </p>
            <div className="flex flex-wrap mt-6 gap-2 items-center pb-5 border-b-2 border-gray-700 mb-5">
              <Badge>Area {property.feature.area} sqft</Badge>
              <Badge>{property.feature.bedrooms} Bedrooms</Badge>
              <Badge>{property.feature.bathrooms} Bathrooms</Badge>

              {/* Display the Balcony badge only if it exists */}
              {property.feature?.hasBalcony && <Badge>Has Balcony</Badge>}

              {/* Display the Garage badge only if it exists */}
              {property.feature?.hasGarage && <Badge>Has Garage</Badge>}

              {/* Display the Swimming Pool badge only if it exists */}
              {property.feature?.hasSwimmingPool && (
                <Badge>Has Swimming Pool</Badge>
              )}
              {property.feature?.parkingSpots && (
                <Badge>ParkingSlot {property.feature.parkingSpots}</Badge>
              )}
              {property.feature?.hasSwimmingPool && (
                <Badge>Has Swimming Pool</Badge>
              )}
            </div>
            <div className="flex justify-between">
              <span className="title-font font-medium text-2xl text-white">
                PKR {property.price}
              </span>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md transition-colors"
              >
                Contact
              </button>
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
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setIsModalOpen(false)}
          />
          <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
            <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full mx-4 relative pointer-events-auto">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X size={20} />
              </button>

              <div className="text-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">
                  Purchase Details
                </h2>
                <p className="text-sm text-gray-500">
                  Property Acquisition Information
                </p>
              </div>

              <div className="space-y-4">
                {/* User Image and Badge */}
                <div className="flex items-center gap-4 bg-gray-50 p-3 rounded-xl">
                  <Image
                    src="/payment.png"
                    alt="Buyer"
                    className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md"
                    width={64}
                    height={64}
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-gray-800">
                        {property.contact.name}
                      </h3>
                      <span className="bg-green-500 text-white px-2 py-0.5 rounded-full text-xs font-medium">
                        Verified
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">
                      {property.status.value}
                    </p>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-50 p-3 rounded-xl">
                    <div className="flex items-center gap-2 mb-1">
                      <Mail className="w-4 h-4 text-blue-600" />
                      <span className="text-xs text-gray-500">Email</span>
                    </div>
                    <p className="text-sm font-medium text-gray-800 break-words">
                      {property.contact.email}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-xl">
                    <div className="flex items-center gap-2 mb-1">
                      <Phone className="w-4 h-4 text-green-600" />
                      <span className="text-xs text-gray-500">Phone</span>
                    </div>
                    <p className="text-sm font-medium text-gray-800">
                      {formatPhoneNumber(property.contact.phone)}
                    </p>
                  </div>
                </div>

                {/* Transaction Status */}
                <div className="bg-blue-50 rounded-xl p-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="text-sm font-medium text-blue-900">
                        Purchase Complete
                      </p>
                      <p className="text-xs text-blue-700">#123456</p>
                    </div>
                  </div>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                    Verified
                  </span>
                </div>

                {/* Action Buttons */}
                {/* <div className="flex gap-3 pt-2">
                  <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-1">
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                  <button className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-1">
                    <Share2 className="w-4 h-4" />
                    Share
                  </button>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Page;

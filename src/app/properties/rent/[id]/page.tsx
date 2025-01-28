"use client"
import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/loader";
import { Cards } from "@/lib/type";
import { CheckCircle, Mail, Phone, X } from "lucide-react";
import Image from "next/image";
import React from "react";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Thumbs } from "swiper/modules";

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
  const [isExpanded, setIsExpanded] = useState(false);
  const { id } = React.use(params);

  const [property, setProperty] = useState<Cards | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

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
    <section className="text-gray-300 mb-40 body-font overflow-hidden bg-black max-w-[1080px] mx-auto">
      <div className="container px-5 py-24 mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column: Image Carousel */}
          <div>
            <div className="border border-gray-200 shadow-lg rounded-xl overflow-hidden">
              {/* Main Image Carousel */}
              <Swiper
                spaceBetween={10}
                navigation
                thumbs={{ swiper: thumbsSwiper }}
                modules={[Navigation, Thumbs]}
                className="rounded-t-xl"
              >
                {property.images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={image.url || "https://dummyimage.com/600x400"}
                      alt={`Property image ${index + 1}`}
                      className="w-full h-[400px] object-cover"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
              {/* Thumbnail Carousel */}
              <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={4}
                freeMode
                watchSlidesProgress
                modules={[Thumbs]}
                className="p-4 bg-gray-100 rounded-b-xl"
              >
                {property.images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={image.url || "https://dummyimage.com/100x100"}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-[80px] object-cover rounded-md border border-gray-300 hover:border-green-500 transition-transform transform hover:scale-105 cursor-pointer"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>

          {/* Right Column: Property Details */}
          <div className="space-y-6">
            {/* Property Header */}
            <div className="space-y-2 mt-2">
              <h1 className="text-3xl font-bold text-gray-300">
                {property.name}
              </h1>
              <div className="flex items-center gap-3">
                <Badge>{property.status.value}</Badge>
                <Badge>{property.type.value}</Badge>
              </div>
              <p className="text-gray-300">
                {isExpanded
                  ? property.description
                  : `${property.description.substring(0, 100)}...`}
              </p>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-green-500 hover:underline"
              >
                {isExpanded ? "Show Less" : "See More"}
              </button>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <h2 className="text-lg font-semibold text-gray-300">Location</h2>
              <p className="text-gray-300">City: {property.location.city}</p>
              <p className="text-gray-300">State: {property.location.state}</p>
            </div>

            {/* Features */}
            <div className="space-y-2">
              <h2 className="text-lg font-semibold text-gray-300">Features</h2>
              <div className="flex flex-wrap gap-2">
                <Badge>Area: {property.feature.area} sqft</Badge>
                <Badge>{property.feature.bedrooms} Bedrooms</Badge>
                <Badge>{property.feature.bathrooms} Bathrooms</Badge>
                {property.feature?.hasBalcony && <Badge>Has Balcony</Badge>}
                {property.feature?.hasGarage && <Badge>Has Garage</Badge>}
                {property.feature?.hasSwimmingPool && (
                  <Badge>Has Swimming Pool</Badge>
                )}
                {property.feature?.parkingSpots && (
                  <Badge>Parking Spots: {property.feature.parkingSpots}</Badge>
                )}
              </div>
            </div>

            <div className="flex justify-between">
              <span className="title-font font-medium text-2xl text-white">
                PKR {property.price}
              </span>
              <div><button
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
              </button></div>
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
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Page;
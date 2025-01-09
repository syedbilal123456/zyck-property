// components/PropertyCard.tsx
import React from "react";
import { FaBuilding, FaRulerCombined, FaDoorOpen, FaCalendarAlt, FaCar, FaLocationArrow, FaSearchLocation } from "react-icons/fa";
import { FaCamera } from "react-icons/fa";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { Eye } from "lucide-react";

interface Contact {
  email: string
  name: string
  phone: string
}
interface Features {
  area: number;
  bathrooms: number;
  bedrooms: number;
  hasBalcony: boolean;
  hasGardenYard: boolean;
  hasSwimmingPool: boolean;
  parkingSpots: number;
  propertyId: number;
}

export default function PropertyCardsecond({
  id,
  image,
  title,
  price,
  location,
  status,
  features,
  onContact,
}: {
  id:Number;
  image: string;
  title: string;
  price: string;
  location: string;
  status: string;
  features: Features; // Use the `Features` type here
  onContact: Contact
}) {
  return (
    <div className="max-w-sm rounded-lg shadow-lg border border-gray-200 overflow-hidden">
      {/* Image Section */}
      <div className="relative">
        <Image
          src={image}
          alt="Property Image"
          width={400}
          height={300}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 left-2 flex space-x-2">
        <Badge variant="destructive">{status}</Badge>
        </div>
      
      </div>

      {/* Details Section */}
      <div className="p-4">
        <h2 className="text-lg font-bold">{title}</h2>
        <p className="text-sm gap-2">{location},Pakistan</p>

        {/* Details with Icons */}
        <div className="flex items-center text-sm text-gray-600 space-y-2 gap-3 mt-2">
          <Badge className="flex items-center space-x-2 mt-2">
            <FaCar />
            <p>{features.parkingSpots}</p>
          </Badge>
          <Badge className="flex items-center space-x-2">
            <FaRulerCombined/>
            <p>{features.area} sq ft</p>
          </Badge>
          <Badge className="flex items-center space-x-2">
            <FaDoorOpen />
            <p>{features.bedrooms} Rooms</p>
          </Badge>
        
        </div>

        {/* Pricing Section */}
        <div className="flex items-center justify-between mt-4">
        </div>

        <div className="flex justify-between border-t-2 border-primary p-1 mt-2 ">
          <p className="text-lg font-bold"> PKR {price}</p>
          <span className="text-sm text-gray-500"><Link href={"/"}><Eye className="hover:text-primary"/></Link></span>
        </div>
      </div>
    </div>
  );
};



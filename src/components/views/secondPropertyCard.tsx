import React from "react"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import { Bed, Car, Ruler, Bath, Eye } from "lucide-react"

interface Contact {
  email: string
  name: string
  phone: string
}

interface Features {
  area: number
  bathrooms: number
  bedrooms: number
  hasBalcony: boolean
  hasGardenYard: boolean
  hasSwimmingPool: boolean
  parkingSpots: number
  propertyId: number
}

interface Location {
  city: {
    value: string
    id: number
    statusId?: number
  }
  stateId: number
}

interface Property {
  id: number
  image: string
  title: string
  price: string | number
  location: Location
  status: string
  features: Features
  onContact: Contact
  PropertType?:string
}

export default function PropertyCard({PropertType , id, image, title, price, location, status, features, onContact }: Property) {
  const formatPriceWithCommas = (price: string | number): string => {
    const numPrice = typeof price === "string" ? Number.parseFloat(price) : price
    return new Intl.NumberFormat("en-US").format(numPrice)
  }

  return (
    <div className="w-full mx-auto rounded-xl shadow-sm  shadow-gray-800 border-gray-100 bg-zinc-900 text-white dark:bg-gray-800 dark:border-gray-700 overflow-hidden transition-all duration-300 ">
      <Link href={`/properties/${status.toLowerCase() == "sell" ? "buy" :status.toLowerCase() }/${features.propertyId}`} className="block">
        <div className="relative">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            width={400}
            height={300}
            className="w-full h-56 object-cover"
          />
          <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground px-2 py-1 text-xs font-semibold rounded">
            {status}
          </Badge>
        </div>

        <div className="p-5">
          <h2 className="text-lg font-bold text-gray-100 dark:text-white mb-2 line-clamp-1">{title}</h2>
          <p className="text-sm text-gray-300 dark:text-gray-300 mb-4">{location?.city?.value}, Pakistan</p>

          <div className="flex flex-wrap items-center gap-4 mb-4">
            <div className="flex items-center text-gray-100 dark:text-gray-300">
              <Car className="w-4 h-4 mr-2" />
              <span className="text-sm">{features.parkingSpots} Parking</span>
            </div>
            <div className="flex items-center text-gray-100 dark:text-gray-300">
              <Ruler className="w-4 h-4 mr-2" />
              <span className="text-sm">{features.area} sq ft</span>
            </div>
            <div className="flex items-center text-gray-100 dark:text-gray-300">
              <Bed className="w-4 h-4 mr-2" />
              <span className="text-sm">{features.bedrooms} Beds</span>
            </div>
            <div className="flex items-center text-gray-100 dark:text-gray-300">
              <Bath className="w-4 h-4 mr-2" />
              <span className="text-sm">{features.bathrooms} Baths</span>
            </div>
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
            <p className="text-xl font-bold text-primary">PKR {formatPriceWithCommas(price)}</p>
            <Eye className="w-5 h-5 text-gray-400 hover:text-primary transition-colors duration-300" />
          </div>
        </div>
      </Link>
    </div>
  )
}


"use client"

import { useState, useEffect } from "react"
import type { City, PropertyStatus, PropertyType, PropertyTypeDetail, State } from "@prisma/client"
import { useFormContext } from "react-hook-form"
import { Building2, Home, Store, Warehouse, Car, Bath, Bed, Ruler, Eye } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"

interface Props {
  statuses: PropertyStatus[]
  types: PropertyType[]
  details: PropertyTypeDetail[]
  cities: City[]
  states: State[]
}

const formatPriceWithCommas = (price: number) => {
  return price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") || "0"
}

const Basic = ({ statuses, types, details, cities, states }: Props) => {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext()

  const [filteredCities, setFilteredCities] = useState<City[]>([])

  const selectedTypeId = watch("typeId")
  const selectedStatus = watch("statusId")
  const selectedDetailId = watch("DetailId")
  const selectedStateId = watch("location.state")
  const price = watch("price")
  const title = watch("name") || "Property Title"
  const description = watch("description")
  const features = watch("propertyFeature") || {
    bedrooms: 0,
    bathrooms: 0,
    parkingSpots: 0,
    area: 0,
    areaType: "MARLA",
  }

  const typeId = Number(selectedTypeId)
  const stateType = Number(selectedStateId)

  const filteredDetails = details.filter((detail) => detail.propertyTypeId === typeId)
  const selectedStatusValue = statuses.find((s) => s.id.toString() === selectedStatus?.toString())?.value || "Sell"

  useEffect(() => {
    if (stateType) {
      setFilteredCities(cities.filter((item) => item.stateId === stateType))
    }
  }, [stateType, cities])

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-[1fr_400px] gap-8">
        <div className="space-y-8">
          {/* Header Banner */}
          <div className="bg-green-500 text-white rounded-xl p-8">
            <h1 className="text-3xl font-bold mb-2">Upload your property details</h1>
            <p>Get the best value for your property in a few steps.</p>
          </div>

          {/* Form Fields */}
          <div className="space-y-8">
            {/* Purpose Selection */}
            <div>
              <h2 className="text-lg font-semibold mb-4">What do you want to do?</h2>
              <div className="flex gap-4">
                {statuses?.map((item) => (
                  <label
                    key={item.id}
                    className={cn(
                      "flex items-center gap-2 px-6 py-3 rounded-lg border cursor-pointer transition-colors",
                      selectedStatus?.toString() === item.id.toString()
                        ? "border-green-500 bg-green-50 text-green-600"
                        : "border-gray-200 hover:border-gray-300",
                    )}
                  >
                    <input type="radio" value={item.id} {...register("statusId")} className="hidden" />
                    {item.value === "Sell" ? <Home className="h-5 w-5" /> : <Building2 className="h-5 w-5" />}
                    <span>{item.value}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Property Type Selection */}
            <div>
              <h2 className="text-lg font-semibold mb-4">What kind of property do you have?</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {types?.map((item) => (
                  <label
                    key={item.id}
                    className={cn(
                      "flex flex-col items-center gap-2 p-4 rounded-xl border cursor-pointer transition-colors",
                      selectedTypeId?.toString() === item.id.toString()
                        ? "border-green-500 bg-green-50 text-green-600"
                        : "border-gray-200 hover:border-gray-300",
                    )}
                  >
                    <input type="radio" value={item.id} {...register("typeId")} className="hidden" />
                    {item.value === "Home" && <Home className="h-6 w-6" />}
                    {item.value === "Commercial" && <Building2 className="h-6 w-6" />}
                    {item.value === "Plots" && <Store className="h-6 w-6" />}
                    {item.value === "CO-Work Space" && <Warehouse className="h-6 w-6" />}
                    <span>{item.value}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Property Details */}
            {filteredDetails.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold mb-4">Property Details</h2>
                <div className="flex flex-wrap gap-3">
                  {filteredDetails.map((item) => (
                    <label
                      key={item.id}
                      className={cn(
                        "px-6 py-3 rounded-lg border cursor-pointer transition-colors",
                        selectedDetailId?.toString() === item.id.toString()
                          ? "border-green-500 bg-green-50 text-green-600"
                          : "border-gray-200 hover:border-gray-300",
                      )}
                    >
                      <input type="radio" value={item.id} {...register("DetailId")} className="hidden" />
                      <span>{item.value}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Location Fields */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h2 className="text-lg font-semibold mb-4">Which city is your property in?</h2>
                <input
                  type="text"
                  placeholder="Select your city"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none"
                />
              </div>
              <div>
                <h2 className="text-lg font-semibold mb-4">Which area is your property in?</h2>
                <input
                  type="text"
                  placeholder="Address, block, phase, city, etc."
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Preview Panel */}
        <div className="fixed right-14 space-y-4">
          <h2 className="text-lg font-semibold">Preview</h2>
          <div className="w-full rounded-xl shadow-sm shadow-gray-800 border-gray-100 bg-zinc-900 text-white overflow-hidden transition-all duration-300">
            <div className="relative">
              <Image src="/placeholder.png" alt={title} width={400} height={300} className="w-full h-56 object-cover" />
              <Badge className="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 text-xs font-semibold rounded">
                {selectedStatusValue}
              </Badge>
            </div>

            <div className="p-5">
              <h2 className="text-lg font-bold text-gray-100 mb-2 line-clamp-1">{title}</h2>
              <p className="text-sm text-gray-300 mb-4">
                {filteredCities.length > 0 ? filteredCities[0]?.value : "City"}, Pakistan
              </p>

              <div className="flex flex-wrap items-center gap-4 mb-4">
                <div className="flex items-center text-gray-100">
                  <Car className="w-4 h-4 mr-2" />
                  <span className="text-sm">{features.parkingSpots} Parking</span>
                </div>
                <div className="flex items-center text-gray-100">
                  <Ruler className="w-4 h-4 mr-2" />
                  <span className="text-sm">
                    {features.area} {features.areaType}
                  </span>
                </div>
                <div className="flex items-center text-gray-100">
                  <Bed className="w-4 h-4 mr-2" />
                  <span className="text-sm">{features.bedrooms} Beds</span>
                </div>
                <div className="flex items-center text-gray-100">
                  <Bath className="w-4 h-4 mr-2" />
                  <span className="text-sm">{features.bathrooms} Baths</span>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-gray-700">
                <p className="text-xl font-bold text-green-500">PKR {formatPriceWithCommas(price || 0)}</p>
                <Eye className="w-5 h-5 text-gray-400 hover:text-green-500 transition-colors duration-300" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Basic


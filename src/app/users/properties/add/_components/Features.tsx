"use client"
import { useFormContext } from "react-hook-form"
import { Bed, Bath, Car, AreaChart, User, Phone, Mail, Building2, Earth, MapPinIcon as MapPinCheck } from "lucide-react"
import { AreaType, type City, type State } from "@prisma/client"
import type { AddPropertyFormSchemaReplica } from "./Form"
import { useEffect, useState } from "react"

interface Props {
  cities: City[]
  states: State[]
}

const Features = (props: Props) => {
  const {
    register,
    formState: { errors },
    trigger,
    watch,
    getValues,
  } = useFormContext<AddPropertyFormSchemaReplica>()

  const defaultValues = getValues()

  const price = watch("price")
  const formatPriceWithCommas = (price: number | null | undefined): string => {
    if (price === null || price === undefined) return ""
    return new Intl.NumberFormat("en-US").format(price)
  }

  const selectedStateId = watch("location.state")
  const stateType = Number(selectedStateId)

  useEffect(() => {
    if (stateType) {
      setFilteredCities(props.cities.filter((item) => item.stateId === stateType))
    }
  }, [stateType, props.cities])

  const [filteredCities, setFilteredCities] = useState<City[]>([])

  const numberToWords = (num: number): string => {
    // ... (numberToWords function implementation)
    return "" // Placeholder return
  }

  const formatChequeAmount = (price: number): string => {
    if (!price) return ""

    const formattedPrice = formatPriceWithCommas(price)
    const priceInWords = numberToWords(price)

    return `RS ${formattedPrice}\n(${priceInWords} Rupees Only)`
  }

  const enterPriceValue = formatChequeAmount(price)

  const generateRadioButtons = (
    name: "propertyFeature.bedrooms" | "propertyFeature.bathrooms" | "propertyFeature.parkingSpots",
    max = 10,
  ) => {
    return Array.from({ length: max }, (_, i) => i + 1).map((value) => (
      <label key={value} className="relative">
        <input
          {...register(name, { valueAsNumber: true })}
          type="radio"
          value={value}
          defaultChecked={
            defaultValues?.propertyFeature?.[name as keyof typeof defaultValues.propertyFeature] === value
          }
          className="hidden peer"
        />
        <span className="px-5 py-3 text-black rounded-3xl bg-white border border-gray-300 peer-checked:bg-green-400 peer-checked:text-white transition">
          {value}
        </span>
      </label>
    ))
  }

  return (
    <div className={`p-6 flex flex-col gap-3`}>
      {/* Property Name */}
      <div className="input-group">
        <h3 className="text-2xl font-semibold text-green-300 mb-8">Basic Info</h3>
        <h2 className="text-lg font-semibold mb-4">Property Name</h2>
        <input
          {...register("name")}
          id="name"
          placeholder="Enter Your Property Name"
          className={`w-full px-4 py-3 rounded-lg border text-green-500 border-gray-200 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none" : ""}`}
        />
        {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
      </div>

      {/* Price */}
      <div className="input-group">
        <h2 className="text-lg font-semibold mb-4">Price in RS</h2>
        <input
          {...register("price", { valueAsNumber: true })}
          id="price"
          type="number"
          placeholder="Enter Price"
          className={`w-full px-4 py-3 rounded-lg border text-green-500 border-gray-200 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none ${errors.price ? "border-red-500" : ""}`}
        />
        {enterPriceValue && <p className="text-sm mt-1 text-green-200">{enterPriceValue}</p>}
        {errors.price && <p className="text-sm text-red-500">{errors.price.message}</p>}
      </div>

      {/* Description */}
      <div className="input-group">
        <h2 className="text-lg font-semibold mb-4">Description</h2>
        <textarea
          {...register("description")}
          id="description"
          placeholder="Enter Your Description"
          rows={4}
          className={`w-full px-4 py-3 rounded-lg border text-green-500 border-gray-200 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none ${errors.description ? "border-red-500" : ""}`}
        />
        {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
      </div>

      

      {/* Bedrooms */}
      <div className="input-group mt-10">
        <h3 className="text-2xl font-semibold text-green-300 mb-8">Additional Features</h3>

        <label className="flex items-center gap-2 text-base font-medium text-green-300 mb-6">
          <Bed className="w-6 h-6 text-green-500" />
          Bedrooms
        </label>
        <div className="flex flex-wrap items-center justify-center gap-4 max-sm:gap-6">
          {generateRadioButtons("propertyFeature.bedrooms")}
        </div>
        {errors.propertyFeature?.bedrooms && <p className="text-red-500">{errors.propertyFeature.bedrooms.message}</p>}
      </div>

      {/* Bathrooms */}
      <div className="input-group">
        <label className="flex items-center gap-2 text-base font-medium text-green-300 mb-6 mt-4">
          <Bath className="w-6 h-6 text-green-500" />
          Bathrooms
        </label>
        <div className="flex flex-wrap items-center justify-center gap-4 max-sm:gap-6">
          {generateRadioButtons("propertyFeature.bathrooms")}
        </div>
        {errors.propertyFeature?.bathrooms && (
          <p className="text-red-500">{errors.propertyFeature.bathrooms.message}</p>
        )}
      </div>

      {/* Parking Spots */}
      <div className="input-group">
        <label className="flex items-center gap-2 text-base font-medium text-green-300 mb-6 mt-4">
          <Car className="w-6 h-6 text-green-500" />
          Parking Spots
        </label>
        <div className="flex flex-wrap items-center justify-center gap-4 max-sm:gap-6">
          {generateRadioButtons("propertyFeature.parkingSpots")}
        </div>
        {errors.propertyFeature?.parkingSpots && (
          <p className="text-red-500">{errors.propertyFeature.parkingSpots.message}</p>
        )}
      </div>

      {/* Area */}
      <div className="input-group">
        <label className="flex items-center text-base font-medium text-green-300 mt-2">
          <AreaChart className="w-6 h-6 text-green-500 mr-2" />
          Area
        </label>
        <div className="w-full flex items-center justify-start mt-2 gap-3">
          <div className="w-2/3">
            <input
              {...register("propertyFeature.area", { valueAsNumber: true })}
              placeholder="Area"
              type="number"
              className={`peer w-full bg-transparent placeholder:text-slate-400 text-white text-sm border border-slate-200 rounded-md px-3 py-2.5 transition duration-300 ease focus:outline-none focus:border-green-600 hover:border-slate-300 shadow-sm ${errors.propertyFeature?.area ? "border-red-500" : ""}`}
            />
          </div>
          <div className="w-1/3">
            <select
              {...register("propertyFeature.areaType")}
              className={`peer w-full bg-transparent text-white text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-green-600 hover:border-slate-300 shadow-sm ${errors.propertyFeature?.areaType ? "border-red-500" : ""}`}
            >
              {Object.values(AreaType).map((type) => (
                <option key={type} value={type} className="text-black">
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>
        {errors.propertyFeature?.area && <p className="text-red-500">{errors.propertyFeature.area.message}</p>}
        {errors.propertyFeature?.areaType && <p className="text-red-500">{errors.propertyFeature.areaType.message}</p>}
      </div>


      {/* Additional Features */}
      <div className="mt-3 flex flex-wrap items-center justify-between">
        <div className="flex items-center mb-2">
          <input
            type="checkbox"
            {...register("propertyFeature.hasSwimmingPool")}
            id="hasSwimmingPool"
            className="mr-2"
          />
          <label htmlFor="hasSwimmingPool" className="text-white">
            Has Swimming Pool
          </label>
        </div>
        <div className="flex items-center mb-2">
          <input type="checkbox" {...register("propertyFeature.hasGardenYard")} id="hasGardenYard" className="mr-2" />
          <label htmlFor="hasGardenYard" className="text-white">
            Has Garden/Yard
          </label>
        </div>
        <div className="flex items-center mb-2">
          <input type="checkbox" {...register("propertyFeature.hasBalcony")} id="hasBalcony" className="mr-2" />
          <label htmlFor="hasBalcony" className="text-white">
            Has Balcony/Patio
          </label>
        </div>
      </div>

      {/* Contact Information */}
      <div className="mt-9">
        <h3 className="text-2xl font-semibold text-green-300 mb-8">Contact Information</h3>
        <div className="space-y-4">
          <div className="flex items-center">
            <User className="w-6 h-6 text-green-500 mr-2" />
            <input
              {...register("contact.name")}
              placeholder="Contact Name"
              className={`peer w-full bg-transparent placeholder:text-slate-400 text-white text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-green-600 hover:border-slate-300 shadow-sm ${errors.contact?.name ? "border-red-500" : ""}`}
            />
          </div>
          {errors.contact?.name && <p className="text-sm text-red-500">{errors.contact.name.message}</p>}

          <div className="flex items-center">
            <Phone className="w-6 h-6 text-green-500 mr-2" />
            <input
              {...register("contact.phone")}
              placeholder="Phone Number"
              className={`peer w-full bg-transparent placeholder:text-slate-400 text-white text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-green-600 hover:border-slate-300 shadow-sm ${errors.contact?.phone ? "border-red-500" : ""}`}
            />
          </div>
          {errors.contact?.phone && <p className="text-sm text-red-500">{errors.contact.phone.message}</p>}

          <div className="flex items-center">
            <Mail className="w-6 h-6 text-green-500 mr-2" />
            <input
              {...register("contact.email")}
              placeholder="Email Address"
              className={`peer w-full bg-transparent placeholder:text-slate-400 text-white text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-green-600 hover:border-slate-300 shadow-sm ${errors.contact?.email ? "border-red-500" : ""}`}
            />
          </div>
          {errors.contact?.email && <p className="text-sm text-red-500">{errors.contact.email.message}</p>}
        </div>
      </div>
    </div>
  )
}

export default Features


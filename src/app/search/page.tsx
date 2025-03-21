"use client"

import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import type { Property } from "@/lib/type"
import Loader from "@/components/ui/loader"
import PropertyCardsecond from "@/components/views/secondPropertyCard"
import { X } from "lucide-react"

export default function Search() {
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [sortOption, setSortOption] = useState<string>("priceLowToHigh")
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  // State for additional filters
  const [propertyStatus, setPropertyStatus] = useState<string>("all")
  const [bedrooms, setBedrooms] = useState<number>(0)
  const [bathrooms, setBathrooms] = useState<number>(0)
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000000])
  const [maxPrice, setMaxPrice] = useState<number>(1000000)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/properties/list?statusProperty=ACCEPTED")
        if (!response.ok) {
          throw new Error(`Error fetching properties`)
        }
        const data = await response.json()
        setProperties(data)

        // Find the highest price to set as max for the slider
        if (data.length > 0) {
          const highestPrice = Math.max(...data.map((p : any) => Number(p.price)))
          setMaxPrice(highestPrice > 0 ? highestPrice : 1000000)
          setPriceRange([0, highestPrice > 0 ? highestPrice : 1000000])
        }
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleSearch = () => {
    // This function could be used to trigger API-based filtering if needed
    console.log("Search term:", searchTerm)
    console.log("Sort by:", sortOption)
    console.log("Property Status:", propertyStatus)
    console.log("Bedrooms:", bedrooms)
    console.log("Bathrooms:", bathrooms)
    console.log("Price Range:", priceRange)
  }

  const resetFilters = () => {
    setSearchTerm("")
    setSortOption("priceLowToHigh")
    setPropertyStatus("all")
    setBedrooms(0)
    setBathrooms(0)
    setPriceRange([0, maxPrice])
  }

  const filteredProperties = properties
    .filter((property) => {
      // Text search filter (name or city)
      const nameMatch = property.name.toLowerCase().includes(searchTerm.toLowerCase())
      const cityMatch = property.location.city.value.toLowerCase().includes(searchTerm.toLowerCase())
      const textMatch = nameMatch || cityMatch

      // Property status filter
      const statusMatch =
        propertyStatus === "all" || property.status.value.toLowerCase() === propertyStatus.toLowerCase()

      // Bedrooms and bathrooms filters
      const bedroomsMatch = bedrooms === 0 || property.feature.bedrooms >= bedrooms
      const bathroomsMatch = bathrooms === 0 || property.feature.bathrooms >= bathrooms

      // Price range filter
      const propertyPrice = Number(property.price)
      const priceMatch = propertyPrice >= priceRange[0] && propertyPrice <= priceRange[1]

      // All filters must match
      return textMatch && statusMatch && bedroomsMatch && bathroomsMatch && priceMatch
    })
    .sort((a, b) => {
      if (sortOption === "priceLowToHigh") {
        return Number(a.price) - Number(b.price)
      }
      if (sortOption === "priceHighToLow") {
        return Number(b.price) - Number(a.price)
      }
      return 0
    })

  return (
    <div className="flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="md:w-1/4 w-full p-3 space-y-4 rounded-lg">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Filters</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={resetFilters}
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            <X className="h-3 w-3 mr-1" /> Reset
          </Button>
        </div>

        <Input
          placeholder="Search by name or city..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
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

        <Select value={propertyStatus} onValueChange={setPropertyStatus}>
          <SelectTrigger className="w-full p-2 border border-gray-300 rounded">
            <SelectValue placeholder="Property Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="rent">Rent</SelectItem>
            <SelectItem value="sell">Sell</SelectItem>
          </SelectContent>
        </Select>

        <div>
          <label className="block text-sm font-medium text-gray-700">Bedrooms</label>
          <Select value={bedrooms.toString()} onValueChange={(value) => setBedrooms(Number(value))}>
            <SelectTrigger className="w-full p-2 border border-gray-300 rounded">
              <SelectValue placeholder="Bedrooms" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">Any</SelectItem>
              <SelectItem value="1">1+</SelectItem>
              <SelectItem value="2">2+</SelectItem>
              <SelectItem value="3">3+</SelectItem>
              <SelectItem value="4">4+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Bathrooms</label>
          <Select value={bathrooms.toString()} onValueChange={(value) => setBathrooms(Number(value))}>
            <SelectTrigger className="w-full p-2 border border-gray-300 rounded">
              <SelectValue placeholder="Bathrooms" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">Any</SelectItem>
              <SelectItem value="1">1+</SelectItem>
              <SelectItem value="2">2+</SelectItem>
              <SelectItem value="3">3+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
          <Slider
            min={0}
            max={maxPrice}
            step={1000}
            value={priceRange}
            onValueChange={(value) => setPriceRange(value as [number, number])}
            className="mt-2"
          />
          <div className="flex justify-between mt-2 text-sm">
            <span>${priceRange[0].toLocaleString()}</span>
            <span>${priceRange[1].toLocaleString()}</span>
          </div>
        </div>

        <Button onClick={handleSearch} className="w-full text-white p-2 rounded">
          Apply Filters
        </Button>
      </div>

      {/* Property Listings */}
      <div className="md:w-3/4 w-full p-6 border-l-2">
        <div className="flex justify-between items-center md:px-10 py-4">
          <h1 className="text-2xl text-primary">Listing Results</h1>
          <p className="text-sm text-muted-foreground">
            {filteredProperties.length} {filteredProperties.length === 1 ? "property" : "properties"} found
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProperties.length > 0 ? (
              filteredProperties.map((property, index) => (
                <PropertyCardsecond
                  key={index}
                  image={property.images[0]?.url || "/Peshawar.jpg"}
                  title={property.name}
                  price={property.price}
                  location={property.location}
                  status={property.status.value}
                  features={property.feature}
                  onContact={property.contact}
                  id={property.feature.propertyId}
                />
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center h-64 text-center">
                <p className="text-lg font-medium">No properties match your filters</p>
                <p className="text-muted-foreground">Try adjusting your search criteria</p>
                <Button variant="outline" onClick={resetFilters} className="mt-4">
                  Reset Filters
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}


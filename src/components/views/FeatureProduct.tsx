"use client"
import { Cards } from '@/lib/type'
import React, { useEffect, useState } from 'react'
import Heading from './Heading'
import { PropertyCard } from './PropertyCard'

const FeatureProduct = () => {

      const [properties, setProperties ] = useState<Cards[]>([])
      
      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('/api/properties/list')
            if (!response) {
              throw new Error(`Error Status`)
            }
            const data = await response.json()
            setProperties(data)
          } catch (error) {
            throw new Error(error instanceof Error ? error.message : String(error))
          }
        }
        fetchData()
      }, [])
      console.log(properties)
      const proepertiesSlice = properties.slice(0, 4)
      
  return (
    <div>
        <Heading title="Featured Properties"/>
    <div className="p-4">
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {proepertiesSlice.map((property, index) => (
          <PropertyCard
            key={index}
            image={property.images[0]?.url}
            title={property.name}
            price={property.price}
            location={property.location.city}
            status={property.status.value}
            features={property.feature} 
            onContact={property.contact}
          />
        ))}
      </div>
    </div>
    </div>
  )
}

export default FeatureProduct



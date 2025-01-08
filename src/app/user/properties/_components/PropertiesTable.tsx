
'use client'

import { useState, useEffect } from 'react'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import Link from 'next/link'
import { FaEye, FaPencilAlt, FaTrash } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { features } from 'process'
import Loader from '@/components/ui/loader'

interface Property {
  id: number
  name: string
  status: {
    id: number
    value: string
  }
  type: {
    id: number
    value: string
  }
  feature: {
    area: number
    bathrooms: number
    bedrooms: number
    propertyId: number
  }
  price: number

}

export default function PropertyTable() {
  const [properties, setProperties] = useState<Property[]>([])
  const { isAuthenticated } = useKindeBrowserClient()

  useEffect(() => {
    if (isAuthenticated) {
      fetchProperties()
    }
  }, [isAuthenticated])

  const fetchProperties = async () => {
    try {
      const response = await fetch('/api/properties')
      if (response.ok) {
        const data = await response.json()
        setProperties(data)
      }
    } catch (error) {
      console.error('Error fetching properties:', error)
    }
  }

  const deleteProperty = async (id: number) => {
    try {
      const response = await fetch(`/api/properties/${id}`, {
        method: 'DELETE',
      })
      if (response.ok) {
        setProperties(properties.filter(property => property.id !== id))
      }
      toast.success("Successfully Deleted")
    } catch (error) {
      console.error('Error deleting property:', error)
    }
  }

  if (!isAuthenticated) {
    return <div className='w-full  flex justify-center items-center h-screen text-green-600'> 
      <Loader/>
    </div>
  }

  console.log(properties)
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="overflow-x-auto w-full">
        <table className="min-w-full table-auto">
          <thead className="border-b">
            <tr>
              <th className="px-4 py-2 text-left">NAME</th>
              <th className="px-4 py-2 text-left">PRICE</th>
              <th className="px-4 py-2 text-left">TYPE</th>
              <th className="px-4 py-2 text-left">STATUS</th>
              <th className="px-4 py-2 text-left">BEDROOMS</th>
              <th className="px-4 py-2 text-left">BATHROOM</th>
              <th className="px-4 py-2 text-left">AREA</th>
              <th className="px-4 py-2 text-left">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
             { properties.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="px-4 py-2">{item.name}</td>
                  <td className="px-4 py-2">{item.price}</td>
                  <td className="px-4 py-2">{item.type.value}</td>
                  <td className="px-4 py-2">{item.status.value}</td>
                  <td className="px-4 py-2">{item.feature.bedrooms}</td>
                  <td className="px-4 py-2">{item.feature.bathrooms}</td>
                  <td className="px-4 py-2">{item.feature.area}</td>
                  <td className="px-4 py-2">
                  <div className="flex items-center gap-4">
                      <Link href={`/properties/rent/${item.feature.propertyId}`} title="Details">
                        <FaEye className="text-slate-500" />
                      </Link>
                      <Link href={`/user/properties/${item.id}/edit`} title="Edit Property">
                        <FaPencilAlt className="text-yellow-500" />
                      </Link>
                      <Link onClick={() => deleteProperty(item.id)} href={`/user/properties`} title="Delete Property">
                        <FaTrash className="text-red-500" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

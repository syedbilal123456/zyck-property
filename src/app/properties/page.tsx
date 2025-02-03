'use client'

import { useState, useEffect } from 'react'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import Link from 'next/link'
import Loader from '@/components/ui/loader';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { redirect } from 'next/navigation';

interface Property {
  id: number;
  name: string;
  status: {
    id: number;
    value: string;
  };
  type: {
    id: number;
    value: string;
  };
  price: number;
}


export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([])
  const { isAuthenticated } = useKindeBrowserClient()
  const { user } = useSelector((state: RootState) => state.auth)
  
  const handleAddProperty = () => {
    if (!user?.ProfileComplete) {
      redirect('/user/profile')
    }

  }

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
      const url = `/api/properties/${id}`
      const response = await fetch(url, {
        method: 'DELETE',
      })
      if (response.ok) {
        setProperties(properties.filter(property => property.id !== id))
      }
    } catch (error) {
      console.error('Error deleting property:', error)
    }
  }

  if (!isAuthenticated) {
    return <div className='w-full h-full text-green-600 flex justify-center items-center bg-opacity-30'>
      <Loader />
    </div>
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Properties</h1>
      <Link href="/properties/new" className="bg-blue-500 text-white px-4 py-2 rounded">
        Add New Property
      </Link>
      <table className="w-full mt-4">
        <thead>
          <tr>
            <th className="text-left">Name</th>
            <th className="text-left">Status</th>
            <th className="text-left">Type</th>
            <th className="text-left">Price</th>
            <th className="text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {properties.map((property, index) => (
            <tr key={index}>
              <td className='text-white'>{property.name}</td>
              <td className='text-white'>{property.status.value}</td>
              <td className='text-white'>{property.type.value}</td>
              <td className='text-white'>{property.price}</td>
              <td>
                <Link href={`/properties/${property.id}`} className="text-blue-500 mr-2">
                  View
                </Link>
                <Link href={`/properties/${property.id}/edit`} className="text-green-500 mr-2">
                  Edit
                </Link>
                <button
                  onClick={() => deleteProperty(property.id)}
                  className="text-red-500"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

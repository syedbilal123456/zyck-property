// "use client";
// import { TrashIcon, EyeIcon, PencilIcon } from "@heroicons/react/16/solid";
// import Link from "next/link";
// import { useRouter } from "next/navigation";

// type Props = {
//   properties: {
//     id: string;
//     name: string;
//     price: number;
//     type: { value: string };
//     status: { value: string };
//   }[];
//   totalPages: number;
//   currentPage: number;
// };

// const PropertiesTable = ({ properties, totalPages, currentPage }: Props) => {
//   const router = useRouter();
//   return (
//     <div className="flex flex-col items-center gap-4">
//       <div className="overflow-x-auto w-full">
//         <table className="min-w-full table-auto">
//           <thead className="border-b">
//             <tr>
//               <th className="px-4 py-2 text-left">NAME</th>
//               <th className="px-4 py-2 text-left">PRICE</th>
//               <th className="px-4 py-2 text-left">TYPE</th>
//               <th className="px-4 py-2 text-left">STATUS</th>
//               <th className="px-4 py-2 text-left">ACTIONS</th>
//             </tr>
//           </thead>
//           <tbody>
//             {properties.map((item) => (
//               <tr key={item.id} className="border-b">
//                 <td className="px-4 py-2">{item.name}</td>
//                 <td className="px-4 py-2">{item.price}</td>
//                 <td className="px-4 py-2">{item.type.value}</td>
//                 <td className="px-4 py-2">{item.status.value}</td>
//                 <td className="px-4 py-2">
//                   <div className="flex items-center gap-4">
//                     <Link href={`/property/${item.id}`} title="Details">
//                       <EyeIcon className="w-5 text-slate-500" />
//                     </Link>
//                     <Link href={`/user/properties/${item.id}/edit`} title="Edit Property">
//                       <PencilIcon className="w-5 text-yellow-500" />
//                     </Link>
//                     <Link href={`/user/properties/${item.id}/delete`} title="Delete Property">
//                       <TrashIcon className="w-5 text-red-500" />
//                     </Link>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <div className="mt-4 flex justify-center gap-2">
//         {[...Array(totalPages)].map((_, index) => (
//           <button
//             key={index}
//             className={`px-4 py-2 rounded-md ${
//               currentPage === index + 1
//                 ? "bg-blue-500 text-white"
//                 : "bg-gray-200 text-gray-600"
//             }`}
//             onClick={() => router.push(`/user/properties?pagenum=${index + 1}`)}
//           >
//             {index + 1}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default PropertiesTable;

'use client'

import { useState, useEffect } from 'react'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import Link from 'next/link'
import { FaEye, FaPencilAlt, FaTrash } from 'react-icons/fa'
import { toast } from 'react-toastify'

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
    return <div>Please log in to view your properties.</div>
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
            {properties.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-2 text-center text-gray-500">
                  No properties available.
                </td>
              </tr>
            ) : (
              properties.map((item, index) => (
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
                      <Link href={`/property`} title="Details">
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
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

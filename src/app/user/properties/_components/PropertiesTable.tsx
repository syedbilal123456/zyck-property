"use client";
import { TrashIcon, EyeIcon, PencilIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Props = {
  properties: {
    id: string;
    name: string;
    price: number;
    type: { value: string };
    status: { value: string };
  }[];
  totalPages: number;
  currentPage: number;
};

const PropertiesTable = ({ properties, totalPages, currentPage }: Props) => {
  const router = useRouter();
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
              <th className="px-4 py-2 text-left">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((item) => (
              <tr key={item.id} className="border-b">
                <td className="px-4 py-2">{item.name}</td>
                <td className="px-4 py-2">{item.price}</td>
                <td className="px-4 py-2">{item.type.value}</td>
                <td className="px-4 py-2">{item.status.value}</td>
                <td className="px-4 py-2">
                  <div className="flex items-center gap-4">
                    <Link href={`/property/${item.id}`} title="Details">
                      <EyeIcon className="w-5 text-slate-500" />
                    </Link>
                    <Link href={`/user/properties/${item.id}/edit`} title="Edit Property">
                      <PencilIcon className="w-5 text-yellow-500" />
                    </Link>
                    <Link href={`/user/properties/${item.id}/delete`} title="Delete Property">
                      <TrashIcon className="w-5 text-red-500" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-center gap-2">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            className={`px-4 py-2 rounded-md ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-600"
            }`}
            onClick={() => router.push(`/user/properties?pagenum=${index + 1}`)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PropertiesTable;

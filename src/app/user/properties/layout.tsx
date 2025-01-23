import Link from "next/link";
import React, { ReactNode } from "react";


const PropertiesLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className="bg-green-500 flex justify-between items-center p-2">
        <h2 className="text-white text-xl font-semibold px-2">User Properties</h2>
        <div>
        <Link href="/user/properties/add">
        <button className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700">
          Add Property
        </button>
      </Link> 
        </div>
      </div>
           {
        children
      }
      
    </div>
  );
};

export default PropertiesLayout;

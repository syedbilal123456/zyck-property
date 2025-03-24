import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import Link from "next/link";
import { Eye } from "lucide-react";

interface Developer {
  name: string;
  email: string;
  phone: string;
}

interface Project {
  id: number;
  image: string;
  title: string;
  location: string;
  projectType: string;
  priceRange: string;
  status: string;
  developer: Developer;
}

export default function ProjectCard({
  id,
  image,
  title,
  location,
  projectType,
  priceRange,
  status,
  developer,
}: Project) {
  return (
    <div className="w-full rounded-lg overflow-hidden">
      {/* Image Section with Badges */}
      <div className="relative">
        <AspectRatio ratio={16 / 9} className="bg-gray-200">
          <Image
            src={image || "https://dummyimage.com/400x400"}
            alt={title}
            width={400}
            height={300}
            className="object-cover w-full h-full rounded-t-lg"
          />
        </AspectRatio>
        <div className="absolute top-2 left-2 flex gap-2">
          <Badge className="bg-blue-600 text-white font-normal px-4 py-1 rounded-md">Featured</Badge>
          <Badge className="bg-green-600 text-white font-normal px-4 py-1 rounded-md">{status}</Badge>
        </div>
      </div>

      {/* Content Without Card Component */}
      <div className="bg-white p-6 flex flex-col h-52">
        {/* Title and Location */}
        <div className="mb-1">
          <h3 className="font-semibold text-lg truncate">{title}</h3>
          <p className="text-gray-500 text-sm">{location}, Pakistan</p>
        </div>

        {/* Project Features (if needed) */}
        <div className="flex flex-wrap gap-4 mt-4 mb-2">
          {/* Add any specific project features here */}
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mt-auto mb-2">
          <span className="text-xl font-bold text-green-600">PKR {priceRange}</span>
          <Link href={`/projects/${id}`}>
            <Eye className="text-gray-400" size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
}
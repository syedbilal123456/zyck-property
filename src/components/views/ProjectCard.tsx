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
    <Card className="w-full mx-auto border rounded-lg shadow-lg flex flex-col bg-white">
      {/* Image Section */}
      <div className="relative">
        <AspectRatio ratio={16 / 9} className="bg-gray-200">
          <Image
            src={image || "https://dummyimage.com/400x400"}
            alt={title}
            width={400}
            height={300}
            className="object-cover w-full h-full"
          />
        </AspectRatio>
        <Badge className="absolute top-2 left-2 bg-blue-500 text-white">
          {status}
        </Badge>
        <Badge className="absolute top-2 right-2 bg-green-500 text-white">
          {projectType}
        </Badge>
      </div>

      {/* Content Section */}
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        <CardDescription className="text-gray-500">{location}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-2">
        <p className="text-sm text-gray-700">
          <strong>Price Range:</strong> {priceRange} PKR
        </p>
        <p className="text-sm text-gray-700">
          <strong>Developer:</strong> {developer.name}
        </p>
        <p className="text-sm text-gray-700">
          <strong>Contact:</strong> {developer.phone} | {developer.email}
        </p>
      </CardContent>

      {/* Footer Section */}
      <CardFooter className="mt-auto">
        <Link href={`/projects/${id}`}>
          <Button className="w-full">View Details</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}

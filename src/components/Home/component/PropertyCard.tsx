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

interface Contact {
  email: string
  name: string
  phone: string
}
interface Features {
  area: number;
  bathrooms: number;
  bedrooms: number;
  hasBalcony: boolean;
  hasGardenYard: boolean;
  hasSwimmingPool: boolean;
  parkingSpots: number;
  propertyId: number;
}


export function PropertyCard({
  id,
  image,
  title,
  price,
  location,
  status,
  features,
  onContact,
}: {
  id:Number;
  image: string;
  title: string;
  price: string;
  location: string;
  status: string;
  features: Features; // Use the `Features` type here
  onContact: Contact
}) {

  console.log(image)

  console.log(features);
  return (
    <Card className="w-full mx-auto border rounded-lg shadow flex flex-col">
  {/* Image Section */}
  <div className="relative">
    <AspectRatio ratio={16 / 9} className="bg-gray-200">
      <Image
        src={image}
        alt={title}
        width={400}
        height={400}
        className="object-cover w-full h-full"
      />
    </AspectRatio>
    <Badge className="absolute top-2 left-2 bg-blue-500 text-white">Featured</Badge>
    <Badge className="absolute top-2 left-20 bg-green-500 text-white">{status}</Badge>
  </div>

  {/* Content Section */}
  <CardHeader>
    <CardTitle className="text-lg font-semibold">{title}</CardTitle>
    <CardDescription className="text-gray-500">{location}</CardDescription>
    <h3 className="text-xl font-bold text-green-600">{price} PKR</h3>
  </CardHeader>

   <CardContent className="space-y-2">
    {/* <p className="text-gray-700">{description}</p>  */}

    {/* Features Section */}
    <div className="flex flex-wrap gap-2">
      {/* {Object.entries(features) */}
        {/* .filter(([key, value]) => */}
          {/* // Display only these keys when their value is true */}
          {/* ['hasSwimmingPool', 'hasGardenYard', 'hasBalcony'].includes(key) */}
            {/* ? value === true */}
            {/* : ['bedrooms', 'bathrooms', 'area'].includes(key) */}
        {/* ) */}
        {/* .map(([key, value], index) => ( */}
          {/* <Badge key={index} className="bg-gray-100 text-gray-800"> */}
            {/* {key === 'area' */}
              {/* ? `Area: ${value} sqft` */}
              {/* : `${key.charAt(0).toUpperCase() + key.slice(1)}`} */}
          {/* </Badge> */}
        {/* ))} */}
    </div>
  </CardContent>

  {/* Footer Section */}
  <CardFooter className="mt-auto">
    <Button className="w-full">View details</Button>
  </CardFooter>
</Card>

  );
}

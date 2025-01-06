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

export function PropertyCard({
  image,
  id,
  title,
  price,
  location,
  description,
  features,
  onContact,
}:any) {
  return (
    <Card className="max-w-sm mx-auto border rounded-lg shadow">
      {/* Image Section */}
      <div className="relative">
        <AspectRatio ratio={16 / 9} className="bg-gray-200">
          <Image
            src={image}
            alt={title}
            width={400}
            height={400}
           className="object-cover"
          />
        </AspectRatio>
        <Badge className="absolute top-2 left-2 bg-blue-500 text-white">
          Featured
        </Badge>
        <Badge className="absolute top-2 left-20 bg-green-500 text-white">
          Sale
        </Badge>
      </div>

      {/* Content Section */}
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        <CardDescription className="text-gray-500">{location}</CardDescription>
        <h3 className="text-xl font-bold text-green-600">{price}</h3>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-gray-700">{description}</p>

        {/* Features Section */}
        <div className="flex flex-wrap gap-2">
          {features.map((feature :string, index:number) => (
            <Badge key={index} className="bg-gray-100 text-gray-800">
              {feature}
            </Badge>
          ))}
        </div>
      </CardContent>

      {/* Footer Section */}
      <CardFooter className="mt-auto">
        <Button className="w-full" onClick={onContact}>
          <Link href={`/property/${id}`}>
       View details
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

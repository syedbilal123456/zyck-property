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
import { Separator } from "@/components/ui/separator";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";

export function PropertyCard({
  image,
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
          height={400}
          width={400}
            src={image}
            alt={title}
            className="object-cover w-full h-full rounded-t-lg"
          />
        </AspectRatio>
        <Badge className="absolute top-2 left-2 bg-blue-500 text-white">
          Featured
        </Badge>
      </div>

      {/* Content Section */}
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        <CardDescription className="text-gray-500">{location}</CardDescription>
        <h3 className="text-xl font-bold text-green-600">{price}</h3>
      </CardHeader>
      <Separator />
      <CardContent className="space-y-2">
        <p className="text-gray-700">{description}</p>

        {/* Features Section
        <div className="flex flex-wrap gap-2">
          {features.map((feature, index) => (
            <Badge key={index} className="bg-gray-100 text-gray-800">
              {feature}
            </Badge>
          ))}
        </div> */}
      </CardContent>

      {/* Footer Section */}
      <CardFooter className="flex justify-between">
        <Button variant="outline" className="w-full" onClick={onContact}>
          Contact Owner
        </Button>
      </CardFooter>
    </Card>
  );
}

// Example Usage
export function PropertyCardDemo() {
  return (
    <div className="p-4">
      <PropertyCard
        image="https://via.placeholder.com/400x300"
        title="Luxury Apartment"
        price="$1,200/month"
        location="Downtown, NY"
        description="A spacious luxury apartment with modern amenities and stunning views."
        features={["2 Bedrooms", "2 Bathrooms", "Gym Access", "Parking"]}
        onContact={() => alert("Contacting owner...")}
      />
    </div>
  );
}

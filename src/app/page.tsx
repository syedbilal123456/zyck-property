import { Button } from "@/components/ui/button";
import Hero from "@/components/views/Hero";
import { PropertyCard } from "@/components/views/PropertyCard";

export default function Home() {
  return (
    <>
    <Hero/>
    <PropertyCard
        image="/background.jpg"
        title="Luxury Apartment"
        price="$1,200/month"
        location="Downtown, NY"
        description="A spacious luxury apartment with modern amenities and stunning views."
        // features={["2 Bedrooms", "2 Bathrooms", "Gym Access", "Parking"]}
        // onContact={() => alert("Contacting owner...")}
      />
     <p> something fix</p>
    </>

  );
}

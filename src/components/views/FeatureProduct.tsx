// src/app/components/FeatureProduct.tsx (Server Component)
import { Property } from "@/lib/type";
import PropertyCardsecond from "@/components/views/secondPropertyCard";
import { SkeletonPropertyCard } from "../custom/skeleton/SkeletonPropertyCard";

// Fetch properties on the server
const fetchProperties = async (): Promise<Property[]> => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/properties/list?statusProperty=ACCEPTED`,
      { cache: "no-store" } // Ensure fresh data every time
    );
    if (!response.ok) throw new Error(`Error: ${response.statusText}`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching properties:", error);
    return [];
  }
};

const FeatureProduct = async () => {
  const properties = await fetchProperties();

  // Filter properties for Rent and Sale
  const propertiesForRent = properties
    .filter((item) => item.status.value === "Rent")
    .slice(-4)
    .reverse();

  const propertiesForSale = properties
    .filter((item) => item.status.value === "Sell")
    .slice(-4)
    .reverse();

  return (
    <div>
      {/* Featured Properties Section */}
      <Section title="Featured Properties">
        {properties.length > 0 ? (
          <PropertyGrid properties={properties.slice(-4).reverse()} />
        ) : (
          <SkeletonPropertyCard count={4} />
        )}
      </Section>

      {/* Recent Properties for Rent Section */}
      <Section title="Recent Properties for Rent">
        {propertiesForRent.length > 0 ? (
          <PropertyGrid properties={propertiesForRent} />
        ) : (
          <SkeletonPropertyCard count={4} />
        )}
      </Section>

      {/* Recent Properties for Sale Section */}
      <Section title="Recent Properties for Sell">
        {propertiesForSale.length > 0 ? (
          <PropertyGrid properties={propertiesForSale} />
        ) : (
          <SkeletonPropertyCard count={4} />
        )}
      </Section>
    </div>
  );
};

// Section Wrapper Component
const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div>
    <div className="px-6 py-8 lg:sm:px-8 lg:sm:py-8">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">{title}</h2>
    </div>
    <div className="p-4">{children}</div>
  </div>
);

// Grid Component for Property Cards
const PropertyGrid = ({ properties }: { properties: Property[] }) => (
  <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 p-5">
    {properties.map((property) => (
      <PropertyCardsecond
        key={property.feature.propertyId}
        image={property.images[0]?.url || "https://dummyimage.com/400x400"}
        title={property.name}
        price={property.price}
        location={property.location}
        status={property.status.value}
        features={property.feature}
        onContact={property.contact}
        id={property.feature.propertyId}
      />
    ))}
  </div>
);

export default FeatureProduct;

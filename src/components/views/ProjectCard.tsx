import Image from "next/image";

interface PriceRange {
  id: string;
  minPrice: number;
  maxPrice: number;
  projectId: string;
}

interface AuthorizedAgent {
  id: string;
  email: string;
  phone: string;
  projectId: string;
}

interface RealEstateProject {
  id: string;
  name: string;
  area: string;
  city: string;
  developerName: string;
  developerPhone: string;
  expectedCompletion: string;
  launchDate: string;
  projectStatus: string;
  projectType: string;
  registrationDetails: string;
  paymentPlan: string;
  priceRange: PriceRange;
  availableUnits: string[];
  basicAmenities: string[];
  luxuryFeatures: string[];
  nearbyFacilities: string[];
  nearbyLandmarks: string;
  governmentApprovals: string[];
  bookingProcedure: string;
  masterPlan: string;
  googleMapsLink: string;
  sizesAndLayouts: string;
  rendersAndPlans: string[];
  siteImagesVideos: string[];
  authorizedAgents: AuthorizedAgent[];
}

const ProjectCard = ({ project }: { project: RealEstateProject }) => {
  // Safe defaults for optional values
  const firstImage = project.siteImagesVideos?.[0] || "/default-project.jpg";
  const status = project.projectStatus || "Coming Soon";
  const projectType = project.projectType || "Residential";
  const priceFrom = project.priceRange?.minPrice?.toLocaleString() || "N/A";
  const priceTo = project.priceRange?.maxPrice?.toLocaleString() || "N/A";
  const completionDate = project.expectedCompletion || "TBD";
  const launchDate = project.launchDate || "Coming Soon";

  return (
    <div className="border rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg">
      {/* Project Image with Status Badge */}
      <div className="relative aspect-video">
        <Image
          src={firstImage}
          alt={`${project.name} project image`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={false}
        />
        <div className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">
          {status}
        </div>
      </div>

      {/* Project Details */}
      <div className="p-4 space-y-3">
        <div>
          <h3 className="text-xl font-bold line-clamp-1">{project.name}</h3>
          <p className="text-gray-600 text-sm">{project.developerName}</p>
        </div>

        {/* Key Details Grid */}
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="space-y-1">
            <p className="font-semibold">Location</p>
            <p className="text-gray-600 line-clamp-1">
              {project.city}, {project.area}
            </p>
          </div>
          <div className="space-y-1">
            <p className="font-semibold">Type</p>
            <p className="text-gray-600">{projectType}</p>
          </div>
          <div className="space-y-1">
            <p className="font-semibold">Price Range</p>
            <p className="text-gray-600">
              PKR {priceFrom} - {priceTo}
            </p>
          </div>
          <div className="space-y-1">
            <p className="font-semibold">Completion</p>
            <p className="text-gray-600">
              {launchDate} - {completionDate}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors">
            View Details
          </button>
          <button className="flex-1 border border-blue-600 text-blue-600 hover:bg-blue-50 py-2 px-4 rounded-md text-sm font-medium transition-colors">
            Contact
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
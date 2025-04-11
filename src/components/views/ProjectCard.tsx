import Image from "next/image";

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
  priceRange: {
    id: string;
    minPrice: number;
    maxPrice: number;
    projectId: string;
  };
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

interface AuthorizedAgent {
  id: string;
  email: string;
  phone: string;
  projectId: string;
}

// ProjectCard Component
const ProjectCard: React.FC<{ project: RealEstateProject }> = ({ project }) => {
  // const expectedCompletion = project.expectedCompletion || "N/A";
  return (
    <div className="border rounded-lg shadow-md overflow-hidden">
      {/* Project Image */}
      <div className="relative">
        <Image 
          src={project.siteImagesVideos[0] || "https://dummyimage.com/400x400"} 
          width={400}
          height={400}
          alt={project.name} 
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 rounded">
          {project.projectStatus}
        </div>
      </div>

      {/* Project Details */}
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">{project.name}</h3>
        <p className="text-gray-600 mb-2">{project.developerName}</p>
        
        {/* Key Details */}
        <div className="grid grid-cols-2 gap-2 text-sm mb-4">
          <div>
            <span className="font-semibold">Location:</span> {project.city}
          </div>
          <div>
            <span className="font-semibold">Type:</span> {project.projectType}
          </div>
          <div>
            <span className="font-semibold">Price From:</span> 
            PKR {project.priceRange.maxPrice} to {project.priceRange.minPrice}
          </div>
          <div>
            <span className="font-semibold">Completion:</span> 
            {project.launchDate} - {project.expectedCompletion}
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex justify-between">
          <button 
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            View Details
          </button>
          <button 
            className="border border-blue-500 text-blue-500 px-4 py-2 rounded hover:bg-blue-50"
          >
            Contact
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;

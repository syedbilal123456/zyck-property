import { AreaType } from "@prisma/client";

interface Contact {
  email: string;
  name: string;
  phone: string;
}

export interface Features {
  area: number;
  areaType:AreaType
  bathrooms: number;
  bedrooms: number;
  hasBalcony: boolean;
  hasGarage: boolean;
  hasGarden: boolean;
  hasPool: boolean;
  hasGardenYard: boolean;
  hasSwimmingPool: boolean;
  parkingSpots: number;
  propertyId: number;
}

export interface PriceRange {
  minPrice: number;
  maxPrice: number;
  projectId: string;
}

export interface AuthorizedAgent {
  email: string;
  phone: string;
  projectId: string;
}

export interface Project {
  id: string;
  name: string;
  developerName: string;
  projectType: 'RESIDENTIAL' | 'COMMERCIAL' | 'MIXED_USE';
  projectStatus: 'ONGOING' | 'COMPLETED' | 'UPCOMING';
  launchDate: string;
  expectedCompletion?: string;
  city: string;
  area: string;
  googleMapsLink?: string;
  nearbyLandmarks: string[];
  availableUnits: ('APARTMENTS' | 'VILLAS' | 'SHOPS' | 'OFFICES' | 'PLOTS')[];
  sizesAndLayouts: string[];
  paymentPlan: 'INSTALLMENTS' | 'FULL_PAYMENT';
  basicAmenities: string[];
  luxuryFeatures: string[];
  nearbyFacilities: string[];
  masterPlan?: string;
  rendersAndPlans: string[];
  siteImagesVideos: string[];
  governmentApprovals: string[];
  registrationDetails?: string;
  developerPhone: string;
  bookingProcedure: string;
  priceRange?: PriceRange;
  authorizedAgents: AuthorizedAgent[];
}

interface Images {
  id: number;
  url: string;
  propertyId: number;
}

interface Location {
  city: {
    id: number;
    value: string;
    stateId: number;
  };
  stateId: number;
}

export interface Property {
  price: string;
  description: string;
  name: string;
  feature: Features;
  status: {
    id:number
    value: string;
  };
  type: {
    value: string;
  };
  images: Images[];
  location: Location;
  contact: Contact;
}

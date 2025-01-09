
 export interface Images {
    id: number;
    url: string;
    propertyId: number;
  }
  
   export interface Contact {
    email: string
    name: string
    phone : string
  }
  
   export interface Features {
    area: number;
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
  
   export interface Cards {
    price : string
    description : string
    name : string
    feature : Features
    status : {
      value : string
    }
    type : {
      value : string
    }
    images : Images[]
    location : {
      city : string
      region : string
      state : string
    }
    contact : Contact
  
  }
  
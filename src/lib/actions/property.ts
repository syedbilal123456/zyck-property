"use server";

import { AddPropertyInputType } from "@/app/user/properties/add/_components/AddPropertyForm";
import {prisma} from "../prisma";
import { Property } from "@prisma/client";

export async function saveProperty(
  propertyData: AddPropertyInputType,
  imagesUrls: string[],
  userId: string
) {
  const basic: Omit<Property, "id"> = {
    createdAt : propertyData.createdAt,
    name: propertyData.name,
    description: propertyData.description,
    price: propertyData.price,
    statusId: propertyData.statusId,
    typeId: propertyData.typeId,
    DetailId: propertyData.DetailId,
    userId,
  };
  const result = await prisma.property.create({
    data: {
      ...basic,
      location: {
        create: {
          ...propertyData.location,
          city: {
            connect: { id: parseInt(propertyData.location.city) }
          },
          state: {
            connect: { id: parseInt(propertyData.location.state) }
          }
        },
      },
      feature: {
        create: propertyData.propertyFeature,
      },
      contact: {
        create: propertyData.contact,
      },
      images: {
        create: imagesUrls.map((img) => ({
          url: img,
        })),
      },
    },
  });
  return result;
}

export async function editProperty(
  propertyId: number,
  propertyData: AddPropertyInputType,
  newImagesUrls: string[],
  deletedImageIDs: number[]
) {
  const result = await prisma.property.update({
    where: {
      id: propertyId,
    },
    data: {
      name: propertyData.name,
      price: propertyData.price,
      statusId: propertyData.statusId,
      typeId: propertyData.typeId,
      description: propertyData.description,
      DetailId: propertyData.DetailId,
      contact: {
        update: {
          ...propertyData.contact,
        },
      },
      feature: {
        update: {
          ...propertyData.propertyFeature,
        },
      },
      location: {
        update: {
          ...propertyData.location,
          city: {
            connect: { id: parseInt(propertyData.location.city) }
          },
          state: {
            connect: { id: parseInt(propertyData.location.state) }
          }
        },
      },
      images: {
        create: newImagesUrls.map((img) => ({
          url: img,
        })),
        deleteMany: {
          id: { in: deletedImageIDs },
        },
      },
    },
  });

  console.log({ result });
  return result;
}


// export async function getProperty(id: number){
//   const result = await prisma.property.findUnique({
//     where: { id },
//     include: {
//       type : true,
//       images : true,
//       status: true,
//       feature: true,
//     }
//   })
//   return result;
// }
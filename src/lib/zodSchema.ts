import { AreaType } from "@prisma/client";
import validator from "validator";
import { z } from "zod";

export const AddPropertyFormSchema = z.object({
  name: z.string().min(1, "Please Enter The Name"),
  description: z.string().min(2, "Enter the description"),
  DetailId: z
  .string()
  .min(1, "Select the Details for your Type")
  .transform((data: unknown) => Number(data)),
  typeId: z
    .string()
    .min(1, "Select the type of your property")
    .transform((data: unknown) => Number(data)),
  statusId: z
    .string()
    .min(1, "Select the status of your property")
    .transform((data: unknown) => Number(data)),
  price: z
    .string()
    .min(1, "Enter the price")
    .regex(new RegExp("^[0-9]+$"), "Please Enter Number")
    .transform((data: unknown) => Number(data)),
  location: z.object({
    streetAddress: z.string().min(1, "Enter the street address"),
    city: z.string().min(1, "Enter the city name"),
    state: z.string().min(1, "Enter the state name")
  }),
  propertyFeature: z.object({
    bedrooms: z
      .string()
      .regex(new RegExp("^[0-9]+$"), "Please enter number of the bedrooms")
      .transform((data: unknown) => Number(data)),
    bathrooms: z
      .string()
      .regex(new RegExp("^[0-9]+$"), "Please enter number of the bathrooms")
      .transform((data: unknown) => Number(data)),
    parkingSpots: z
      .string()
      .regex(new RegExp("^[0-9]+$"), "Please enter number of the parking spots")
      .transform((data: unknown) => Number(data)),
    area: z
      .string()
      .regex(new RegExp("^[0-9]+$"), "Please enter the area")
      .transform((data: unknown) => Number(data)),
    areaType: z.nativeEnum(AreaType),
    hasSwimmingPool: z.boolean(),
    hasGardenYard: z.boolean(),
    hasBalcony: z.boolean(),
  }),
  contact: z.object({
    name: z.string().min(1, "Please enter the contact name"),
    phone: z.string().refine(validator.isMobilePhone, "Please enter a valid phone number"),
    email: z.string().email(),
  }),
});

export const AddPropertyFormSchemaReplica = z.object({
  name: z.string().min(3, {
    message: "Property name must be at least 3 characters.",
  }),
  price: z.number().min(1, {
    message: "Price must be greater than 0.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  statusId: z.string(),
  typeId: z.string(),
  DetailId: z.string().optional(),
  propertyFeature: z
    .object({
      bedrooms: z.string().optional(),
      bathrooms: z.string().optional(),
      parkingSpots: z.string().optional(),
      area: z.number().optional(),
      areaType: z.string().optional(),
      hasSwimmingPool: z.boolean().optional(),
      hasGardenYard: z.boolean().optional(),
      hasBalcony: z.boolean().optional(),
    })
    .optional(),
  location: z.object({
    state: z.string({
      required_error: "Please select a state",
    }),
    city: z.string({
      required_error: "Please select a city",
    }),
    streetAddress: z.string().optional(),
  }),
  contact: z
    .object({
      name: z.string().optional(),
      phone: z.string().optional(),
      email: z.string().email().optional(),
    })
    .optional(),
})



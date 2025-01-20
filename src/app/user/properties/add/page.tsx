import React from "react";
import AddPropertyForm from "./_components/AddPropertyForm";
import {prisma} from "@/lib/prisma";

const AddPropertyPage = async () => {
  const [propertyTypes, propertyStatuses, propertyTypeDetail] = await Promise.all([
    prisma.propertyType.findMany(),
    prisma.propertyStatus.findMany(),
    prisma.propertyTypeDetail.findMany()
  ]);
  return <AddPropertyForm types={propertyTypes} statuses={propertyStatuses} details={propertyTypeDetail} />;
};

export default AddPropertyPage;

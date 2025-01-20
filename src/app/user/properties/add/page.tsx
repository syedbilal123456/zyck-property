import React from "react";
import AddPropertyForm from "./_components/AddPropertyForm";
import {prisma} from "@/lib/prisma";

const AddPropertyPage = async () => {
  const [propertyTypes, propertyStatuses, propertyTypeDetail, Cites, State] = await Promise.all([
    prisma.propertyType.findMany(),
    prisma.propertyStatus.findMany(),
    prisma.propertyTypeDetail.findMany(),
    prisma.city.findMany(),
    prisma.state.findMany(),
  ]);
  return <AddPropertyForm state={State} city={Cites} types={propertyTypes} statuses={propertyStatuses} details={propertyTypeDetail} />;
};

export default AddPropertyPage;

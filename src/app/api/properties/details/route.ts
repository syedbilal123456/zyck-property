import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(){

    const detailsType = await prisma.propertyTypeDetail.findMany(); // Ensure this query exists
    console.log(detailsType,"detsils types");
    
    return NextResponse.json(detailsType);
}
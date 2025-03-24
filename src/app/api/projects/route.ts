// import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { NextRequest,NextResponse } from "next/server";

const prisma = new PrismaClient();

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   switch (req.method) {
//     case "POST":
//       return createProject(req, res);
//     case "GET":
//       return getProjects(req, res);
//     default:
//       return res.status(405).json({ message: "Method not allowed" });
//   }
// }


// ✅ POST Method (Create Project)
export async function POST(req: NextRequest) {
  // try {
    const body = await req.json();
    console.log("Received Data:", body); // Debugging log

    // Check if priceRange is available
    if (!body.priceRange) {
      console.log("❌ priceRange MISSING!");
    }

    // Check if authorizedAgents is available
    if (!body.authorizedAgents) {
      console.log("❌ authorizedAgents MISSING!");
    }

    if (!body || Object.keys(body).length === 0) {
      return NextResponse.json({ error: "Empty request body" }, { status: 400 });
    }
    
    // ✅ Step 1: Project Insert
    const project = await prisma.project.create({
      data: {
        name: body.projectName,
        developerName: body.developerName,
        projectType: body.projectType,
        projectStatus: body.projectStatus,
        launchDate: new Date(body.launchDate),
        expectedCompletion: new Date(body.expectedCompletion),

        city: body.city,
        area: body.area,
        googleMapsLink: body.googleMapsUrl || null,
        nearbyLandmarks: body.landmarks ? [body.marks] : [], 

        availableUnits: body.propertyTypes || [],
        sizesAndLayouts: Array.isArray(body.sizes) ? body.sizes : [body.sizes],
        paymentPlan: body.paymentPlan || null,

        basicAmenities: body.basicAmenities || [],
        luxuryFeatures: body.luxuryFeatures || [],
        nearbyFacilities: body.nearbyFacilities || null,

        masterPlan: body.masterPlan || null,
        rendersAndPlans: body.rendersAndPlans || [],
        siteImagesVideos: body.siteImagesVideos || [],

        governmentApprovals: body.approvalStatus ? [body.approvalStatus] : [],
        registrationDetails: body.registrationDetails || null,

        developerPhone: body.contactPhone,
        bookingProcedure: body.bookingProcedure,
      },
    });

    // ✅ Step 2: PriceRange Insert (Alag se)
    try {
      if (body.priceRange) {
        await prisma.priceRange.create({
          data: {
            projectId: project.id,
            minPrice: body.priceRangeStart ? parseFloat(body.priceRangeStart) : 0,
            maxPrice: body.priceRangeEnd ? parseFloat(body.priceRangeEnd) : 0,
          },
        });
      }
    } catch (error) {
      console.error("Prisma Error (PriceRange Create):", error);
    }
       

    // ✅ Step 3: Authorized Agents Insert (Agar available hain)
    if (body.authorizedAgents?.length > 0) {
      await prisma.authorizedAgent.createMany({
        data: body.authorizedAgents.map((agent: any) => ({
          projectId: project.id,
          email: agent.email,
          phone: agent.phone,
        })),
      });
    }

    return NextResponse.json({ message: "Project Created Successfully!", project }, { status: 201 });

  // } 
  // catch (error) {
  //   console.error("Database Error:", error);
  //   return NextResponse.json({ error: "Error creating project", details: error }, { status: 500 });
  // }
}


// ✅ GET Method (Fetch Projects)
export async function GET() {
  try {
    const projects = await prisma.project.findMany();
    return NextResponse.json(projects, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error fetching projects" }, { status: 500 });
  }
}

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
  try {
    const body = await req.json();
    
    // ✅ Step 1: Project Insert
    const project = await prisma.project.create({
      data: {
        name: body.name,
        developerName: body.developerName,
        projectType: body.projectType,
        projectStatus: body.projectStatus,
        launchDate: new Date(body.launchDate),
        expectedCompletion: new Date(body.expectedCompletion),

        city: body.city,
        area: body.area,
        googleMapsLink: body.googleMapsLink,
        nearbyLandmarks: body.nearbyLandmarks,

        availableUnits: body.availableUnits,
        sizesAndLayouts: body.sizesAndLayouts,
        paymentPlan: body.paymentPlan,

        basicAmenities: body.basicAmenities,
        luxuryFeatures: body.luxuryFeatures,
        nearbyFacilities: body.nearbyFacilities,

        masterPlan: body.masterPlan,
        rendersAndPlans: body.rendersAndPlans,
        siteImagesVideos: body.siteImagesVideos,

        governmentApprovals: body.governmentApprovals,
        registrationDetails: body.registrationDetails,

        developerPhone: body.developerPhone,
        bookingProcedure: body.bookingProcedure,
      },
    });

    // ✅ Step 2: PriceRange Insert (Alag se)
    if (body.priceRange) {
      await prisma.priceRange.create({
        data: {
          projectId: project.id,
          minPrice: body.priceRange.minPrice,
          maxPrice: body.priceRange.maxPrice,
        },
      });
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

  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ error: "Error creating project", details: error }, { status: 500 });
  }
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

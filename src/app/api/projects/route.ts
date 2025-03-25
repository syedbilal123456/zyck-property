import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { useKindeAuth, useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';

const prisma = new PrismaClient();

// Define enums for validation
const ProjectType = {
  RESIDENTIAL: 'RESIDENTIAL',
  COMMERCIAL: 'COMMERCIAL',
  MIXED_USE: 'MIXED_USE'
};

const ProjectStatus = {
  ONGOING: 'ONGOING',
  COMPLETED: 'COMPLETED',
  UPCOMING: 'UPCOMING'
};

const PropertyUnit = {
  APARTMENTS: 'APARTMENTS',
  VILLAS: 'VILLAS',
  SHOPS: 'SHOPS',
  OFFICES: 'OFFICES',
  PLOTS: 'PLOTS'
};

const PaymentPlan = {
  INSTALLMENTS: 'INSTALLMENTS',
  FULL_PAYMENT: 'FULL_PAYMENT'
};

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate required fields
    const requiredFields = [
      'name',
      'developerName',
      'projectType',
      'projectStatus',
      'launchDate',
      'city',
      'area',
      'nearbyLandmarks',
      'availableUnits',
      'sizesAndLayouts',
      'paymentPlan',
      'basicAmenities',
      'luxuryFeatures',
      'nearbyFacilities',
      'developerPhone',
      'authorizedAgents',
      'bookingProcedure'
    ];

    const missingFields = requiredFields.filter(field => !body[field]);
    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: 'Missing required fields', missingFields },
        { status: 400 }
      );
    }

    // Validate enums
    const validProjectTypes = Object.values(ProjectType);
    if (!validProjectTypes.includes(body.projectType)) {
      return NextResponse.json(
        { error: 'Invalid project type', validOptions: validProjectTypes },
        { status: 400 }
      );
    }

    const validProjectStatuses = Object.values(ProjectStatus);
    if (!validProjectStatuses.includes(body.projectStatus)) {
      return NextResponse.json(
        { error: 'Invalid project status', validOptions: validProjectStatuses },
        { status: 400 }
      );
    }

    const validPaymentPlans = Object.values(PaymentPlan);
    if (!validPaymentPlans.includes(body.paymentPlan)) {
      return NextResponse.json(
        { error: 'Invalid payment plan', validOptions: validPaymentPlans },
        { status: 400 }
      );
    }

    // Validate property units
    const validPropertyUnits = Object.values(PropertyUnit);
    const invalidUnits = body.availableUnits.filter(
      (unit: string) => !validPropertyUnits.includes(unit)
    );
    if (invalidUnits.length > 0) {
      return NextResponse.json(
        { error: 'Invalid property units', invalidUnits, validOptions: validPropertyUnits },
        { status: 400 }
      );
    }

    // Validate dates
    const launchDate = new Date(body.launchDate);
    if (isNaN(launchDate.getTime())) {
      return NextResponse.json({ error: 'Invalid launch date' }, { status: 400 });
    }

    let expectedCompletion = null;
    if (body.expectedCompletion) {
      expectedCompletion = new Date(body.expectedCompletion);
      if (isNaN(expectedCompletion.getTime())) {
        return NextResponse.json({ error: 'Invalid expected completion date' }, { status: 400 });
      }
    }

    // Validate price range if provided
    if (body.priceRange) {
      if (typeof body.priceRange.minPrice !== 'number' || 
          typeof body.priceRange.maxPrice !== 'number') {
        return NextResponse.json(
          { error: 'Price range must contain numeric values' },
          { status: 400 }
        );
      }
      if (body.priceRange.minPrice < 0 || body.priceRange.maxPrice < 0) {
        return NextResponse.json(
          { error: 'Prices cannot be negative' },
          { status: 400 }
        );
      }
      if (body.priceRange.minPrice > body.priceRange.maxPrice) {
        return NextResponse.json(
          { error: 'Minimum price cannot be greater than maximum price' },
          { status: 400 }
        );
      }
    }

    // Validate authorized agents
    if (!Array.isArray(body.authorizedAgents) || body.authorizedAgents.length === 0) {
      return NextResponse.json(
        { error: 'At least one authorized agent is required' },
        { status: 400 }
      );
    }

    const invalidAgents = body.authorizedAgents.filter(
      (agent: any) => !agent.email || !agent.phone
    );
    if (invalidAgents.length > 0) {
      return NextResponse.json(
        {
          error: 'Authorized agents must have both email and phone',
          invalidAgents
        },
        { status: 400 }
      );
    }

    // Create the project with transaction to ensure all data is saved correctly
    const result = await prisma.$transaction(async (prisma) => {
      // Create the project first
      const project = await prisma.project.create({
        data: {
          name: body.name,
          developerName: body.developerName,
          projectType: body.projectType,
          projectStatus: body.projectStatus,
          launchDate: launchDate,
          expectedCompletion: expectedCompletion,
          city: body.city,
          area: body.area,
          googleMapsLink: body.googleMapsLink || null,
          nearbyLandmarks: body.nearbyLandmarks,
          availableUnits: body.availableUnits,
          sizesAndLayouts: body.sizesAndLayouts,
          paymentPlan: body.paymentPlan,
          basicAmenities: body.basicAmenities,
          luxuryFeatures: body.luxuryFeatures,
          nearbyFacilities: body.nearbyFacilities,
          masterPlan: body.masterPlan || null,
          rendersAndPlans: body.rendersAndPlans || [],
          siteImagesVideos: body.siteImagesVideos || [],
          governmentApprovals: body.governmentApprovals || [],
          registrationDetails: body.registrationDetails || null,
          developerPhone: body.developerPhone,
          bookingProcedure: body.bookingProcedure
        }
      });

      // Create price range if provided
      if (body.priceRange) {
        await prisma.priceRange.create({
          data: {
            minPrice: body.priceRange.minPrice,
            maxPrice: body.priceRange.maxPrice,
            projectId: project.id
          }
        });
      }

      // Create authorized agents
      await prisma.authorizedAgent.createMany({
        data: body.authorizedAgents.map((agent: any) => ({
          email: agent.email,
          phone: agent.phone,
          projectId: project.id
        }))
      });

      return project;
    });

    // Fetch the complete project with all relations to return
    const createdProject = await prisma.project.findUnique({
      where: { id: result.id },
      include: {
        priceRange: true,
        authorizedAgents: true
      }
    });

    return NextResponse.json(createdProject, { status: 201 });
  } catch (error: any) {
    console.error('Error creating project:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}

// You can also add other HTTP methods like GET, PUT, DELETE as named exports
export async function GET() {
  try {
    const data = await prisma.project.findMany({
      select: {
        area: true,
        authorizedAgents: true,
        availableUnits: true,
        basicAmenities: true,
        bookingProcedure: true,
        city: true,
        developerName: true,
        developerPhone: true,
        expectedCompletion: true,
        googleMapsLink: true,
        governmentApprovals: true,
        id: true,
        launchDate: true,
        luxuryFeatures: true,
        masterPlan: true,
        nearbyFacilities: true,
        nearbyLandmarks: true,
        paymentPlan: true,
        priceRange: true,
        projectStatus: true,
        projectType: true,
        registrationDetails: true,
        rendersAndPlans: true,
        siteImagesVideos: true,
        sizesAndLayouts: true,
        name: true
      }
    });

    if (!data || data.length === 0) {
      return NextResponse.json(
        { error: 'No projects found' },
        { status: 404 }
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}
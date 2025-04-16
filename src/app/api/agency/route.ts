// import { NextResponse } from 'next/server';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// export async function POST(req: { json: () => any; }) {
//   try {
//     const body = await req.json();
//     if (!body || typeof body !== 'object') {
//       return NextResponse.json({ error: 'Invalid request payload' }, { status: 400 });
//     }

//     const {
//       name,
//       logo,
//       tagline,
//       establishedYear,
//       agencyType,
//       officeAddress,
//       phoneNumber,
//       email,
//       website,
//       socialMedia,
//       registrationNumber,
//       license,
//       areasCovered,
//       totalAgents,
//       servicesOffered,
//       totalListings,
//       propertyTypes,
//       exclusive,
//       listingLink,
//       testimonials,
//       overallRating,
//       responseTime,
//       businessCertificate,
//       verificationStatus,
//     } = body;

//     if (!name || !establishedYear || !agencyType || !officeAddress || !phoneNumber || !email || !areasCovered?.length || !totalAgents || !servicesOffered?.length || !totalListings || !propertyTypes?.length || !responseTime) {
//       return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
//     }

//     const agency = await prisma.agency.create({
//       data: {
//         name,
//         logo: logo || null,
//         tagline: tagline || null,
//         establishedYear,
//         agencyType,
//         officeAddress,
//         phoneNumber,
//         email,
//         website: website || null,
//         socialMedia: socialMedia || null,
//         registrationNumber: registrationNumber || null,
//         license: license || null,
//         areasCovered,
//         totalAgents,
//         servicesOffered,
//         totalListings,
//         propertyTypes,
//         exclusive,
//         listingLink: listingLink || null,
//         testimonials: testimonials || [],
//         overallRating: overallRating || 0.0,
//         responseTime,
//         businessCertificate: businessCertificate || null,
//         verificationStatus: verificationStatus || 'PENDING',
//       },
//     });

//     return NextResponse.json({ success: true, agency }, { status: 201 });
//   } catch (error) {
//     console.error('Error creating agency:', error);
//     return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
//   }
// }

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // adjust path if needed

export async function POST(req: NextRequest) {
  const body = await req.json();

  const {
    id,
    name,
    logo,
    tagline,
    establishedYear,
    agencyType,
    officeAddress,
    phoneNumber,
    email,
    website,
    socialMedia,
    registrationNumber,
    license,
    areasCovered,
    totalAgents,
    servicesOffered,
    totalListings,
    propertyTypes,
    propertyDetails,
    exclusive,
    listingLink,
    testimonials,
    overallRating,
    responseTime,
    businessCertificate,
    verificationStatus
 } = body;

  if (!id) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id }
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const agency = await prisma.agency.create({
      data: {
        name: name,
        logo: logo,
        tagline,
        establishedYear : parseInt(establishedYear),
        agencyType,
        officeAddress,
        phoneNumber,
        email: email,
        website,
        socialMedia: {
          create: {
            facebook: socialMedia.facebook,
            instagram: socialMedia.instagram,
            linkedin: socialMedia.linkedin,
          }
        },
        registrationNumber,
        license : license,
        areasCovered,
        totalAgents: parseInt(totalAgents),
        servicesOffered,
        totalListings: parseInt(totalListings),
        propertyTypes: propertyTypes,
        exclusive: exclusive,
        listingLink: listingLink,
        testimonials,
        overallRating: parseFloat(overallRating),
        responseTime,
        businessCertificate : businessCertificate,
        verificationStatus,
        propertyDetails : propertyDetails,
        user: {
          connect: { id }
        }
      }
    });

    return NextResponse.json({ message: "Agency created successfully", agency }, { status: 201 });
  } catch (error) {
    console.error("Error creating agency:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

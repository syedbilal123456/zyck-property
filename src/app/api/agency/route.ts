import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: { json: () => any; }) {
  try {
    const body = await req.json();
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'Invalid request payload' }, { status: 400 });
    }

    const {
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
      exclusive,
      listingLink,
      testimonials,
      overallRating,
      responseTime,
      businessCertificate,
      verificationStatus,
    } = body;

    if (!name || !establishedYear || !agencyType || !officeAddress || !phoneNumber || !email || !areasCovered?.length || !totalAgents || !servicesOffered?.length || !totalListings || !propertyTypes?.length || !responseTime) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const agency = await prisma.agency.create({
      data: {
        name,
        logo: logo || null,
        tagline: tagline || null,
        establishedYear,
        agencyType,
        officeAddress,
        phoneNumber,
        email,
        website: website || null,
        socialMedia: socialMedia || null,
        registrationNumber: registrationNumber || null,
        license: license || null,
        areasCovered,
        totalAgents,
        servicesOffered,
        totalListings,
        propertyTypes,
        exclusive,
        listingLink: listingLink || null,
        testimonials: testimonials || [],
        overallRating: overallRating || 0.0,
        responseTime,
        businessCertificate: businessCertificate || null,
        verificationStatus: verificationStatus || 'PENDING',
      },
    });

    return NextResponse.json({ success: true, agency }, { status: 201 });
  } catch (error) {
    console.error('Error creating agency:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
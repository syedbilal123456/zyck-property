// src/app/api/agents/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient, Specialization, VerificationStatus, ServiceType } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

// Input validation schema
const AgentCreateSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  profilePicture: z.string().url('Invalid URL format').optional(),
  agentType: z.enum(['Individual Agent', 'Agency Representative']),
  experience: z.string().min(1, 'Experience is required'),
  specialization: z.array(z.nativeEnum(Specialization)).nonempty('At least one specialization is required'),
  phoneNumber: z.string().min(10, 'Phone number must be at least 10 digits'),
  email: z.string().email('Invalid email format'),
  officeAddress: z.string().optional(),
  socialMediaLinks: z.object({
    facebook: z.string().url('Invalid Facebook URL').optional(),
    instagram: z.string().url('Invalid Instagram URL').optional(),
    linkedin: z.string().url('Invalid LinkedIn URL').optional(),
  }).optional(),
  agencyName: z.string().optional(),
  agencyLogo: z.string().url('Invalid URL format').optional(),
  agencyRegNumber: z.string().optional(),
  areasCovered: z.array(z.string()).nonempty('At least one area covered is required'),
  servicesOffered: z.array(z.nativeEnum(ServiceType)).nonempty('At least one service is required'),
  totalListings: z.number().int().nonnegative().default(0),
  listingLink: z.string().url('Invalid URL format').optional(),
  testimonials: z.array(z.string()).default([]),
  responseTime: z.string().min(1, 'Response time is required'),
  licenseCertificate: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = AgentCreateSchema.parse(body);

    // Check if email already exists
    const existingAgent = await prisma.agent.findUnique({
      where: { email: validatedData.email },
    });

    if (existingAgent) {
      return NextResponse.json(
        { message: 'Agent with this email already exists' },
        { status: 409 }
      );
    }

    // Create agent and social media links in a transaction
    const result = await prisma.$transaction(async (prisma) => {
      const agent = await prisma.agent.create({
        data: {
          fullName: validatedData.fullName,
          profilePicture: validatedData.profilePicture,
          agentType: validatedData.agentType,
          experience: validatedData.experience,
          specialization: validatedData.specialization,
          phoneNumber: validatedData.phoneNumber,
          email: validatedData.email,
          officeAddress: validatedData.officeAddress,
          agencyName: validatedData.agencyName,
          agencyLogo: validatedData.agencyLogo,
          agencyRegNumber: validatedData.agencyRegNumber,
          areasCovered: validatedData.areasCovered,
          servicesOffered: validatedData.servicesOffered,
          totalListings: validatedData.totalListings,
          listingLink: validatedData.listingLink,
          testimonials: validatedData.testimonials,
          responseTime: validatedData.responseTime,
          licenseCertificate: validatedData.licenseCertificate,
          approvalStatus: VerificationStatus.PENDING,
        },
      });

      if (validatedData.socialMediaLinks) {
        await prisma.socialMediaLinks.create({
          data: {
            agentId: agent.id,
            facebook: validatedData.socialMediaLinks.facebook,
            instagram: validatedData.socialMediaLinks.instagram,
            linkedin: validatedData.socialMediaLinks.linkedin,
          },
        });
      }

      return agent;
    });

    return NextResponse.json(
      { message: 'Agent created successfully', data: result },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: 'Validation error', errors: error.errors },
        { status: 400 }
      );
    }

    console.error('Error creating agent:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Export other HTTP methods as needed
export async function GET() {
  return NextResponse.json(
    { message: 'Method not allowed' },
    { status: 405 }
  );
}

export async function PUT() {
  return NextResponse.json(
    { message: 'Method not allowed' },
    { status: 405 }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { message: 'Method not allowed' },
    { status: 405 }
  );
}
import { NextResponse } from "next/server"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"

// This would be replaced with your actual database client
// import { db } from '@/lib/db';

export async function POST(request: Request) {
  try {
    // Get the authenticated user
    const { getUser } = getKindeServerSession()
    const user = await getUser()

    if (!user || !user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Parse the request body
    const data = await request.json()

    // Handle file data properly
    // For file uploads, you should be using a separate API or service like Cloudinary/S3
    // Here we're just storing the file names or references
    const formattedData = {
      fullName: data.fullName,
      profilePicture: data.profilePicture
        ? data.profilePicture.split(",")[0].includes("base64")
          ? "profile-image-uploaded"
          : data.profilePicture
        : null,
      agentType: data.agentType,
      experience: data.experience,
      specialization: data.specialization,
      phoneNumber: data.phoneNumber,
      email: data.email,
      officeAddress: data.officeAddress,
      agencyName: data.agencyName,
      agencyLogo: data.agencyLogo
        ? data.agencyLogo.split(",")[0].includes("base64")
          ? "agency-logo-uploaded"
          : data.agencyLogo
        : null,
      agencyRegNumber: data.agencyRegNumber,
      areasCovered: data.areasCovered,
      servicesOffered: data.servicesOffered,
      totalListings: data.totalListings,
      listingLink: data.listingLink,
      testimonials: Array.isArray(data.testimonials)
        ? data.testimonials
        : data.testimonials.split("\n").filter((t: string) => t.trim() !== ""),
      overallRating: data.overallRating,
      responseTime: data.responseTime,
      cnicVerification: data.cnicVerification,
      licenseCertificate: data.licenseCertificate
        ? data.licenseCertificate.split(",")[0].includes("base64")
          ? "license-uploaded"
          : data.licenseCertificate
        : null,
      approvalStatus: "PENDING",
      userId: user.id,
    }

    // Create social media links object
    const socialMediaLinks = {
      facebook: data.facebook,
      instagram: data.instagram,
      linkedin: data.linkedin,
    }

    // Here you would typically save to your database
    // Example with Prisma:
    // const agent = await db.agent.create({
    //   data: {
    //     ...formattedData,
    //     socialMediaLinks: {
    //       create: socialMediaLinks
    //     }
    //   }
    // });

    console.log("Agent data to be saved:", {
      ...formattedData,
      socialMediaLinks,
    })

    // Return a clean response
    return NextResponse.json(
      {
        message: "Agent registration submitted successfully",
        agent: {
          id: "temp-id", // This would be the actual ID from your database
          ...formattedData,
          socialMediaLinks,
        },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error creating agent:", error)
    return NextResponse.json({ error: "Failed to create agent" }, { status: 500 })
  }
}

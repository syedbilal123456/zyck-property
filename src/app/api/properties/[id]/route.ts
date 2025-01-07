import { prisma } from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

// GET properties by id :
 export async function GET(req : Request, { params }: { params: Promise<{ id: string }> } ){
    const id = (await params).id
    try {
        const property = await prisma.property.findUnique({
            where: { id: parseInt(id)},
            include:{
                type: true,
                status: true,
                location: true,
                feature: true,
                images: true,
                contact: true,
            },
        });

        if (!property) {
            return NextResponse.json({error: "Property not found"}, {status: 404});
        }
        return NextResponse.json(property);
    } catch (error) {
        return NextResponse.json({error: "Error Fetching property"}, {status: 500});
    }
 }

//  Delete property by id

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || !user.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const id = params.id;

  try {
    const property = await prisma.property.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!property) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 });
    }

    if (property.userId !== user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    await prisma.property.delete({
      where: {
        id: parseInt(id),
      },
    });

    return NextResponse.json({ message: "Property deleted successfully" });
  } catch (error) {
    console.error("Error deleting property:", error);
    return NextResponse.json(
      { error: "Error deleting property" },
      { status: 500 }
    );
  }
}

// Edit Property
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || !user.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const id = params.id;

  try {
    const property = await prisma.property.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!property) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 });
    }

    if (property.userId !== user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const body = await req.json();
    const { propertyData, newImagesUrls, deletedImageIDs } = body;

    const updatedProperty = await prisma.property.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name: propertyData.name,
        price: propertyData.price,
        statusId: propertyData.statusId,
        typeId: propertyData.typeId,
        description: propertyData.description,
        contact: {
          update: {
            ...propertyData.contact,
          },
        },
        feature: {
          update: {
            ...propertyData.propertyFeature,
          },
        },
        location: {
          update: {
            ...propertyData.location,
          },
        },
        images: {
          create: newImagesUrls.map((img: string) => ({
            url: img,
          })),
          deleteMany: {
            id: { in: deletedImageIDs },
          },
        },
      },
    });

    return NextResponse.json(updatedProperty);
  } catch (error) {
    console.error("Error updating property:", error);
    return NextResponse.json(
      { error: "Error updating property" },
      { status: 500 }
    );
  }
}

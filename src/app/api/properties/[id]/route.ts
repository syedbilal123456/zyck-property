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
export async function DELETE(req : Request,{ params }: { params: Promise<{ id: string }> } ){

    const {getUser} = getKindeServerSession()
    const user = await getUser();
    const id = (await params).id

    if (!user.id) {
        return NextResponse.json({error: "Unauthorized"}, {status: 401});
    }

    try {
        await prisma.property.delete({
            where :{
                id :  parseInt(id),
                userId : user.id,
            }
        });
        return NextResponse.json({message : "Property Deleted Successfully"});

    }catch (error) {
        return NextResponse.json({error: "Error Deleting property"}, {status: 500});
    }
}
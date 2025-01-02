import { prisma } from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";


// Fetching Properties API
export async function GET(req: Request){
    try {
        const { searchParams } = new URL(req.url);
        const typeId = searchParams.get('typeId');
        const statusId = searchParams.get('statusId');
        const minPrice = searchParams.get('minPrice');
        const maxPrice = searchParams.get('maxPrice');

        const whereClause: any = {};
        if(typeId)  whereClause.typeId = parseInt(typeId);
        if(statusId)  whereClause.statusId = parseInt(statusId);    
        if(minPrice)  whereClause.price = parseInt(minPrice);    
        if(maxPrice)  whereClause.price =  parseInt(maxPrice);

        const properties = await prisma.property.findMany({
            where: whereClause,
            include: {
                type: true,
                status: true,
                location: true,
                feature: true,
                images: true,
                contact: true
            }
        })
        return NextResponse.json(properties) 
    } catch (error) {
        return NextResponse.json({error: "Error Fetching Properties"}, {status: 404})
    }
}

// Creating Property API

export async function POST(req: Request){
    // const {getUser} = getKindeServerSession();
    // const user = await getUser();

    const user = {
        id: "test-user-id",
        email: "testuser@example.com",
    };
    if (!user?.id) {
        return NextResponse.json({error: "unauthorized"}, {status: 402})
    }
    try {
        const json = await req.json();
        const subscription = await prisma.subscriptions.findFirst({
            where: {userId: user.id},
            include: {plan: true}
        });

        if(!subscription){
            return NextResponse.json({error: "unauthorized"}, {status: 403})
        }

        const propertyCount = await prisma.property.count({
            where: {userId: user.id}
        });

        if(propertyCount >= subscription.plan.propertyLimit){
            return NextResponse.json({error: "Property Limit Exceeded"}, {status: 404})
        }

        const property = await prisma.property.create({
        data: {
            name: json.name,
            price: json.price,
            typeId: json.typeId,
            statusId: json.statusId,
            userId: user.id,
            description: json.description,
            location:{ create: json.location },
            feature:{ create: json.feature },
            contact:{ create: json.contact }
        },
        include: {
            location: true,
            feature: true,
            contact: true
        },
        })
        return NextResponse.json(property)
    } catch (error) {
        return NextResponse.json({error: "Error Creating Property"}, {status: 405})
    }
}
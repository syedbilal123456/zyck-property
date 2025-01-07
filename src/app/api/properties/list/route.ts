import { prisma } from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextApiRequest, NextApiResponse } from "next";

const PAGE_SIZE = 12;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { getUser } = await getKindeServerSession();
    const user = await getUser();

    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { pagenum = 0 } = req.query;

    const propertiesPromise = prisma.property.findMany({
      where: {
        userId: user.id,
      },
      include: {
        type: true,
        status: true,
        images: true,
      },
      skip: +pagenum * PAGE_SIZE,
      take: PAGE_SIZE,
    });

    const totalPropertiesPromise = prisma.property.count({
      where: {
        userId: user.id,
      },
    });

    const [properties, totalProperties] = await Promise.all([
      propertiesPromise,
      totalPropertiesPromise,
    ]);

    const totalPages = Math.ceil(totalProperties / PAGE_SIZE);

    res.status(200).json({ properties, totalPages, currentPage: +pagenum });
  } catch (error) {
    console.error("Error fetching properties:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

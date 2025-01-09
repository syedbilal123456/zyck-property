import {prisma} from "@/lib/prisma";
import AddPropertyForm from "../../add/_components/AddPropertyForm";
import { notFound, redirect } from "next/navigation";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

interface Props {
<<<<<<< HEAD
  params: { id: string };
}
=======
   params: Promise<{ id: string }>
    }
>>>>>>> main

const EditPropertyPage = async ({ params }: Props) => {
  const [propertyTypes, propertyStatuses, property] = await Promise.all([
    prisma.propertyType.findMany(),
    prisma.propertyStatus.findMany(),
    prisma.property.findUnique({
      where: {
<<<<<<< HEAD
        id: +params.id,
=======
        id: +(await params).id,
>>>>>>> main
      },
      include: {
        location: true,
        feature: true,
        contact: true,
        images: true,
      },
    }),
  ]);

  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!property) return notFound();
  if (!user || property.userId !== user.id) redirect("/unauthorized");
  return (
    <AddPropertyForm
      types={propertyTypes}
      statuses={propertyStatuses}
      property={property}
      isEdit={true}
    />
  );
};

export default EditPropertyPage;

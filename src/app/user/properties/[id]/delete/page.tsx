// import {prisma} from "@/lib/prisma";
// import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
// import { notFound, redirect } from "next/navigation";
// import Link from "next/link";
// import { Button } from "@nextui-org/react";
// import { deleteProperty } from "@/lib/actions/property";
// import SubmitButton from "@/components/ui/SubmitButton";


// interface Props {
//   params: { id: string };
// }

// async function DeletePropertyPage({ params }: Props) {
//   const { getUser } = getKindeServerSession();
  
//   // Directly unwrap params using await
//   const propertyId = Number(params.id);

//   // Fetch user and property data server-side
//   const propertyPromise = prisma.property.findUnique({
//     where: {
//       id: propertyId,
//     },
//   });

//   const [property, user] = await Promise.all([propertyPromise, getUser()]);

//   if (!property) return notFound();
//   if (!user || property.userId !== user.id) redirect("/unauthorized");

//   const handleDelete = async () => {
//     try {
//       await deleteProperty(propertyId); // Delete using the property ID
//       redirect("/user/properties"); // Redirect after deletion
//     } catch (error) {
//       console.error("Error deleting property", error);
//     }
//   };

//   return (
//     <form
//       action={handleDelete}
//       method="POST"
//       className="mt-9 flex flex-col items-center justify-center gap-3"
//     >
//       <p>Are you sure you want to delete this property?</p>
//       <p>
//         <span className="text-slate-400">Name:</span>{" "}
//         <span className="text-slate-700">{property.name}</span>
//       </p>
//       <div className="flex justify-center gap-3">
//         <Link href="/user/properties">
//           <Button>Cancel</Button>
//         </Link>
//         <SubmitButton type="submit" color="danger">
//           Delete
//         </SubmitButton>
//       </div>
//     </form>
//   );
// }

// export default DeletePropertyPage;


import { prisma } from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { deleteProperty } from "@/lib/actions/property";

interface Props {
  params: { id: string };
}

async function DeletePropertyPage({ params }: Props) {
  const { getUser } = getKindeServerSession();

  // Fetch property and user data
  const propertyId = Number(params.id);
  const propertyPromise = prisma.property.findUnique({
    where: { id: propertyId },
  });

  const [property, user] = await Promise.all([propertyPromise, getUser()]);

  if (!property) return notFound();
  if (!user || property.userId !== user.id) redirect("/unauthorized");

  const handleDelete = async () => {
    try {
      await deleteProperty(propertyId);
      redirect("/user/properties");
    } catch (error) {
      console.error("Error deleting property", error);
    }
  };

  return (
    <form
      action={handleDelete}
      method="POST"
      className="mt-9 flex flex-col items-center justify-center gap-4"
    >
      <p className="text-lg text-center font-semibold">
        Are you sure you want to delete this property?
      </p>
      <p className="text-center">
        <span className="text-gray-400">Name:</span>{" "}
        <span className="text-gray-700 font-medium">{property.name}</span>
      </p>
      <div className="flex justify-center gap-4">
        <Link href="/user/properties" passHref>
          <button className="btn btn-outline">Cancel</button>
        </Link>
        <button type="submit" className="btn btn-error">
          Delete
        </button>
      </div>
    </form>
  );
}

export default DeletePropertyPage;

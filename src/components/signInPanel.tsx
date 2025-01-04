import { LoginLink, LogoutLink, RegisterLink, getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import UserProfilePanel from "./UserProfilePanel";
import {prisma} from "@/lib/prisma";
import React from "react";

const SignInPanel = async () => {
  const { isAuthenticated, getUser } = await getKindeServerSession();
  
  if (await isAuthenticated()) {
    const user = await getUser();
    const dbUser = await prisma.user.findUnique({
      where: {
        id: user?.id,
      },
    });

    return <>{dbUser && <UserProfilePanel user={dbUser} />}</>;
  }

  return (
    <div className="flex gap-3">
      <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
       <LoginLink>Sign In</LoginLink> 
      </button>
      <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400">
        <RegisterLink>Sign Up</RegisterLink>
      </button>
    </div>
  );
};

export default SignInPanel;

import {
    LoginLink,
    RegisterLink,
    getKindeServerSession,
} from "@kinde-oss/kinde-auth-nextjs/server";
import React from "react";
import UserProfilePanel from "./UserProfilePanel";
import { prisma } from "@/lib/prisma";
import { Button } from "./button";

const SignInPanel = async () => {
    const { isAuthenticated, getUser } = getKindeServerSession();
    if (await isAuthenticated()) {
        const user = await getUser();
        try {
            const dbUser = await prisma.user.findUnique({
                where: {
                    id: user?.id,
                },
            });

            return <>{dbUser && <UserProfilePanel user={dbUser} />}</>;
        } catch (error) {
            console.error("Database connection error:", error);
            return <div>Error connecting to the database. Please try again later.</div>;
        }
    }

    return (
        <div className="flex gap-3">
            <Button>
                <LoginLink>Sign In</LoginLink>
            </Button>
            <Button>
                <RegisterLink>Sign Up</RegisterLink>
            </Button>
        </div>
    );
};

export default SignInPanel;

import {
    getKindeServerSession,
} from "@kinde-oss/kinde-auth-nextjs/server";
import React from "react";
import UserProfilePanel from "./UserProfilePanel";
import { prisma } from "@/lib/prisma";
import { Button } from "./button";
import Link from "next/link";

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
        <div className="flex gap-3 items-center">
            {!await isAuthenticated() ? (
                <Link href="/auth">
                    <button className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700">
                        Add Property
                    </button>
                </Link>
            ) : (
                <Link href="/user/properties/add">
                    <button className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700">
                        Add Property
                    </button>
                </Link>
            )}
            <Button className="lg:block hidden">
                <Link href={'/auth'}>Sign Up</Link>
            </Button>
        </div>
    );
};

export default SignInPanel;

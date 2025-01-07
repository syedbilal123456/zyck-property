"use client";

import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import { User as PrismaUser } from "@prisma/client";
import Link from "next/link";
import * as React from "react";
import Image from "next/image";
import { DropdownMenu, DropdownMenuItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface Props {
  user: PrismaUser;
}

const UserProfilePanel = ({ user }: Props) => {
  return (
    <DropdownMenu>
      {/* Trigger button */}

      <span>
          <p>{`${user.firstName} ${user.lastName}`}</p>
        </span>
      <DropdownMenuTrigger className="flex items-center gap-2 w-10 rounded-full">
      
        <Image
          src={user.avatarUrl || "/profile.png"}
          alt={`${user.firstName} ${user.lastName}`}
          width={40}
          height={40}
          className="rounded-full"
        />
      
        
      </DropdownMenuTrigger>

      {/* Dropdown menu */}
      <DropdownMenuContent className="dropdown-content menu p-2 shadow rounded-box w-52 bg-background text-foreground">
        <DropdownMenuItem>
          <Link href="/user/profile" className="text-lg ">
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/user/properties" className="text-lg">
            Properties
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <LogoutLink className="text-lg text-red-500">
            Log Out
          </LogoutLink>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserProfilePanel;

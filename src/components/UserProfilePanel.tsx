"use client";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import { User as PrismaUser } from "@prisma/client";
import Link from "next/link";
import React, { useState } from "react";

interface Props {
  user: PrismaUser;
}

const UserProfilePanel = ({ user }: Props) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  return (
    <div className="relative">
      {/* User avatar button */}
      <button
        onClick={toggleDropdown}
        className="flex items-center space-x-2 transition-transform"
      >
        <img
          src={user.avatarUrl ?? "/profile.png"}
          alt={`${user.firstName} ${user.lastName}`}
          className="w-10 h-10 rounded-full border-2 border-white"
        />
        <span className="font-semibold">{`${user.firstName} ${user.lastName}`}</span>
      </button>

      {/* Dropdown menu */}
      {isDropdownOpen && (
        <div className="absolute mt-2 w-48 bg-white shadow-lg rounded-md z-10">
          <ul className="py-2">
            <li>
              <Link href="/user/profile">
                <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</button>
              </Link>
            </li>
            <li>
              <Link href="/user/properties">
                <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Properties</button>
              </Link>
            </li>
            <li>
              <LogoutLink>
                <button className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100">Log Out</button>
              </LogoutLink>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserProfilePanel;

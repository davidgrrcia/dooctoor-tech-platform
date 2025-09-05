"use client";

import Image from "next/image";
import Link from "next/link";
import { calculateAge } from "../utils";

interface MemberCardProps {
  member: any; // You can replace with proper type
}

export function MemberCard({ member }: MemberCardProps) {
  const displayId = member._id.slice(-8).toUpperCase();

  return (
    <div className="flex w-full items-center rounded-lg border border-gray-200 bg-white p-4 transition-shadow hover:shadow-md">
      {/* Avatar and Name Section - Increased Width */}
      <div className="flex w-96 items-center gap-4">
        <div className="relative flex-shrink-0">
          <Image
            src="/icons/empty-avatar.svg"
            alt={`${member.name} ${member.surname}`}
            width={48}
            height={48}
            className="h-12 w-12 rounded-full bg-gray-100"
          />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-lg font-semibold text-gray-900">
            {member.name} {member.surname}
          </h3>
          <p className="text-sm text-gray-500">ID: {displayId}</p>
        </div>
      </div>

      {/* Member Information - Adjusted Column Widths */}
      <div className="hidden flex-1 items-center gap-6 md:flex">
        <div className="w-64 text-left">
          <span className="block text-xs text-gray-600">Email</span>
          <span className="block truncate text-sm font-medium text-gray-900">
            {member.email}
          </span>
        </div>
        <div className="w-40 text-left">
          <span className="block text-xs text-gray-600">
            Fecha de nacimiento
          </span>
          <span className="text-sm font-medium text-gray-900">
            {member.dateOfBirth}
          </span>
        </div>
        <div className="w-24 text-left">
          <span className="block text-xs text-gray-600">Edad</span>
          <span className="text-sm font-medium text-gray-900">
            {calculateAge(member.dateOfBirth)} años
          </span>
        </div>
      </div>

      {/* Manage Button - Fixed Width */}
      <div className="ml-4 flex-shrink-0">
        <Link href={`/members/${member._id}/edit`}>
          <button className="rounded-md border border-gray-300 px-6 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">
            Gestionar
          </button>
        </Link>
      </div>
    </div>
  );
}

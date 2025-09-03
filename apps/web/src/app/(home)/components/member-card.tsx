"use client";

import Image from "next/image";
import { calculateAge } from "../utils";

interface MemberCardProps {
  member: any; // You can replace with proper type
}

export function MemberCard({ member }: MemberCardProps) {
  const displayId = member._id.slice(-8).toUpperCase();

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 transition-shadow hover:shadow-md">
      {/* Avatar and Name Section */}
      <div className="mb-4 flex items-center gap-4">
        <div className="relative">
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

      {/* Member Information */}
      <div className="mb-4 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Email:</span>
          <span className="ml-2 truncate text-sm font-medium text-gray-900">
            {member.email}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Fecha de nacimiento:</span>
          <span className="text-sm font-medium text-gray-900">
            {member.dateOfBirth}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Edad:</span>
          <span className="text-sm font-medium text-gray-900">
            {calculateAge(member.dateOfBirth)} años
          </span>
        </div>
      </div>

      {/* Manage Button */}
      <button className="bg-brand text-brand-foreground hover:bg-brand-hover w-full rounded-md px-4 py-2 text-sm font-medium transition-colors">
        Gestionar
      </button>
    </div>
  );
}

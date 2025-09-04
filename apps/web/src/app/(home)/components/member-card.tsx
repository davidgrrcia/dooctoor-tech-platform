"use client";

import Image from "next/image";
import { calculateAge } from "../utils";

interface MemberCardProps {
  member: any; // You can replace with proper type
}

export function MemberCard({ member }: MemberCardProps) {
  const displayId = member._id.slice(-8).toUpperCase();

  return (
    <div className="flex w-full items-center justify-between rounded-lg border border-gray-200 bg-white p-4 transition-shadow hover:shadow-md">
      {/* Avatar and Name Section */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <Image
            src="/icons/empty-avatar.svg"
            alt={`${member.name} ${member.surname}`}
            width={48}
            height={48}
            className="h-12 w-12 rounded-full bg-gray-100"
          />
        </div>
        <div className="min-w-0">
          <h3 className="text-lg font-semibold text-gray-900">
            {member.name} {member.surname}
          </h3>
          <p className="text-sm text-gray-500">ID: {displayId}</p>
        </div>
      </div>

      {/* Member Information */}
      <div className="hidden items-center gap-8 md:flex">
        <div className="text-left">
          <span className="block text-xs text-gray-600">Email</span>
          <span className="text-sm font-medium text-gray-900">
            {member.email}
          </span>
        </div>
        <div className="text-left">
          <span className="block text-xs text-gray-600">
            Fecha de nacimiento
          </span>
          <span className="text-sm font-medium text-gray-900">
            {member.dateOfBirth}
          </span>
        </div>
        <div className="text-left">
          <span className="block text-xs text-gray-600">Edad</span>
          <span className="text-sm font-medium text-gray-900">
            {calculateAge(member.dateOfBirth)} años
          </span>
        </div>
      </div>

      {/* Manage Button */}
      <button className="bg-brand text-brand-foreground hover:bg-brand-hover rounded-md px-6 py-2 text-sm font-medium transition-colors">
        Gestionar
      </button>
    </div>
  );
}

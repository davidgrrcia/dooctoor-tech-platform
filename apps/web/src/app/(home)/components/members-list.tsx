"use client";

import { api } from "@repo/backend/convex/_generated/api";
import { useQuery } from "convex/react";
import { MemberCard } from "./member-card";
import { MembersListSkeleton } from "./members-list-skeleton";

export function MembersList() {
  const members = useQuery(api.members.getAllMembers);

  if (members === undefined) {
    return <MembersListSkeleton />;
  }

  if (!members || members.length === 0) {
    return (
      <div className="mx-auto w-full max-w-6xl">
        <div className="py-12 text-center">
          <h3 className="mb-2 text-xl font-medium">
            No hay miembros registrados
          </h3>
          <p className="text-muted-foreground">
            Cuando se registren miembros, aparecerán aquí.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-6xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-muted-foreground">
            Total: {members.length} miembros
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar miembros..."
              className="focus:border-brand focus:ring-brand w-64 rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1"
            />
            <svg
              className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {members.map((member) => (
          <MemberCard key={member._id} member={member} />
        ))}
      </div>
    </div>
  );
}

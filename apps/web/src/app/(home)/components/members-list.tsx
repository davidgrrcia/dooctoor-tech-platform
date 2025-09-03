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
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {members.map((member) => (
          <MemberCard key={member._id} member={member} />
        ))}
      </div>
    </div>
  );
}

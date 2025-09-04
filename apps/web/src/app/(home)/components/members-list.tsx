"use client";

import { api } from "@repo/backend/convex/_generated/api";
import { useQuery } from "convex/react";
import { useMemo, useState } from "react";
import { MemberCard } from "./member-card";
import { MembersListSkeleton } from "./members-list-skeleton";

export function MembersList() {
  const members = useQuery(api.members.getAllMembers);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter members based on search term
  const filteredMembers = useMemo(() => {
    if (!members || !searchTerm.trim()) {
      return members || [];
    }

    const searchLower = searchTerm.toLowerCase().trim();

    return members.filter((member) => {
      // Search by name (first name + surname)
      const fullName = `${member.name} ${member.surname}`.toLowerCase();
      if (fullName.includes(searchLower)) return true;

      // Search by ID (last 8 characters, case insensitive)
      const displayId = member._id.slice(-8).toLowerCase();
      if (displayId.includes(searchLower)) return true;

      // Search by email
      const email = member.email.toLowerCase();
      if (email.includes(searchLower)) return true;

      return false;
    });
  }, [members, searchTerm]);

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
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar por nombre, ID o email.."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="focus:border-brand focus:ring-brand w-64 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-1"
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
        <button
          onClick={() => {
            // TODO: Implement create member functionality
            console.log("Create new member");
          }}
          className="bg-brand hover:bg-brand-hover text-brand-foreground focus:ring-brand flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"
        >
          Crear Miembro
        </button>
      </div>

      {filteredMembers.length === 0 && searchTerm.trim() ? (
        <div className="py-12 text-center">
          <h3 className="mb-2 text-xl font-medium text-gray-900">
            No se encontraron resultados
          </h3>
          <p className="text-muted-foreground">
            No hay miembros que coincidan con "{searchTerm}".
            <br />
            Intenta buscar por nombre, ID o email.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredMembers.map((member) => (
            <MemberCard key={member._id} member={member} />
          ))}
        </div>
      )}
    </div>
  );
}

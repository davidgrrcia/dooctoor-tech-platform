"use client";

import { api } from "@repo/backend/convex/_generated/api";
import { Skeleton } from "@repo/ui/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/components/ui/table";
import { useQuery } from "convex/react";
import { calculateAge } from "../utils";

export function MembersTable() {
  const members = useQuery(api.members.getAllMembers);

  if (members === undefined) {
    return <MembersTableSkeleton />;
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
        <h2 className="text-2xl font-semibold">Miembros Registrados</h2>
        <div className="flex items-center gap-4">
          <p className="text-muted-foreground">
            Total: {members.length} miembros
          </p>
          {/* Future: Add member button could go here */}
        </div>
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre Completo</TableHead>
              <TableHead>Apodo</TableHead>
              <TableHead>Edad</TableHead>
              <TableHead>Género</TableHead>
              <TableHead>Tipo de Sangre</TableHead>
              <TableHead>Altura</TableHead>
              <TableHead>Peso</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Teléfono</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members.map((member) => (
              <TableRow key={member._id} className="hover:bg-muted/50">
                <TableCell className="font-medium">
                  {member.name} {member.surname}
                </TableCell>
                <TableCell>{member.nickname}</TableCell>
                <TableCell>{calculateAge(member.dateOfBirth)} años</TableCell>
                <TableCell>{member.gender}</TableCell>
                <TableCell>
                  {member.bloodType}
                  {member.rh}
                </TableCell>
                <TableCell>{member.height} cm</TableCell>
                <TableCell>{member.weight} kg</TableCell>
                <TableCell className="text-sm">{member.email}</TableCell>
                <TableCell>{member.phone}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function MembersTableSkeleton() {
  return (
    <div className="mx-auto w-full max-w-6xl">
      <div className="mb-6 flex items-center justify-between">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-6 w-32" />
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre Completo</TableHead>
              <TableHead>Apodo</TableHead>
              <TableHead>Edad</TableHead>
              <TableHead>Género</TableHead>
              <TableHead>Tipo de Sangre</TableHead>
              <TableHead>Altura</TableHead>
              <TableHead>Peso</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Teléfono</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 5 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Skeleton className="h-4 w-32" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-20" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-16" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-20" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-16" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-16" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-16" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-40" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-24" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

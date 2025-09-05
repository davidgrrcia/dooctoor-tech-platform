"use client";

import { AppLayout } from "@/components";
import { Authenticated, Unauthenticated } from "convex/react";
import { MembersList, SignInForm } from "./components";

export default function HomePage() {
  return (
    <AppLayout
      title="Gestión de Miembros"
      subtitle="Panel de administración para gestionar miembros de la familia"
      showHeaderContent={true}
    >
      <Authenticated>
        <MembersList />
      </Authenticated>

      <Unauthenticated>
        <SignInForm />
      </Unauthenticated>
    </AppLayout>
  );
}

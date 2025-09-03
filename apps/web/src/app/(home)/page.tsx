"use client";

import { Authenticated, Unauthenticated } from "convex/react";
import { Header, MembersContent, SignInForm } from "./components";

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="flex flex-col gap-8 p-8">
        <div className="mx-auto w-full max-w-6xl">
          <h1 className="mb-2 text-4xl font-bold">Gestión de Miembros</h1>
          <p className="text-muted-foreground text-lg">
            Panel de administración para gestionar miembros de la familia
          </p>
        </div>

        <Authenticated>
          <MembersContent />
        </Authenticated>

        <Unauthenticated>
          <SignInForm />
        </Unauthenticated>
      </main>
    </>
  );
}

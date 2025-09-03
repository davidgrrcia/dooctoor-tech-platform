"use client";

import Link from "next/link";

export function SignInForm() {
  return (
    <div className="mx-auto flex w-96 flex-col gap-8">
      <div className="text-center">
        <h2 className="mb-2 text-2xl font-bold">Acceso Requerido</h2>
        <p className="text-muted-foreground">
          Inicia sesión para acceder al dashboard de miembros
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <Link href="/sign-in">
          <button className="bg-foreground text-background w-full rounded-md px-4 py-3 font-medium transition-opacity hover:opacity-90">
            Iniciar Sesión
          </button>
        </Link>
        <Link href="/sign-up">
          <button className="border-foreground text-foreground bg-background hover:bg-muted w-full rounded-md border px-4 py-3 font-medium transition-colors">
            Crear Cuenta
          </button>
        </Link>
      </div>
    </div>
  );
}

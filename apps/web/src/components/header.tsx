"use client";

import { useAuth } from "@workos-inc/authkit-nextjs/components";
import type { User } from "@workos-inc/node";
import Image from "next/image";
import Link from "next/link";

export function Header() {
  const { user, signOut } = useAuth();

  return (
    <header className="sticky top-0 z-10 flex flex-row items-center justify-between border-b border-slate-200 bg-white p-4">
      <div className="flex items-center">
        <Link href="/">
          <Image
            src="/logo.svg"
            alt="Dooctoor"
            width={120}
            height={20}
            className="h-8 w-auto"
          />
        </Link>
      </div>
      {user && <UserMenu user={user} onSignOut={signOut} />}
    </header>
  );
}

function UserMenu({ user, onSignOut }: { user: User; onSignOut: () => void }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm">{user.email}</span>
      <button
        onClick={onSignOut}
        className="rounded-md bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600"
      >
        Sign out
      </button>
    </div>
  );
}

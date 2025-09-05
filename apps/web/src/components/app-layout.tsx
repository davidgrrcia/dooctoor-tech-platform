"use client";

import { Header } from "./header";

interface AppLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  showHeaderContent?: boolean;
}

export function AppLayout({
  children,
  title,
  subtitle,
  showHeaderContent = false,
}: AppLayoutProps) {
  return (
    <>
      <Header />
      <main className="flex flex-col gap-8 p-8">
        {showHeaderContent && title && (
          <div className="mx-auto w-full max-w-6xl">
            <h1 className="mb-2 text-4xl font-bold">{title}</h1>
            {subtitle && (
              <p className="text-muted-foreground text-lg">{subtitle}</p>
            )}
          </div>
        )}

        <div className="mx-auto w-full max-w-6xl">{children}</div>
      </main>
    </>
  );
}

'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import * as React from 'react';

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: 'system' | 'light' | 'dark';
  forcedTheme?: 'system' | 'light' | 'dark';
}

export function ThemeProvider({ children, defaultTheme = 'system', forcedTheme }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme={defaultTheme}
      forcedTheme={forcedTheme}
      enableSystem
      disableTransitionOnChange
      enableColorScheme
    >
      {children}
    </NextThemesProvider>
  );
}

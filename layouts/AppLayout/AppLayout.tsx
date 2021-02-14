import React, { PropsWithChildren } from 'react';

import { AppHeader } from './AppHeader';

interface AppLayoutProps {
  isLoading?: boolean;
}

export function AppLayout({
  children,
  isLoading,
}: PropsWithChildren<AppLayoutProps>) {
  return (
    <>
      <AppHeader isLoading={isLoading} />

      <div className="bg-gray-100 h-full">
        <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </>
  );
}

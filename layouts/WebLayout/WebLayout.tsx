import React, { PropsWithChildren } from 'react';

import { WebHeader } from './WebHeader';

interface WebLayoutProps {}

export function WebLayout({ children }: PropsWithChildren<WebLayoutProps>) {
  return (
    <>
      <WebHeader />

      <div className="bg-gray-100 h-full w-full">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </div>
    </>
  );
}

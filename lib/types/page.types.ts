import { NextPage } from 'next';
import { AppProps } from 'next/app';
import { ReactNode } from 'react';

import { User } from '@/lib/types/user.types';

export type CustomPage = NextPage & {
  skeletonLoader?: ReactNode;
  suppressFirstRenderFlicker?: boolean;
  getLayout?: (component: JSX.Element) => JSX.Element;

  authRedirect?: {
    if: (user?: User) => boolean;
    to: string;
  };
};

export interface CustomAppProps extends Omit<AppProps, 'Component'> {
  Component: CustomPage;
}

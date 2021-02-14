import { NextPage } from 'next';
import { AppProps } from 'next/app';
import { ReactNode } from 'react';

export type CustomPage = NextPage & {
  skeletonLoader?: ReactNode;
  redirectAuthenticatedTo?: string;
  redirectUnAuthenticatedTo?: string;
  suppressFirstRenderFlicker?: boolean;
  getLayout?: (component: JSX.Element) => JSX.Element;
};

export interface CustomAppProps extends Omit<AppProps, 'Component'> {
  Component: CustomPage;
}

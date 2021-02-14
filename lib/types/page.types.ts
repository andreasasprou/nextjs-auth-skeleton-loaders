import { NextPage } from 'next';
import { AppProps } from 'next/app';
import { ReactNode } from 'react';

export type CustomPage = NextPage & {
  skeletonLoader?: ReactNode;
  redirectAuthenticatedTo?: string;
  redirectUnAuthenticatedTo?: string;
};

export interface CustomAppProps extends Omit<AppProps, 'Component'> {
  Component: CustomPage;
}

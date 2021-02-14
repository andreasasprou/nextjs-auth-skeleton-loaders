import { NextPage } from 'next';
import { ReactNode } from 'react';

export type CustomPage = NextPage & {
  skeletonLoader?: ReactNode;
};

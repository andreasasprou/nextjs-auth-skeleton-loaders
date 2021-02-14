import { PropsWithChildren, ReactNode } from 'react';

import { useUser } from '@/lib/hooks/useUser';

interface WithSkeletonLoaderProps {
  skeletonLoader: ReactNode | undefined;
}

/*
  This can be defined however you please, maybe you'd like to wait
  for some other data to be fetched from your backend
 */
function useIsLoading() {
  const { isLoading } = useUser();

  return isLoading;
}

export function WithSkeletonLoader({
  children,
  skeletonLoader,
}: PropsWithChildren<WithSkeletonLoaderProps>) {
  const isLoading = useIsLoading();

  if (isLoading && skeletonLoader) {
    return <>{skeletonLoader}</>;
  }

  return <>{children}</>;
}

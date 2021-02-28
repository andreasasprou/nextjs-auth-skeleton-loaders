import { PropsWithChildren, ReactNode, useEffect, useState } from 'react';

import { useUser } from '@/lib/hooks/useUser';

interface WithSkeletonLoaderProps {
  skeletonLoader: ReactNode | undefined;
}

export const randomIntFromInterval = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const SOMETHING_ELSE_LOAD_TIME_MS = randomIntFromInterval(1, 3) * 1000;

function useIsSomethingElseLoading() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, SOMETHING_ELSE_LOAD_TIME_MS);

    return () => clearTimeout(timeout);
  }, []);

  return isLoading;
}

/*
  This can be defined however you please, maybe you'd like to wait
  for some other data to be fetched from your backend
 */
function useIsLoading() {
  const { isLoading } = useUser();
  const isSomethingElseLoading = useIsSomethingElseLoading();

  return isLoading || isSomethingElseLoading;
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

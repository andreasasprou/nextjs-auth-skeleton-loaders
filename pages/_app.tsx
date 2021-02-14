import { AppProps } from 'next/app';
import { SWRConfig } from 'swr';

import { WithSkeletonLoader } from '@/components/WithSkeletonLoader';
import { fetchJson } from '@/lib/fetchJson';
import { CustomPage } from '@/lib/types';

interface CustomAppProps extends Omit<AppProps, 'Component'> {
  Component: CustomPage;
}

function MyApp({ Component, pageProps }: CustomAppProps) {
  const skeletonLoader = Component.skeletonLoader;

  return (
    <SWRConfig
      value={{
        fetcher: fetchJson,
        onError: (err) => {
          console.error(err);
        },
      }}
    >
      <WithSkeletonLoader skeletonLoader={skeletonLoader}>
        <Component {...pageProps} />
      </WithSkeletonLoader>
    </SWRConfig>
  );
}

export default MyApp;

import { SWRConfig } from 'swr';

import { WithAuthRedirect } from '@/components/WithAuthRedirect';
import { WithSkeletonLoader } from '@/components/WithSkeletonLoader';
import { fetchJson } from '@/lib/fetchJson';
import { CustomAppProps } from '@/lib/types';
import { pick } from '@/lib/utils';

function MyApp({ Component, pageProps }: CustomAppProps) {
  const skeletonLoader = Component.skeletonLoader;

  const authRedirect = pick(
    Component,
    'redirectAuthenticatedTo',
    'redirectUnAuthenticatedTo',
  );

  return (
    <SWRConfig
      value={{
        fetcher: fetchJson,
        onError: (err) => {
          console.error(err);
        },
      }}
    >
      <WithAuthRedirect {...authRedirect}>
        <WithSkeletonLoader skeletonLoader={skeletonLoader}>
          <Component {...pageProps} />
        </WithSkeletonLoader>
      </WithAuthRedirect>
    </SWRConfig>
  );
}

export default MyApp;

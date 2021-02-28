import { SWRConfig } from 'swr';

import { WithAuthRedirect } from '@/components/WithAuthRedirect';
import { WithSkeletonLoader } from '@/components/WithSkeletonLoader';
import { fetchJson } from '@/lib/fetchJson';
import { CustomAppProps } from '@/lib/types';
import { pick } from '@/lib/utils';

import 'tailwindcss/tailwind.css';
import '@/lib/styles.css';

function MyApp({ Component, pageProps }: CustomAppProps) {
  const skeletonLoader = Component.skeletonLoader;
  const getLayout = Component.getLayout || ((page) => page);

  const authRedirect = pick(
    Component,
    'authRedirect',
    'suppressFirstRenderFlicker',
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
          {getLayout(<Component {...pageProps} />)}
        </WithSkeletonLoader>
      </WithAuthRedirect>
    </SWRConfig>
  );
}

export default MyApp;

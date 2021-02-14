import { AppProps } from 'next/app';
import { SWRConfig } from 'swr';

import { fetchJson } from '@/lib/fetchJson';
import { CustomPage } from '@/lib/types';

interface CustomAppProps extends Omit<AppProps, 'Component'> {
  Component: CustomPage;
}

function MyApp({ Component, pageProps }: CustomAppProps) {
  return (
    <SWRConfig
      value={{
        fetcher: fetchJson,
        onError: (err) => {
          console.error(err);
        },
      }}
    >
      <Component {...pageProps} />
    </SWRConfig>
  );
}

export default MyApp;

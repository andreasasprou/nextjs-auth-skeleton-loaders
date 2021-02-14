import React from 'react';

import { ClientConstants } from '@/lib/constants';
import { CustomPage } from '@/lib/types';

const hasAuthCookie = () => {
  return document.cookie?.indexOf(ClientConstants.AuthCookieName) !== -1;
};

interface AppRedirectProps
  extends Pick<
    CustomPage,
    'redirectAuthenticatedTo' | 'redirectUnAuthenticatedTo'
  > {}

const handleAuthRedirect = ({
  redirectAuthenticatedTo,
  redirectUnAuthenticatedTo,
}: AppRedirectProps) => {
  if (typeof window === 'undefined') return;

  if (hasAuthCookie()) {
    if (redirectAuthenticatedTo) {
      window.location.replace(redirectAuthenticatedTo);
    }
  } else {
    if (redirectUnAuthenticatedTo) {
      const url = new URL(redirectUnAuthenticatedTo, window.location.href);
      url.searchParams.append('next', window.location.pathname);
      window.location.replace(url.toString());
    }
  }
};

export function WithAuthRedirect({
  children,
  ...rest
}: React.PropsWithChildren<AppRedirectProps>) {
  handleAuthRedirect(rest);

  return <>{children}</>;
}

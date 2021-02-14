import React, { useEffect } from 'react';

import { ClientConstants } from '@/lib/constants';
import { CustomPage } from '@/lib/types';

import { NO_PAGE_FLICKER_CLASSNAME, NoPageFlicker } from './NoPageFlicker';

const hasAuthCookie = () => {
  return document.cookie?.indexOf(ClientConstants.AuthCookieName) !== -1;
};

interface AppRedirectProps
  extends Pick<
    CustomPage,
    | 'redirectAuthenticatedTo'
    | 'redirectUnAuthenticatedTo'
    | 'suppressFirstRenderFlicker'
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
  ...props
}: React.PropsWithChildren<AppRedirectProps>) {
  handleAuthRedirect(props);

  const noPageFlicker =
    props.suppressFirstRenderFlicker ||
    props.redirectUnAuthenticatedTo ||
    props.redirectAuthenticatedTo;

  useEffect(() => {
    document.documentElement.classList.add(NO_PAGE_FLICKER_CLASSNAME);
  }, []);

  return (
    <>
      {noPageFlicker && <NoPageFlicker />}
      {children}
    </>
  );
}

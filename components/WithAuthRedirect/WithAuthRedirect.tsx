import React, { useEffect, useState } from 'react';

import { useUser } from '@/lib/hooks/useUser';
import { CustomPage } from '@/lib/types';

import { NO_PAGE_FLICKER_CLASSNAME, NoPageFlicker } from './NoPageFlicker';

interface AppRedirectProps
  extends Pick<CustomPage, 'authRedirect' | 'suppressFirstRenderFlicker'> {}

export function WithAuthRedirect({
  children,
  authRedirect,
  suppressFirstRenderFlicker,
}: React.PropsWithChildren<AppRedirectProps>) {
  const [hasMounted, setHasMounted] = useState(false);
  const { isLoading, user } = useUser();

  const noPageFlicker = suppressFirstRenderFlicker || !!authRedirect;

  useEffect(() => {
    if (isLoading || hasMounted) {
      return;
    }

    if (authRedirect && authRedirect.if(user)) {
      window.location.replace(authRedirect.to);
      return;
    }

    setHasMounted(true);

    document.documentElement.classList.add(NO_PAGE_FLICKER_CLASSNAME);
  }, [authRedirect, hasMounted, isLoading, user]);

  return (
    <>
      {noPageFlicker && <NoPageFlicker />}
      {children}
    </>
  );
}

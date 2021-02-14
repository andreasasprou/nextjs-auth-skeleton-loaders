import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useUser } from '@/lib/hooks/useUser';
import { User } from '@/lib/types';

export interface UseRedirectUserPayload {
  redirectTo?: string;
  redirectIf?: (user: User) => boolean;
}

export function useRedirectUser({
  redirectTo,
  redirectIf,
}: UseRedirectUserPayload) {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    // if no redirect needed, just return (example: already on /dashboard)
    // if user data not yet there (fetch in progress, logged in or not) then don't do anything yet
    if (!user || !redirectIf || !redirectTo) return;

    const shouldRedirect = redirectIf && redirectIf(user);

    if (shouldRedirect) {
      router.push(redirectTo);
    }
  }, [user, redirectIf, redirectTo, router]);
}

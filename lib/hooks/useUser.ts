import useSWR from 'swr';

import { API_ROUTES } from '@/lib/constants';

export function useUser() {
  const { data: user, mutate: mutateUser, error } = useSWR(API_ROUTES.GetUser);

  const isLoading = !user && !error;

  return { user, mutateUser, isLoading };
}

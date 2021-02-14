import useSWR from 'swr';

import { API_ROUTES } from '@/lib/constants';
import { User } from '@/lib/types';

export function useUser() {
  const { data: user, mutate: mutateUser, error } = useSWR<User>(
    API_ROUTES.GetUser,
  );

  const isLoading = !user && !error;

  return { user: user as User, mutateUser, isLoading };
}

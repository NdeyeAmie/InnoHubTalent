'use client';

import { useQuery } from '@tanstack/react-query';
import { User } from '@/lib/types/User';
import { fetchUsers } from '@/lib/api/users';

export const useGetUsers = () => {
  return useQuery<User[], Error>({
    queryKey: ['users'],
    queryFn: fetchUsers,
    staleTime: 1000 * 60,
    cacheTime: 0,
    retry: 1,
  });
};

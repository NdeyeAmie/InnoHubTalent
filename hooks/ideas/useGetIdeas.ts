'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchIdeas } from '@/lib/api/ideas';
import { Idea } from '@prisma/client';

export const useGetIdeas = () => {
  return useQuery<Idea[], Error>({
    queryKey: ['ideas'],
    queryFn: fetchIdeas,
    staleTime: 1000 * 60,
    cacheTime: 0,
    retry: 1,
  });
};

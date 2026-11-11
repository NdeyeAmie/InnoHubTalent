import { updateUser } from '@/lib/api/users';
import { User } from '@/lib/types/User';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useUpdateUser(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<User>) => updateUser(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
}

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createIdea } from '@/lib/api/ideas'; // Utilise createIdea ici
import type { Idea, IdeaFormData } from '@/lib/types/Idea';

export const useAddIdea = () => {
  const queryClient = useQueryClient();

  return useMutation<Idea, Error, IdeaFormData>({
    mutationFn: (data) => createIdea(data), // Appelle createIdea
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ideas'] });
    },
    onError: (error: any) => {
    },
  });
};
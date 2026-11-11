'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

// Appel de l'API route /api/ideas/[id] avec la méthode DELETE
async function deleteIdea(id: string) {
  const res = await fetch(`/api/ideas/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Erreur lors de la suppression');
  return res.json();
}

export const useDeleteIdea = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteIdea(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ideas'] });
    },
  });
};
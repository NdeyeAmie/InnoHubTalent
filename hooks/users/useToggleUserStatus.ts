'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useToggleUserStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      status,
    }: {
      id: string;
      status: 'ACTIVE' | 'INACTIVE';
    }) => {
      const res = await fetch(`/api/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });

      if (!res.ok) {
        throw new Error('Impossible de mettre à jour le statut');
      }

      return res.json();
    },
    onSuccess: (data) => {
      toast.success(
        `Utilisateur ${data.status === 'ACTIVE' ? 'activé' : 'désactivé'} avec succès`
      );
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: () => {
      toast.error("Erreur lors de la mise à jour du statut de l'utilisateur");
    },
  });
};

'use client';

import { useMutation } from '@tanstack/react-query';

type UpdatePasswordInput = {
  oldPassword: string;
  newPassword: string;
};

export function useUpdatePassword() {
  return useMutation({
    mutationFn: async ({ oldPassword, newPassword }: UpdatePasswordInput) => {
      const res = await fetch('/api/auth/update-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ oldPassword, newPassword }),
      });

      // Toujours retourner un JSON
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(
          data.message || 'Erreur lors du changement de mot de passe'
        );
      }

      return data;
    },
  });
}

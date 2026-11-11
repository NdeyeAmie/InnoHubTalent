import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateIdea } from '@/lib/api/ideas';
import type { Idea, IdeaFormData } from '@/lib/types/Idea';
import { toast } from 'sonner';

export const useUpdateIdea = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => {
      console.log('🔄 Appel API updateIdea:', { id, data });
      return updateIdea(id, data);
    },
    onSuccess: (response) => {
      console.log('✅ Succès:', response);
      queryClient.invalidateQueries({ queryKey: ['ideas'] });
      toast.success('Idée mise à jour avec succès !');
    },
    onError: (error: any) => {
      console.error('❌ Erreur:', error);
      toast.error(`Erreur: ${error?.message || ''}`);
    },
  });
};
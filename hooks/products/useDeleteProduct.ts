import { deleteProduct } from '@/lib/api/products';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

type DeleteResponse = void | { success: boolean };

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation<DeleteResponse, Error, string>({
    mutationFn: (id: string) => deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Produit supprimé avec succès');
    },
    onError: (error) => {
      toast.error(`Erreur lors de la suppression : ${error.message}`);
    },
  });
};

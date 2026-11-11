import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateProduct } from '@/lib/api/products';
import type { Product, ProductFormData } from '@/lib/types/Product';
import { toast } from 'sonner';

export const useUpdateProduct = (id: string) => {
  const queryClient = useQueryClient();

  // return useMutation<Product, Error, ProductFormData>({
  //   mutationFn: (data: ProductFormData) => updateProduct(id, data),
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ['products'] });
  //     toast.success('Produit mis à jour avec succès !');
  //   },
  //   onError: (error: any) => {
  //     toast.error(`Erreur lors de la mise à jour : ${error?.message || ''}`);
  //   },
  // });

  return useMutation<Product, Error, ProductFormData>({
    mutationFn: (data) => updateProduct(id, data),
    onMutate: async (newData) => {
      await queryClient.cancelQueries({ queryKey: ['products'] });

      const previousProducts = queryClient.getQueryData<Product[]>([
        'products',
      ]);

      queryClient.setQueryData<Product[]>(['products'], (old) => {
        if (!Array.isArray(old)) return old; // sécurise si old n'est pas un tableau

        return old.map((p) =>
          p.id === id ? ({ ...p, ...newData } as Product) : p
        );
      });

      return { previousProducts };
    },
    onError: (error, _, context) => {
      if (context?.previousProducts) {
        queryClient.setQueryData(['products'], context.previousProducts);
      }
      toast.error(`Erreur lors de la mise à jour : ${error?.message || ''}`);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
    onSuccess: () => {
      toast.success('Produit mis à jour avec succès !');
    },
  });
};

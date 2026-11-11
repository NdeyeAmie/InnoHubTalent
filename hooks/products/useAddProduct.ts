'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createProduct } from '@/lib/api/products';
import { Product, ProductType } from '@/lib/types/Product';

export type AddProductInput = {
  name: string;
  description?: string | null;
  type: ProductType;
  meta?: Record<string, any> | null;
  thumbnail?: File | null;
  flowchart?: File | null;
  demo?: File | null;
  readme?: string | null;
  userguide?: File | null;
  launch_url?: string | null;
};

export const useAddProduct = (type: ProductType) => {
  const queryClient = useQueryClient();

  return useMutation<Product, Error, AddProductInput>({
    mutationFn: async (data) => {
      // Appelle la fonction API
      return createProduct(data);
    },
    onSuccess: () => {
      // ⚡ Actualise la liste des produits après création
      queryClient.invalidateQueries({ queryKey: ['products', type] });
    },
    onError: (err) => {
      console.error('❌ Erreur lors de la création du produit :', err);
    },
  });
};

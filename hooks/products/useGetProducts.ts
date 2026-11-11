'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '@/lib/api/products';
import { Product } from '@/lib/types/Product';

// ✅ Hook pour récupérer les produits
export const useGetProducts = () => {
  return useQuery<Product[], Error>({
    queryKey: ['products'],
    queryFn: fetchProducts,
    staleTime: 1 * 60, // 1 min : données considérées comme fraîches
    retry: 1, // réessayer une seule fois en cas d'erreur
  });
};

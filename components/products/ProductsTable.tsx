'use client';

import { DataTable } from './products-table/data-table';
import { getColumns } from './products-table/columns';
import { toast } from 'sonner';
import { LoadingDoubleSpinner } from '@/components/ui/loadingDoubleSpinner';
import { useGetProducts } from '@/hooks/products/useGetProducts';
import { useAuth } from '@/hooks/useAuth';

export function ProductsTable() {
  const { user, loading, isConsultant } = useAuth();
  const { data, isLoading, error } = useGetProducts();

  if (isLoading) {
    return (
      <LoadingDoubleSpinner message="Chargement de la liste des Produits ..." />
    );
  }

  if (error) {
    toast.error('Impossible de charger les utilisateurs');
    return (
      <p className="text-center py-4 text-red-500">
        Erreur de chargement de produits
      </p>
    );
  }

  return (
    <div className="space-y-6">
      <DataTable
        // columns={columns}
        columns={getColumns(isConsultant)}
        data={data?.products}
        statsProducts={data?.stats}
      />
    </div>
  );
}

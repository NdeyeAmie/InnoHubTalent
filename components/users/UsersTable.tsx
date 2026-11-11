'use client';

import { DataTable } from './users-table/data-table';
import { columns as baseColumns } from './users-table/columns';
import { toast } from 'sonner';
import { useGetUsers } from '@/hooks/users/useGetUsers';
import { LoadingDoubleSpinner } from '@/components/ui/loadingDoubleSpinner';
import { useAuth } from '@/hooks/useAuth';

export function UsersTable({ ...props }) {
  const { data, isLoading, error } = useGetUsers();
  const { isProductManager } = useAuth();

  const columns = isProductManager
    ? baseColumns.filter((col) => col.id !== 'actions')
    : baseColumns;

  if (isLoading) {
    return (
      <LoadingDoubleSpinner message="Chargement de la liste des Utilisateurs ..." />
    );
  }

  if (error) {
    toast.error('Impossible de charger les utilisateurs');
    return (
      <p className="text-center py-4 text-red-500">
        Erreur de chargement des utilisateurs
      </p>
    );
  }

  return (
    <div className="space-y-6">
      <DataTable
        columns={columns}
        data={data.users}
        statsUsers={data.stats}
        {...props}
      />
    </div>
  );
}

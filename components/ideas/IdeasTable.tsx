'use client';

import { DataTable } from './ideas-table/data-table';
import { columns } from './ideas-table/columns';
import { toast } from 'sonner';
import { LoadingDoubleSpinner } from '@/components/ui/loadingDoubleSpinner';
import { useGetIdeas } from '@/hooks/ideas/useGetIdeas';

export function IdeasTable() {
  const { data, isLoading, error } = useGetIdeas();

  if (isLoading) {
    return (
      <LoadingDoubleSpinner message="Chargement de la liste des Idées ..." />
    );
  }

  if (error) {
    toast.error('Impossible de charger les idées');
    return (
      <p className="text-center py-4 text-red-500">Erreur de chargement</p>
    );
  }

  return (
    <div className="space-y-6">
      <DataTable columns={columns} data={data.ideas} statsIdeas={data.stats} />
    </div>
  );
}

'use client';

import { useState } from 'react';
import { useGetProducts } from '@/hooks/products/useGetProducts';
import { DataTable } from './data-table';
import { columns } from './columns';
import { LoadingDoubleSpinner } from '@/components/ui/loadingDoubleSpinner';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';
import { Eye } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import AddProductDialog from '@/components/productCard/partials/AddProductDialog';
import EditProductDialog from '@/components/productCard/partials/EditProductDialog';

const TYPES = [
  { label: 'Tous', value: 'Tous' },
  { label: 'App', value: 'APPLICATION' },
  { label: 'Workflow', value: 'WORKFLOW' },
  { label: 'Robot', value: 'ROBOT' },
];

const STATUS = ['Tous', 'RUNNING', 'STOPPED', 'DEPRECATED'];

export default function TableauApplications() {
  const [selectedType, setSelectedType] = useState<string>('Tous');
  const [selectedStatus, setSelectedStatus] = useState<string>('Tous');
  const [search, setSearch] = useState('');

  const {
    data: apps = [],
    isLoading,
    error,
    typeCounts = {},
    statusCounts = {},
  } = useGetProducts(selectedType === 'Tous' ? undefined : selectedType);

  const filteredApps = apps.filter((app) => {
    const searchValue = search.toLowerCase();
    const inAnyField =
      app.name?.toLowerCase().includes(searchValue) ||
      app.description?.toLowerCase().includes(searchValue) ||
      app.type?.toLowerCase().includes(searchValue) ||
      app.status?.toLowerCase().includes(searchValue) ||
      app.version?.toLowerCase().includes(searchValue) ||
      app.repositoryUrl?.toLowerCase().includes(searchValue) ||
      app.readme?.toLowerCase().includes(searchValue) ||
      app.launch_url?.toLowerCase().includes(searchValue) ||
      app.demo?.toLowerCase().includes(searchValue) ||
      app.updatedBy?.toLowerCase().includes(searchValue) ||
      (Array.isArray(app.techStack) &&
        app.techStack.join(' ').toLowerCase().includes(searchValue));
    const typeOk = selectedType === 'Tous' ? true : app.type === selectedType;
    const statusOk =
      selectedStatus === 'Tous' ? true : app.status === selectedStatus;
    return inAnyField && typeOk && statusOk;
  });

  if (isLoading) {
    return (
      <LoadingDoubleSpinner message="Chargement de la liste des applications ..." />
    );
  }

  return (
    <div className="space-y-6 flex flex-col items-center">
      {/* Boutons en haut */}

      {/* Barre de recherche et filtres */}
      <div className="w-full max-w-5xl flex items-center justify-between gap-1 mb-4 mt-6">
        <input
          type="text"
          placeholder="Rechercher..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 max-w-[140px] border rounded px-2 py-1 text-sm"
        />
        <div className="flex-1 flex justify-center">
          <Tabs value={selectedType} onValueChange={setSelectedType}>
            <TabsList className="flex gap-0.5">
              {TYPES.map((type) => (
                <TabsTrigger
                  key={type.value}
                  value={type.value}
                  className="px-2 py-1 text-xs"
                >
                  {type.label}
                  <span className="ml-1 inline-flex items-center justify-center rounded-md border px-1 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 bg-primary text-primary-foreground">
                    {typeCounts[type.value] ?? 0}
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
        <div className="flex-1 flex justify-end">
          <Tabs value={selectedStatus} onValueChange={setSelectedStatus}>
            <TabsList className="flex gap-0.5">
              {STATUS.map((status) => (
                <TabsTrigger
                  key={status}
                  value={status}
                  className="px-2 py-1 text-xs"
                >
                  {status}
                  <span className="ml-1 inline-flex items-center justify-center rounded-md border px-1 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 bg-primary text-primary-foreground">
                    {statusCounts[status] ?? 0}
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </div>
      <div className="w-full max-w-5xl">
        {/* Tableau sans scroll horizontal parent */}
        <DataTable columns={columns} data={filteredApps} />
      </div>
    </div>
  );
}

'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AddProductDialog from './products/AddProductDialog';
import { useBreadcrumb } from '@/hooks/useBreadcrumb';
import { PRODUCT_TYPES } from '@/lib/types/Product';
import { PRODUCT_TYPE_LABELS } from '@/lib/constants/product';
import { ProductType } from '@prisma/client';
import { useGetProducts } from '@/hooks/products/useGetProducts';
import { Button } from './ui/button';
import { Eye } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { LoadingDoubleSpinner } from './ui/loadingDoubleSpinner';
import { Input } from './ui/input';
import * as React from 'react';
import { UiTabsFilter } from './ui/UiTabsFilter';
import { ProductGrid } from './products/products-grid/ProductGrid';
import { useAuth } from '@/hooks/useAuth';

// AJOUT : définition de dataTabs
const dataTabs = [
  { value: 'ALL', label: 'Tous', typeProduct: undefined },
  ...PRODUCT_TYPES.map((type) => ({
    value: type,
    label: PRODUCT_TYPE_LABELS[type.toLowerCase() as keyof typeof PRODUCT_TYPE_LABELS] || type,
    typeProduct: type,
  })),
];

export default function ProductsSection() {
  const { isConsultant } = useAuth();
  const { activeTab, setActiveTab } = useBreadcrumb();
  const router = useRouter();
  const [globalFilter, setGlobalFilter] = React.useState('');
  const { data, isLoading, refetch } = useGetProducts();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingDoubleSpinner message="Chargement ..." />
      </div>
    );
  }

  const allProducts = data?.products ?? [];

  //  Filtrer selon onglet
  const filteredByTab =
    activeTab === 'ALL'
      ? allProducts
      : allProducts.filter((p) => p.type === activeTab);

  return (
    <div className="p-4">
      {/* Barre de recherche et actions */}
      <div className="flex justify-end mb-0 space-x-2 mb-4">
        <Input
          placeholder="Rechercher un produit..."
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="max-w-sm"
        />

        {!isConsultant && (
          <AddProductDialog typeProduct={activeTab as ProductType} />
        )}

        <Button variant="outline" onClick={() => router.push('/products')}>
          <Eye className="mr-2" />
          Afficher la liste des produits
        </Button>
      </div>

      {/* 🔹 Tabs de filtrage */}
      <div className="mb-4">
        <UiTabsFilter
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          options={PRODUCT_TYPES.map((type) => ({
            value: type,
            label:
              PRODUCT_TYPE_LABELS[
                type.toLowerCase() as keyof typeof PRODUCT_TYPE_LABELS
              ],
          }))}
          stats={data?.stats?.byType}
          statsKey="type"
          total={data?.stats?.total ?? 0}
        />
      </div>

      {/* 🔹 Contenu */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsContent value={activeTab}>
          <ProductGrid
            products={filteredByTab}
            typeProduct={
              activeTab === 'ALL' ? undefined : (activeTab as ProductType)
            }
            globalFilter={globalFilter}
            refetch={refetch}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

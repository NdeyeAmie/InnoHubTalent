'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { AddProductDialog } from '@/components/productCard/partials/AddProductDialog';
import { DataTable } from '../../../components/products/products-table/data-table'; // À créer comme pour users
import { columns } from '../../../components/products/products-table/columns'; // À créer comme pour users
import { getEndpointByType } from '@/lib/api/products';
import { LoadingDoubleSpinner } from '@/components/ui/loadingDoubleSpinner';

export default function TableauProduits() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        // Récupère tous les produits
        const res = await fetch('/api/products');
        const data = await res.json();
        setProducts(data);
      } catch (e) {
        toast.error('Impossible de charger les produits');
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <LoadingDoubleSpinner message="Chargement de la liste des produits ..." />
    );
  }

  return (
    <div className="space-y-6">
      <AddProductDialog />
      <DataTable columns={columns} data={products} />
    </div>
  );
}

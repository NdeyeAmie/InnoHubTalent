// ProductGrid.tsx
import ProductCard from '../../productCard/ProductCard';
import { LoadingDoubleSpinner } from '../../ui/loadingDoubleSpinner';
import * as React from 'react';
import { ProductType } from '@prisma/client';

type ProductGridProps = {
  products: any[];
  typeProduct?: ProductType;
  globalFilter: string;
  refetch: () => void;
};

export function ProductGrid({
  products,
  typeProduct,
  globalFilter,
  refetch,
}: ProductGridProps) {
  const filteredProducts =
    products?.filter((p) =>
      p.name.toLowerCase().includes(globalFilter.toLowerCase())
    ) ?? [];

  if (!products) {
    return (
      <div className="flex items-center justify-center">
        <LoadingDoubleSpinner message="Chargement ..." />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-4 md:grid-cols-6 gap-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              dataProduct={product}
              typeProduct={typeProduct}
              handleUpdate={refetch}
            />
          ))
        ) : (
          <p className="text-muted-foreground text-sm">Aucun produit trouvé.</p>
        )}
      </div>
    </div>
  );
}

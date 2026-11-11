'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { UiDialog } from '@/components/ui/UiDialog';
import { Trash2, Loader2, AlertCircle } from 'lucide-react';
import { useDeleteProduct } from '@/hooks/products/useDeleteProduct';
import { Product } from '@/lib/types/Product';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';

type DeleteProductDialogProps = {
  product: Product;
  trigger: React.ReactNode;
};

export function DeleteProductDialog({
  product,
  trigger,
}: DeleteProductDialogProps) {
  const [openDelete, setOpenDelete] = useState(false);
  const deleteProduct = useDeleteProduct();

  console.log('PRODUCT DELETE DIOLAOF', product);
  const handleDelete = () => {
    deleteProduct.mutate(product.id, {
      onSuccess: () => {
        setOpenDelete(false);
      },
    });
  };

  return (
    <UiDialog
      open={openDelete}
      setOpen={setOpenDelete}
      title="Suppression de produit"
      description={`Suppression du produit ${product?.name}`}
      icon={Trash2}
      height="sm"
      trigger={trigger}
    >
      <div className="space-y-2 text-sm text-muted-foreground">
        <p>Voici les informations du produit :</p>
        <ul className="list-disc list-inside space-y-1">
          <li>
            <strong>ID :</strong> {product?.id}
          </li>

          <li>
            <strong>Nom :</strong> {product?.name}
          </li>
          <li>
            <strong>Type :</strong> {product?.type}
          </li>
          <li>
            <strong>Description :</strong> {product?.description}
          </li>
          <li>
            <strong>Statut :</strong> {product?.status}
          </li>
          <li>
            <strong>Dernière mise à jour :</strong> {product?.updatedAt} par{' '}
            {product?.updatedBy}
          </li>
        </ul>
      </div>

      <Alert variant="destructive">
        <AlertCircle />
        <AlertTitle>
          Êtes-vous sûr de vouloir supprimer ce produit ? Cette action est
          irréversible.
        </AlertTitle>
      </Alert>

      <Separator />
      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={() => setOpenDelete(false)}>
          Annuler
        </Button>
        <Button
          variant="destructive"
          onClick={handleDelete}
          disabled={deleteProduct.isPending}
          className="flex items-center gap-2"
        >
          {deleteProduct.isPending && (
            <Loader2 className="w-4 h-4 animate-spin" />
          )}
          {deleteProduct.isPending
            ? 'Suppression en cours...'
            : 'Confirmer la suppression'}
        </Button>
      </div>
    </UiDialog>
  );
}

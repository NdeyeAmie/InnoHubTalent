import { ProductFormData, toFormData, Product } from '@/lib/types/Product';

// 🔹 Récupérer la liste des produits
export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch('/api/products');
  if (!res.ok) throw new Error('Erreur lors du chargement des produits');
  return res.json();
}

// 🔹 Ajouter un produit
export async function createProduct(data: ProductFormData): Promise<Product> {
  const formData = toFormData(data);

  const res = await fetch('/api/products', {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData?.error || 'Erreur lors de la création du produit');
  }

  return res.json();
}

// 🔹 Mettre à jour un produit
export async function updateProduct(
  id: string,
  data: ProductFormData
): Promise<Product> {
  const formData = toFormData(data);

  const res = await fetch(`/api/products/${id}`, {
    method: 'PUT',
    body: formData,
  });

  if (!res.ok) {
    const { error } = await res.json().catch(() => ({}));
    throw new Error(error || 'Erreur lors de la mise à jour du produit');
  }

  return res.json();
}

// 🔹 Supprimer un produit
export async function deleteProduct(id: string): Promise<{ success: boolean }> {
  const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
  console.log('API deleteProduct', res);
  if (!res.ok) {
    const { error } = await res.json().catch(() => ({}));
    throw new Error(error || 'Erreur lors de la suppression du produit');
  }

  return { success: true };
}

'use client';

import { PageContainer } from '@/components/layout/PageContainer';
import { Layout } from '@/components/layout/Layout';
import AddProductDialog from '@/components/products/AddProductDialog';
import { ProductsTable } from '@/components/products/ProductsTable';
import { Button } from '@/components/ui/button';
import { LayoutGrid } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { LoadingDoubleSpinner } from '@/components/ui/loadingDoubleSpinner';
import { useAuth } from '@/hooks/useAuth';

export default function ProductsPage() {
  const router = useRouter();

  const { user, isConsultant, loading } = useAuth();

  if (loading) {
    return <LoadingDoubleSpinner message="Gestion des Utilisateurs ..." />;
  }

  if (!user) {
    return (
      <p className="text-red-500 text-center mt-10">
        Utilisateur non authentifié
      </p>
    );
  }

  return (
    <Layout>
      <PageContainer
        title="Gestion des Produits"
        description="✨ Retrouvez ici l’ensemble des produits disponibles sur la plateforme : robots, workflows et applications. 
        Vous pouvez les consulter, en suivre l’évolution, en créer de nouveaux ou en modifier selon vos besoins. ✨"
        action={
          <div className="space-x-2">
            {!isConsultant && <AddProductDialog />}

            <Button variant="outline" onClick={() => router.push('/home')}>
              <LayoutGrid className="mr-2" />
              Afficher les Cartes
            </Button>
          </div>
        }
      >
        <ProductsTable />
      </PageContainer>
    </Layout>
  );
}

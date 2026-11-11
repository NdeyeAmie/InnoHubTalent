'use client';

import { Layout } from '@/components/layout/Layout';
import { PageContainer } from '@/components/layout/PageContainer';
import { LoadingDoubleSpinner } from '@/components/ui/loadingDoubleSpinner';
import { AddUserDialog } from '@/components/users/AddUserDialog';
import { UsersTable } from '@/components/users/UsersTable';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

export default function UsersPage() {
  const { user, isConsultant, isProductManager, loading } = useAuth();
  const router = useRouter();

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

  if (isConsultant) {
    router.push('/unauthorized');
    return null;
  }

  return (
    <Layout>
      <PageContainer
        title="Gestion des Utilisateurs"
        description="✨ Retrouvez ici l’ensemble des utilisateurs de la plateforme. 
        Vous pouvez consulter leurs informations, gérer leurs rôles et statuts,
        ainsi qu’ajouter ou modifier des comptes selon vos besoins. ✨"
        action={!isConsultant && !isProductManager && <AddUserDialog />}
      >
        <UsersTable />
      </PageContainer>
    </Layout>
  );
}

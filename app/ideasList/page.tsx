'use client';

import { Layout } from '@/components/layout/Layout';
import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { PageContainer } from '@/components/layout/PageContainer';
import { IdeasTable } from '@/components/ideas/IdeasTable';
import { useAuth } from '@/hooks/useAuth';
import { LoadingDoubleSpinner } from '@/components/ui/loadingDoubleSpinner';
import AddIdeasDialog from '@/components/ideas/AddIdeasDialog'; // <-- Ajout de l'import

export default function IdeasAIPage() {
  const router = useRouter();
  const { isConsultant, loading } = useAuth();

  if (loading) {
    return <LoadingDoubleSpinner message="Gestion des Utilisateurs ..." />;
  }

  if (isConsultant) {
    router.push('/unauthorized');
    return null;
  }

  return (
    <Layout>
      <PageContainer
        title="Listes des Idées de Produits"
        description="✨ Retrouvez ici toutes les idées de produits proposées. 
        Vous pouvez explorer leurs descriptions, analyser les bénéfices attendus, 
        et suivre leur avancement pour identifier les plus prometteuses. ✨"
        action={
          <div className="flex gap-4">
            <AddIdeasDialog />
            <Button
              variant="outline"
              onClick={() => router.push('/ideasAI')}
              className="flex items-center gap-2 px-6 py-3 text-lg font-bold text-white 
                bg-gradient-to-r from-blue-800 via-blue-500 to-cyan-400
                hover:from-cyan-400 hover:via-blue-500 hover:to-blue-800 hover:text-white
                shadow-lg shadow-purple-300/50 rounded-xl transition-all duration-300 transform hover:scale-105"
            >
              <Sparkles className="w-6 h-6 text-white animate-pulse" />
              Demander de l'aide à l'IA
              <Sparkles className="w-6 h-6 text-white animate-pulse" />
            </Button>
          </div>
        }
      >
        <IdeasTable />
      </PageContainer>
    </Layout>
  );
}

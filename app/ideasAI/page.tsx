'use client';

import { Layout } from '@/components/layout/Layout';
import IdeaAIForm from '../../components/ideas/IdeaAIForm';
import { List, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { LoadingDoubleSpinner } from '@/components/ui/loadingDoubleSpinner';
import { useAuth } from '@/hooks/useAuth';

export default function IdeasAIPage() {
  const { isConsultant,  loading } = useAuth();
  const router = useRouter();

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center ">
          <LoadingDoubleSpinner message="Chargement ..." />
        </div>
      </Layout>
    );
  }

  if (isConsultant ) {
    router.push('/unauthorized');
    return null;
  }

  return (
    <Layout>
      <div className="container mx-auto py-10 px-5">
        <div className="mb-2 text-center">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center justify-center gap-2">
            <Sparkles className="w-6 h-6 text-yellow-500 animate-pulse delay-0" />
            <Sparkles className="w-6 h-6 text-yellow-500 animate-pulse delay-200" />
            <Sparkles className="w-6 h-6 text-yellow-500 animate-pulse delay-400" />

            <h1 className="animate-pulse delay-600 text-3xl font-bold bg-gradient-to-r from-blue-800 via-blue-500 to-cyan-400 text-transparent bg-clip-text">
              Assistant IA – Recueil d’Idées
            </h1>

            <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse delay-800" />
            <Sparkles className="w-6 h-6 text-yellow-500 animate-pulse delay-1000" />
            <Sparkles className="w-6 h-6 text-yellow-500 animate-pulse delay-1200" />
          </h1>
          <p className="text-gray-500 mt-2 text-sm">
            ✨ Décris ton idée, et laisse l’IA t’inspirer ✨
          </p>
        </div>

        <div className="flex justify-end mb-5 space-x-2">
          <Button variant="outline" onClick={() => router.push('/ideasList')}>
            <List className="mr-2" />
            Afficher la liste des idées
          </Button>
        </div>

        <IdeaAIForm />
      </div>
    </Layout>
  );
}

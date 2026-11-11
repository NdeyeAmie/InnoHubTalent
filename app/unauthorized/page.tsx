'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { ShieldAlert } from 'lucide-react';

export default function UnauthorizedPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-4">
      <div className="flex flex-col items-center gap-3">
        <ShieldAlert className="w-12 h-12 text-red-500" />
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
          Accès refusé
        </h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-md">
          Vous n’avez pas la permission d’accéder à cette page. Si vous pensez
          qu’il s’agit d’une erreur, contactez un administrateur.
        </p>
        <Button onClick={() => router.push('/home')} className="mt-4">
          Retour à l’accueil
        </Button>
      </div>
    </div>
  );
}

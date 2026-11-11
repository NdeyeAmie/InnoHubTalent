'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { UiDialog } from '@/components/ui/UiDialog';
import { Trash2, Loader2, AlertCircle } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { useDeleteIdea } from '@/hooks/ideas/useDeleteIdea';
import { toast } from 'sonner'; // ✅ Import du toast

type DeleteIdeasDialogProps = {
  idea: any;
  trigger: React.ReactNode;
  onDeleted?: () => void;
};

export function DeleteIdeasDialog({
  idea,
  trigger,
  onDeleted,
}: DeleteIdeasDialogProps) {
  const [openDelete, setOpenDelete] = useState(false);
  const deleteIdea = useDeleteIdea();
  const [isPending, setIsPending] = useState(false);

  const handleDelete = async () => {
    setIsPending(true);
    try {
      await deleteIdea.mutateAsync(idea.id);

      // ✅ Toast de succès
      toast.success('✅ Idée supprimée', {
        description: `${idea.title} a été supprimée avec succès.`,
      });

      setOpenDelete(false);
      onDeleted?.();
    } catch (error: any) {
      // ✅ Toast d'erreur
      toast.error('❌ Erreur lors de la suppression', {
        description: error?.message || 'Une erreur est survenue.',
      });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <UiDialog
      open={openDelete}
      setOpen={setOpenDelete}
      title="Suppression d'idée"
      description={`Suppression de l'idée "${idea?.title}"`}
      icon={Trash2}
      height="sm"
      trigger={trigger}
    >
      <div className="space-y-2 text-sm text-muted-foreground">
        <p>Voici les informations de l'idée :</p>
        <ul className="list-disc list-inside space-y-1">
          <li>
            <strong>ID :</strong> {idea?.id}
          </li>
          <li>
            <strong>Titre :</strong> {idea?.title}
          </li>
          <li>
            <strong>Auteur :</strong> {idea?.author}
          </li>
          <li>
            <strong>Description :</strong> {idea?.description}
          </li>
          <li>
            <strong>Problèmatique :</strong> {idea?.problem}
          </li>
          <li>
            <strong>Dernière mise à jour :</strong> {idea?.updatedAt}
          </li>
        </ul>
      </div>

      <Alert variant="destructive">
        <AlertCircle />
        <AlertTitle>
          Êtes-vous sûr de vouloir supprimer cette idée ? Cette action est irréversible.
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
          disabled={isPending}
          className="flex items-center gap-2"
        >
          {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
          {isPending ? 'Suppression en cours...' : 'Confirmer la suppression'}
        </Button>
      </div>
    </UiDialog>
  );
}
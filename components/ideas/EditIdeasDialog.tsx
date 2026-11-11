'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Pencil } from 'lucide-react';
import { UiDialog } from '../ui/UiDialog';
import { useUpdateIdea } from '@/hooks/ideas/useUpdateIdea'; // ✅ Chemin corrigé
import { toast } from 'sonner'; // ✅ Import du toast

export default function EditIdeasDialog({ idea, onEdit }: { idea: any; onEdit?: (updated: any) => void }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ ...idea });

  const mutation = useUpdateIdea(); // ✅ Utilise le hook corrigé

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setForm({ ...idea }); // ✅ Remet les valeurs originales
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ Utilise la mutation avec callbacks
    mutation.mutate(
      { id: idea.id, data: form },
      {
        onSuccess: (data) => {
          toast.success('✅ Idée modifiée', {
            description: `${data.title} a été mise à jour avec succès.`,
          });
          setOpen(false); // ✅ Ferme le dialog
          onEdit?.(data); // ✅ Callback optionnel
        },
        onError: (err: any) => {
          toast.error('❌ Erreur lors de la modification', {
            description: err.message,
          });
        },
      }
    );
  };

  return (
    <UiDialog
      open={open}
      setOpen={setOpen}
      title="Modifier l'idée"
      description="Modifiez les informations de cette idée de produit."
      icon={Pencil}
      height="xl"
      trigger={
        <Button variant="ghost" className="w-full justify-start px-2 py-1">
          <Pencil className="w-4 h-4 mr-2" />
          Modifier
        </Button>
      }
    >
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-4">
        {/* Titre */}
        <div className="space-y-2 md:col-span-2">
          <label className="font-medium text-black">
            Titre <span className="text-red-500">*</span>
          </label>
          <Input
            name="title"
            value={form.title || ''}
            onChange={handleChange}
            required
            className="w-full"
          />
        </div>
        {/* Date de soumission */}
        <div className="space-y-2">
          <label className="font-medium text-black">Date de soumission</label>
          <Input
            name="submissionDate"
            value={form.submissionDate || ''}
            onChange={handleChange}
            type="date"
            className="w-full"
          />
        </div>
        {/* Auteur */}
        <div className="space-y-2">
          <label className="font-medium text-black">Auteur</label>
          <Input
            name="author"
            value={form.author || ''}
            onChange={handleChange}
            className="w-full"
          />
        </div>
        {/* Problèmatique */}
        <div className="space-y-2 md:col-span-2">
          <label className="font-medium text-black">Problèmatique</label>
          <Textarea
            name="problem"
            value={form.problem || ''}
            onChange={handleChange}
            rows={2}
            className="w-full"
          />
        </div>
        {/* Clients cibles */}
        <div className="space-y-2 md:col-span-2">
          <label className="font-medium text-black">Clients cibles</label>
          <Textarea
            name="targetClients"
            value={form.targetClients || ''}
            onChange={handleChange}
            rows={2}
            className="w-full"
          />
        </div>
        {/* Description */}
        <div className="space-y-2 md:col-span-4">
          <label className="font-medium text-black">Description</label>
          <Textarea
            name="description"
            value={form.description || ''}
            onChange={handleChange}
            rows={3}
            className="w-full"
          />
        </div>
        {/* Bénéfices Attendues */}
        <div className="space-y-2 md:col-span-2">
          <label className="font-medium text-black">Bénéfices Attendues</label>
          <Textarea
            name="excpetedBeneficts"
            value={form.excpetedBeneficts || ''}
            onChange={handleChange}
            rows={2}
            className="w-full"
          />
        </div>
        {/* Produits Similaires */}
        <div className="space-y-2 md:col-span-2">
          <label className="font-medium text-black">Produits Similaires</label>
          <Textarea
            name="similarProducts"
            value={form.similarProducts || ''}
            onChange={handleChange}
            rows={2}
            className="w-full"
          />
        </div>
        {/* Différences */}
        <div className="space-y-2 md:col-span-2">
          <label className="font-medium text-black">Différences</label>
          <Textarea
            name="differentiators"
            value={form.differentiators || ''}
            onChange={handleChange}
            rows={2}
            className="w-full"
          />
        </div>
        {/* Ressources */}
        <div className="space-y-2 md:col-span-2">
          <label className="font-medium text-black">Ressources</label>
          <Textarea
            name="resourcesNeeded"
            value={form.resourcesNeeded || ''}
            onChange={handleChange}
            rows={2}
            className="w-full"
          />
        </div>
        {/* Priorité */}
        <div className="space-y-2">
          <label className="font-medium text-black">Priorité</label>
          <Input
            name="priority"
            value={form.priority || ''}
            onChange={handleChange}
            className="w-full"
          />
        </div>
        {/* Commentaires du Comité */}
        <div className="space-y-2 md:col-span-3">
          <label className="font-medium text-black">Commentaires du Comité</label>
          <Textarea
            name="committeeComment"
            value={form.committeeComment || ''}
            onChange={handleChange}
            rows={2}
            className="w-full"
          />
        </div>
        {/* Fonctionnalités */}
        <div className="space-y-2 md:col-span-2">
          <label className="font-medium text-black">Fonctionnalités</label>
          <Textarea
            name="features"
            value={form.features || ''}
            onChange={handleChange}
            rows={2}
            className="w-full"
          />
        </div>
        {/* Etapes MVP */}
        <div className="space-y-2 md:col-span-2">
          <label className="font-medium text-black">Etapes MVP</label>
          <Textarea
            name="mvpSteps"
            value={form.mvpSteps || ''}
            onChange={handleChange}
            rows={2}
            className="w-full"
          />
        </div>
        {/* Dates */}
        <div className="space-y-2">
          <label className="font-medium text-black">Créée le</label>
          <Input
            name="createdAt"
            value={form.createdAt || ''}
            onChange={handleChange}
            type="date"
            className="w-full"
            readOnly
          />
        </div>
        <div className="space-y-2">
          <label className="font-medium text-black">Mise à jour le</label>
          <Input
            name="updatedAt"
            value={form.updatedAt || ''}
            onChange={handleChange}
            type="date"
            className="w-full"
            readOnly
          />
        </div>
        <Separator className="my-5 md:col-span-4" />
        <div className="flex gap-3 md:col-span-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
            className="flex-1"
          >
            Annuler
          </Button>
          <Button
            type="submit"
            className="flex-1"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? 'Modification en cours...' : 'Enregistrer'}
          </Button>
        </div>
      </form>
    </UiDialog>
  );
}
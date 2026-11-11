'use client';

import { useState } from 'react';
import { UiDialog } from '../ui/UiDialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { PlusCircle } from 'lucide-react';
import { useAddIdea } from '@/hooks/ideas/useAddIdea';
import { toast } from 'sonner';

export default function AddIdeasDialog({ initialData, onSubmit }: { initialData?: any; onSubmit?: (idea: any) => void }) {
  const [open, setOpen] = useState(false); // ✅ État du dialog
  
  const [form, setForm] = useState({
    title: initialData?.title || '',
    submissionDate: initialData?.submissionDate || '',
    author: initialData?.author || '',
    description: initialData?.description || '',
    problem: initialData?.problem || '',
    targetClients: initialData?.targetClients || '',
    excpetedBeneficts: initialData?.excpetedBeneficts || '',
    similarProducts: initialData?.similarProducts || '',
    differentiators: initialData?.differentiators || '',
    resourcesNeeded: initialData?.resourcesNeeded || '',
    priority: initialData?.priority || '',
    committeeComment: initialData?.committeeComment || '',
    features: initialData?.features || '',
    mvpSteps: initialData?.mvpSteps || '',
    createdAt: initialData?.createdAt || '',
    updatedAt: initialData?.updatedAt || '',
  });

  const mutation = useAddIdea(); // ✅ Utilise le hook

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Fonction pour réinitialiser le formulaire
  const resetForm = () => {
    setForm({
      title: '',
      submissionDate: '',
      author: '',
      description: '',
      problem: '',
      targetClients: '',
      excpetedBeneficts: '',
      similarProducts: '',
      differentiators: '',
      resourcesNeeded: '',
      priority: '',
      committeeComment: '',
      features: '',
      mvpSteps: '',
      createdAt: '',
      updatedAt: '',
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // ✅ Utilise la mutation avec callbacks
    mutation.mutate(form, {
      onSuccess: (data) => {
        toast.success('✅ Idée créée', {
          description: `${data.title} ajoutée avec succès.`,
        });
        resetForm();      // ✅ 1. Réinitialise le formulaire
        setOpen(false);   // ✅ 2. Ferme the dialog
        onSubmit?.(data); // ✅ 3. Callback optionnel
      },
      onError: (err: any) => {
        toast.error('❌ Erreur lors de l\'ajout', {
          description: err.message,
        });
      },
    });
  };

  return (
    <UiDialog
      open={open}         // ✅ Contrôle l'état d'ouverture
      setOpen={setOpen}   // ✅ Permet la fermeture
      title="Ajouter une idée"
      description="Remplissez les informations ci-dessous pour ajouter une nouvelle idée de produit."
      icon={PlusCircle}
      height="xl"
      trigger={
        <Button>
          <PlusCircle className="w-4 h-4 mr-2" />
          Ajouter une idée
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
            value={form.title}
            onChange={handleChange}
            placeholder="Titre de l'idée"
            required
            className="w-full"
          />
        </div>
        {/* Date de soumission */}
        <div className="space-y-2">
          <label className="font-medium text-black">Date de soumission</label>
          <Input
            name="submissionDate"
            value={form.submissionDate}
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
            value={form.author}
            onChange={handleChange}
            placeholder="Auteur"
            className="w-full"
          />
        </div>
        {/* Problèmatique */}
        <div className="space-y-2 md:col-span-2">
          <label className="font-medium text-black">Problèmatique</label>
          <Textarea
            name="problem"
            value={form.problem}
            onChange={handleChange}
            placeholder="Problèmatique"
            rows={2}
            className="w-full"
          />
        </div>
        {/* Clients cibles */}
        <div className="space-y-2 md:col-span-2">
          <label className="font-medium text-black">Clients cibles</label>
          <Textarea
            name="targetClients"
            value={form.targetClients}
            onChange={handleChange}
            placeholder="Clients cibles"
            rows={2}
            className="w-full"
          />
        </div>
        {/* Description */}
        <div className="space-y-2 md:col-span-4">
          <label className="font-medium text-black">Description</label>
          <Textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            rows={3}
            className="w-full"
          />
        </div>
        {/* Bénéfices Attendues */}
        <div className="space-y-2 md:col-span-2">
          <label className="font-medium text-black">Bénéfices Attendues</label>
          <Textarea
            name="excpetedBeneficts"
            value={form.excpetedBeneficts}
            onChange={handleChange}
            placeholder="Bénéfices Attendues"
            rows={2}
            className="w-full"
          />
        </div>
        {/* Produits Similaires */}
        <div className="space-y-2 md:col-span-2">
          <label className="font-medium text-black">Produits Similaires</label>
          <Textarea
            name="similarProducts"
            value={form.similarProducts}
            onChange={handleChange}
            placeholder="Produits Similaires"
            rows={2}
            className="w-full"
          />
        </div>
        {/* Différences */}
        <div className="space-y-2 md:col-span-2">
          <label className="font-medium text-black">Différences</label>
          <Textarea
            name="differentiators"
            value={form.differentiators}
            onChange={handleChange}
            placeholder="Différences"
            rows={2}
            className="w-full"
          />
        </div>
        {/* Ressources */}
        <div className="space-y-2 md:col-span-2">
          <label className="font-medium text-black">Ressources</label>
          <Textarea
            name="resourcesNeeded"
            value={form.resourcesNeeded}
            onChange={handleChange}
            placeholder="Ressources"
            rows={2}
            className="w-full"
          />
        </div>
        {/* Priorité */}
        <div className="space-y-2">
          <label className="font-medium text-black">Priorité</label>
          <Input
            name="priority"
            value={form.priority}
            onChange={handleChange}
            placeholder="Priorité"
            className="w-full"
          />
        </div>
        {/* Commentaires du Comité */}
        <div className="space-y-2 md:col-span-3">
          <label className="font-medium text-black">Commentaires du Comité</label>
          <Textarea
            name="committeeComment"
            value={form.committeeComment}
            onChange={handleChange}
            placeholder="Commentaires du Comité"
            rows={2}
            className="w-full"
          />
        </div>
        {/* Fonctionnalités */}
        <div className="space-y-2 md:col-span-2">
          <label className="font-medium text-black">Fonctionnalités</label>
          <Textarea
            name="features"
            value={form.features}
            onChange={handleChange}
            placeholder="Fonctionnalités"
            rows={2}
            className="w-full"
          />
        </div>
        {/* Etapes MVP */}
        <div className="space-y-2 md:col-span-2">
          <label className="font-medium text-black">Etapes MVP</label>
          <Textarea
            name="mvpSteps"
            value={form.mvpSteps}
            onChange={handleChange}
            placeholder="Etapes MVP"
            rows={2}
            className="w-full"
          />
        </div>
        {/* Dates */}
        <div className="space-y-2">
          <label className="font-medium text-black">Créée le</label>
          <Input
            name="createdAt"
            value={form.createdAt}
            onChange={handleChange}
            type="date"
            className="w-full"
          />
        </div>
        <div className="space-y-2">
          <label className="font-medium text-black">Mise à jour le</label>
          <Input
            name="updatedAt"
            value={form.updatedAt}
            onChange={handleChange}
            type="date"
            className="w-full"
          />
        </div>
        {/* Séparateur et bouton */}
        <Separator className="my-5 md:col-span-4" />
        <Button 
          type="submit" 
          className="w-full md:col-span-4"
          disabled={mutation.isPending} // ✅ Désactivé pendant l'ajout
        >
          {mutation.isPending ? 'Ajout en cours...' : 'Valider'} {/* ✅ Texte dynamique */}
        </Button>
      </form>
    </UiDialog>
  );
}
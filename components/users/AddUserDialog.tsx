'use client';

import * as React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { Loader2, UserRoundPlus } from 'lucide-react';
import { useCreateUser } from '@/hooks/users/useAddUser';
import { Separator } from '../ui/separator';
import { Label } from '../ui/label';
import { UiDialog } from '../ui/UiDialog';
import { STATUS_OPTIONS } from '@/lib/types/Status';
import { useAuth } from '@/hooks/useAuth';
import { ROLES_OPTIONS, ROLES2_OPTIONS } from '@/lib/types/Role';

export function AddUserDialog() {
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [firstname, setFirstname] = React.useState('');
  const [lastname, setLastname] = React.useState('');
  const [role, setRole] = React.useState('CONSULTANT');
  const [department, setDepartment] = React.useState('');
  const [status, setStatus] = React.useState('ACTIVE');

  const mutation = useCreateUser();

  // Récupère l'utilisateur actuellement connecté
  const { user: currentUser } = useAuth();

  // Détermine la liste des rôles à afficher
  const rolesToShow =
    currentUser?.role === 'ADMIN' ? ROLES2_OPTIONS : ROLES_OPTIONS;

  const resetForm = () => {
    setEmail('');
    setFirstname('');
    setLastname('');
    setRole('CONSULTANT');
    setDepartment('');
    setStatus('ACTIVE');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(
      {
        email,
        firstname,
        lastname,
        password: '123',
        role,
        department,
        status,
      },
      {
        onSuccess: (data) => {
          toast.success('✅ Utilisateur créé', {
            description: `${data.firstname} ${data.lastname} ajouté avec succès.`,
          });
          resetForm();
          setOpen(false);
        },
        onError: (err: any) => {
          toast.error('❌ Erreur lors de l’ajout', {
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
      title="Ajouter un Nouvel Utilisateur"
      description="Remplissez les informations ci-dessous pour ajouter un nouvel utilisateur."
      icon={UserRoundPlus}
      size="2xl"
      height="xl"
      trigger={
        <Button>
          <UserRoundPlus className="w-4 h-4 mr-2" />
          Ajouter Nouvel Utilisateur
        </Button>
      }
    >
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4"
      >
        <div className="space-y-2 md:col-span-2">
          <Label>Email</Label>
          <Input
            placeholder="test@email.com"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label>Prénom</Label>
          <Input
            placeholder="prénom de l'utilisateur"
            type="text"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label>Nom</Label>
          <Input
            placeholder="nom de l'utilisateur"
            type="text"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
        </div>
        {/* Rôle */}
        <div className="space-y-2">
          <Label>Rôle</Label>
          <Select value={role} onValueChange={setRole}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Sélectionner un rôle" />
            </SelectTrigger>
            <SelectContent>
              {rolesToShow.map((r) => (
                <SelectItem key={r.value} value={r.value}>
                  {r.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Status */}
        <div className="space-y-2">
          <Label>Status</Label>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Sélectionner un status" />
            </SelectTrigger>
            <SelectContent>
              {STATUS_OPTIONS.map((s) => (
                <SelectItem key={s.value} value={s.value}>
                  {s.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label>Département</Label>
          <Input
            placeholder="département de l'utilisateur"
            type="text"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          />
        </div>
        <Separator className="my-5 md:col-span-2" />

        <Button
          className="w-full flex items-center justify-center gap-2 md:col-span-2"
          type="submit"
          disabled={mutation.isPending}
        >
          {mutation.isPending && <Loader2 className="w-4 h-4 animate-spin" />}
          {mutation.isPending
            ? `Création de l'utilisateur`
            : `Créer l'utilisateur`}
        </Button>
      </form>
    </UiDialog>
  );
}

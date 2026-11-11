'use client';

import * as React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Loader2, UserPen, Lock } from 'lucide-react';
import { useUpdateUser } from '@/hooks/users/useUpdateUser';
import { Separator } from '../ui/separator';
import { Label } from '../ui/label';
import { UiDialog } from '../ui/UiDialog';
import { STATUS_OPTIONS } from '@/lib/types/Status';
import { ROLES_OPTIONS, ROLES2_OPTIONS } from '@/lib/types/Role';
import { User } from '@/lib/types/User';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { useAuth } from '@/hooks/useAuth';

type EditUserDialogProps = {
  user: User;
};

export function EditUserDialog({ user }: EditUserDialogProps) {
  const [open, setOpen] = React.useState(false);
  // ❌ Supprimé l'état email car non modifiable
  const [firstname, setFirstname] = React.useState(user.firstname);
  const [lastname, setLastname] = React.useState(user.lastname);
  const [role, setRole] = React.useState(user.role ?? 'CONSULTANT');
  const [department, setDepartment] = React.useState(user.department ?? '');
  const [status, setStatus] = React.useState(user.status ?? 'ACTIVE');

  const mutation = useUpdateUser(user.id);

  // Récupère l'utilisateur actuellement connecté
  const { user: currentUser, loading } = useAuth();
  React.useEffect(() => {
    console.log('Utilisateur actuellement connecté :', currentUser);
  }, [currentUser]);

  // Détermine la liste des rôles à afficher
  const rolesToShow =
    currentUser?.role === 'ADMIN' ? ROLES2_OPTIONS : ROLES_OPTIONS;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // ✅ N'envoie plus l'email dans la mutation
    mutation.mutate(
      { firstname, lastname, role, department, status },
      {
        onSuccess: () => {
          toast.success('✅ Utilisateur mis à jour', {
            description: `${firstname} ${lastname} a été modifié avec succès.`,
          });
          setOpen(false);
        },
        onError: (err: any) => {
          toast.error('❌ Erreur lors de la mise à jour', {
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
      title="Modification de l'utilisateur"
      description="Modifiez les informations ci-dessous puis enregistrez."
      icon={UserPen}
      height="xl"
      trigger={
        <Button variant="ghost" className="-ml-1 flex items-center">
          <UserPen className="w-4 h-4 mr-2" />
          Modifier
        </Button>
      }
    >
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4"
      >
        {/* Prénom */}
        <div className="space-y-2 md:col-span-2">
          <Label>Prénom</Label>
          <Input
            type="text"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            placeholder="Prénom"
            required
          />
        </div>

        {/* Nom */}
        <div className="space-y-2 md:col-span-2">
          <Label>Nom</Label>
          <Input
            type="text"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            placeholder="Nom"
            required
          />
        </div>

        {/* Email - EN LECTURE SEULE */}
        <div className="space-y-2 md:col-span-2">
          <Label className="flex items-center gap-2">
            Email
            <Lock className="w-3 h-3 text-gray-500" /> {/* ✅ Icône de verrouillage */}
            <span className="text-xs text-gray-500">(non modifiable)</span>
          </Label>
          <Input
            type="email"
            value={user.email} // ✅ Valeur fixe depuis user.email
            placeholder="Email"
            disabled // ✅ Champ désactivé
            className="bg-gray-50 text-gray-600 cursor-not-allowed" // ✅ Style visuel disabled
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

        {/* Département */}
        <div className="space-y-2 md:col-span-2">
          <Label>Département</Label>
          <Input
            type="text"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            placeholder="Département"
          />
        </div>

        <Separator className="my-5 md:col-span-2" />

        {/* Submit */}
        <Button
          className="w-full flex items-center justify-center gap-2 md:col-span-2"
          type="submit"
          disabled={mutation.isPending}
        >
          {mutation.isPending && <Loader2 className="w-4 h-4 animate-spin" />}
          {mutation.isPending ? 'Mise à jour...' : 'Enregistrer'}
        </Button>
      </form>
    </UiDialog>
  );
}

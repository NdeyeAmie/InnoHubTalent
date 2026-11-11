'use client';

import * as React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DropdownMenuItem } from '../ui/dropdown-menu';
import { KeyRound, Eye, EyeOff } from 'lucide-react';
import { Label } from '../ui/label';
import { useUpdatePassword } from '@/hooks/users/useUpdatePassword';
import { Separator } from '../ui/separator';
import { UiDialog } from '../ui/UiDialog';

export function UpdatePasswordDialog() {
  const [open, setOpen] = React.useState(false);
  const [oldPassword, setOldPassword] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [success, setSuccess] = React.useState<string | null>(null);

  // Ajout de l'état pour afficher/cacher les mots de passe
  const [showOld, setShowOld] = React.useState(false);
  const [showNew, setShowNew] = React.useState(false);
  const [showConfirm, setShowConfirm] = React.useState(false);

  const mutation = useUpdatePassword();

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(null);

    if (newPassword !== confirmPassword) {
      mutation.reset();
      mutation.error = new Error('Les mots de passe ne correspondent pas.');
      return;
    }

    mutation.mutate(
      { oldPassword, newPassword },
      {
        onSuccess: () => {
          setSuccess('Mot de passe changé avec succès ✅');
          setOldPassword('');
          setNewPassword('');
          setConfirmPassword('');
          setOpen(false);
        },
      }
    );
  };

  return (
    <UiDialog
      open={open}
      setOpen={setOpen}
      title="Modifier le mot de passe"
      description="Entrez votre ancien mot de passe et définissez-en un nouveau."
      icon={KeyRound}
      trigger={
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <KeyRound className="mr-2 h-4 w-4" />
          Modifier mot de passe
        </DropdownMenuItem>
      }
      size="md"
    >
      <form onSubmit={handleChangePassword} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="oldPassword">Ancien mot de passe</Label>
          <div className="relative">
            <Input
              id="oldPassword"
              type={showOld ? 'text' : 'password'}
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground"
              tabIndex={-1}
              onClick={() => setShowOld((v) => !v)}
            >
              {showOld ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="newPassword">Nouveau mot de passe</Label>
          <div className="relative">
            <Input
              id="newPassword"
              type={showNew ? 'text' : 'password'}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground"
              tabIndex={-1}
              onClick={() => setShowNew((v) => !v)}
            >
              {showNew ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirm ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground"
              tabIndex={-1}
              onClick={() => setShowConfirm((v) => !v)}
            >
              {showConfirm ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {mutation.error && (
          <p className="text-red-500 text-sm">
            {(mutation.error as Error).message}
          </p>
        )}
        {success && <p className="text-green-500 text-sm">{success}</p>}

        <Separator />

        <Button type="submit" className="w-full" disabled={mutation.isLoading}>
          {mutation.isLoading ? 'Changement...' : 'Changer le mot de passe'}
        </Button>
      </form>
    </UiDialog>
  );
}

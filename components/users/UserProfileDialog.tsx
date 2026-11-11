'use client';

import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenuItem, DropdownMenuSeparator } from '../ui/dropdown-menu';
import { User as UserIcon } from 'lucide-react';
import { User } from '@/lib/types/User';

export function UserProfileDialog({
  user,
}: {
  user: User & { avatar?: string };
}) {
  const displayName =
    (user.firstname && user.lastname
      ? `${user.firstname} ${user.lastname}`
      : user.firstname || user.lastname || user.email.split('@')[0]) ??
    'Utilisateur';

  const initials = [
    user.firstname?.charAt(0) ?? '',
    user.lastname?.charAt(0) ?? '',
  ]
    .join('')
    .toUpperCase();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <UserIcon />
          Mon Profil
        </DropdownMenuItem>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Avatar className="h-10 w-10 rounded-lg">
              <AvatarImage src={user.avatar || ''} alt={displayName} />
              <AvatarFallback>{initials || '?'}</AvatarFallback>
            </Avatar>
            <span className="text-lg font-medium">{displayName}</span>
          </DialogTitle>
          <DropdownMenuSeparator />
        </DialogHeader>

        <div className="space-y-3">
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          {user.role && (
            <p>
              <strong>Rôle:</strong> {user.role}
            </p>
          )}
          {user.department && (
            <p>
              <strong>Département:</strong> {user.department}
            </p>
          )}
          {user.status && (
            <p>
              <strong>Status:</strong> {user.status}
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

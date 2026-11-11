'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Eye,
  Loader,
  MoreHorizontal,
  ShieldCheck,
  ShieldOff,
} from 'lucide-react';
import { ColumnDef } from '@tanstack/react-table';

import { User } from '@/lib/types/User';
import { EditUserDialog } from '@/components/users/EditUserDialog';
import { UserActivitiesDialog } from '@/components/users/UserActivitiesDialog';
import { SortableHeader } from '@/components/table/SortableHeader';
import { useToggleUserStatus } from '@/hooks/users/useToggleUserStatus';
import { ROLES_OPTIONS } from '@/lib/types/Role';

function formatDate(value: unknown) {
  if (!value) return '-';
  const date = value instanceof Date ? value : new Date(value);
  if (isNaN(date.getTime())) return '-';
  // Sépare la date et l'heure pour insérer "à"
  const datePart = date.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const timePart = date.toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
  return `${datePart} à ${timePart}`;
}

export const columns: ColumnDef<User>[] = [
  {
    id: 'actions',
    cell: ({ row }) => {
      const user = row.original;
      const toggleStatus = useToggleUserStatus();

      const handleToggle = () => {
        toggleStatus.mutate({
          id: user.id,
          status: user.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE',
        });
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel className="font-bold">Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <UserActivitiesDialog
                userId={user.id}
                trigger={
                  <Button
                    variant="ghost"
                    className="-ml-1 flex justify-start items-center w-full"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Voir activités
                  </Button>
                }
              />
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <EditUserDialog user={user} />
            </DropdownMenuItem>

            {user.status === 'ACTIVE' ? (
              <DropdownMenuItem
                onClick={handleToggle}
                className="text-red-700 hover:text-red-700 hover:bg-red-100 focus:text-red-700 focus:bg-red-100"
              >
                <ShieldOff className="w-4 h-4 mr-2 text-red-700" />
                Désactiver
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem
                onClick={handleToggle}
                className="text-green-700 hover:text-green-700 hover:bg-green-100 focus:text-green-700 focus:bg-green-100"
              >
                <ShieldCheck className="w-4 h-4 mr-2 text-green-700" />
                Activer
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },

  {
    accessorKey: 'lastname',
    minSize: 270,
    size: 270,
    header: ({ column }) => <SortableHeader column={column} title="Nom" />,
    cell: ({ row }) => (
      <span className="font-bold">{row.getValue('lastname')}</span>
    ),
  },
  {
    accessorKey: 'firstname',
    // header: 'Prénom',
    header: ({ column }) => <SortableHeader column={column} title="Prénom" />,
    cell: ({ row }) => (
      <span className="font-bold">{row.getValue('firstname')}</span>
    ),
  },

  {
    accessorKey: 'status',
    header: ({ column }) => <SortableHeader column={column} title="Statut" />,
    cell: ({ row }) => {
      const status = row.original.status as string | undefined;
      if (!status) {
        return (
          <Badge
            variant="outline"
            className="text-muted-foreground px-2 py-0.5"
          >
            —
          </Badge>
        );
      }

      const config: Record<
        string,
        { className: string; icon: React.ReactNode }
      > = {
        ACTIVE: {
          className: 'border border-green-700 text-green-700',
          icon: <ShieldCheck className="mr-1" />,
        },
        INACTIVE: {
          className: 'border border-red-700 text-red-700 dark:text-red-400',
          icon: <ShieldOff className="w-4 h-4 mr-1" />,
        },
      };

      const { className, icon } = config[status] ?? {
        className: 'bg-gray-200 text-gray-800 dark:text-gray-300',
        icon: <Loader className="w-4 h-4 mr-1" />,
      };

      return (
        <Badge
          variant="outline"
          className={`rounded-full px-2 py-1 text-xs font-medium flex items-center ${className}`}
        >
          {icon}
          {status}
        </Badge>
      );
    },
  },

  {
    accessorKey: 'email',
    header: ({ column }) => <SortableHeader column={column} title="E-mail" />,
  },
  {
    accessorKey: 'role',
    header: ({ column }) => <SortableHeader column={column} title="Rôle" />,
    cell: ({ getValue }) => {
      const role = getValue() as string | undefined;
      if (!role) return <Badge>—</Badge>;

      const roleOption = ROLES_OPTIONS.find((r) => r.value === role);

      const colorVariants: Record<string, string> = {
        ADMINSYSTEM: 'bg-purple-500/20 text-purple-700',
        ADMIN: 'bg-red-500/20 text-red-700',
        PRODUCTMANAGER: 'bg-blue-500/20 text-blue-700',
        CONSULTANT: 'bg-gray-500/20 text-gray-700',
      };

      return (
        <Badge
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            colorVariants[role] ?? 'bg-gray-200 text-gray-800'
          }`}
        >
          {roleOption?.label ?? role}
        </Badge>
      );
    },
  },

  {
    accessorKey: 'department',
    header: ({ column }) => (
      <SortableHeader column={column} title="Département" />
    ),
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => <SortableHeader column={column} title="Créé le" />,
    cell: ({ getValue }) => formatDate(getValue()),
  },
  {
    accessorKey: 'updatedAt',
    header: ({ column }) => (
      <SortableHeader column={column} title="Mise à jour le" />
    ),
    cell: ({ getValue }) => formatDate(getValue()),
  },
];

// À placer temporairement dans un fichier de test ou dans ce fichier pour tester
export function MockUserActivitiesDialogs() {
  return (
    <div className="flex gap-4 p-4">
      <UserActivitiesDialog
        userId="mock-user-1"
        userName="Alice Dupont"
        trigger={<Button variant="outline">Voir activités Alice</Button>}
      />
      <UserActivitiesDialog
        userId="mock-user-2"
        userName="Bob Martin"
        trigger={<Button variant="outline">Voir activités Bob</Button>}
      />
    </div>
  );
}

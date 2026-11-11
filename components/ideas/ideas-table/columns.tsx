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
import {
  Eye,
  MoreHorizontal,
  ShieldCheck,
  ShieldOff,
  Trash2,
} from 'lucide-react';
import { ColumnDef } from '@tanstack/react-table';

import EditIdeasDialog from '@/components/ideas/EditIdeasDialog';
import { DeleteIdeasDialog } from '@/components/ideas/DeleteIdeasDialog';
import { Idea } from '@prisma/client';
import { SortableHeader } from '@/components/table/SortableHeader';
import { TruncatedCell } from '@/components/table/TruncatedCell';
import { formatDateToLocalString } from '@/utils/formatDateToLocalString';

export const columns: ColumnDef<Idea>[] = [
  {
    id: 'actions',
    enablePinning: true,
    cell: ({ row }) => {
      const idea = row.original;

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
            <DropdownMenuItem
              onClick={() => alert('EN COURS DE DEVELOPPEMENT ...')}
            >
              <Eye className="w-4 h-4 mr-2" />
              Voir activités
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <EditIdeasDialog idea={idea} />
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <DeleteIdeasDialog
                idea={idea}
                trigger={
                  <Button
                    variant="ghost"
                    className="w-full justify-start px-2 py-1 text-red-700 hover:text-red-700 hover:bg-red-100"
                  >
                    <Trash2 className="w-4 h-4 mr-2 text-red-700" />
                    Supprimer
                  </Button>
                }
              />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  {
    accessorKey: 'title',
    header: ({ column }) => <SortableHeader column={column} title="Titre" />,
    cell: ({ row }) => (
      <TruncatedCell className="font-semibold">
        {row.getValue('title')}
      </TruncatedCell>
    ),
  },
  {
    accessorKey: 'submissionDate',
    header: ({ column }) => (
      <SortableHeader column={column} title="Date de Soumission" />
    ),
    cell: ({ getValue }) => (
      <span>
        {formatDateToLocalString(getValue())}
      </span>
    ),
  },
  {
    accessorKey: 'author',
    header: 'Auteur',
  },
  {
    accessorKey: 'description',
    header: 'Description',
  },
  {
    accessorKey: 'problem',
    header: ({ column }) => (
      <SortableHeader column={column} title="Problèmatique" />
    ),
    cell: ({ row }) => <TruncatedCell>{row.getValue('problem')}</TruncatedCell>,
  },
  {
    accessorKey: 'targetClients',
    header: ({ column }) => (
      <SortableHeader column={column} title="Clients cibles" />
    ),
    cell: ({ row }) => (
      <TruncatedCell>
        {row.getValue('targetClients')}
      </TruncatedCell>
    ),
  },

  {
    accessorKey: 'excpetedBeneficts',
    header: 'Bénéfices Attendues',
  },
  {
    accessorKey: 'similarProducts',
    header: ({ column }) => (
      <SortableHeader column={column} title="Produits Similaires" />
    ),
    cell: ({ row }) => (
      <TruncatedCell>
        {row.getValue('similarProducts')}
      </TruncatedCell>
    ),
  },
  {
    accessorKey: 'differentiators',
    header: 'Differences',
  },
  {
    accessorKey: 'resourcesNeeded',
    header: 'Ressources',
  },
  {
    accessorKey: 'priority',
    header: 'Priorité',
  },
  {
    accessorKey: 'committeeComment',
    header: ({ column }) => (
      <SortableHeader column={column} title="Commentaires du Comité" />
    ),
    cell: ({ row }) => (
      <TruncatedCell maxWidth="250px">
        {row.getValue('committeeComment')}
      </TruncatedCell>
    ),
  },
  {
    accessorKey: 'features',
    header: ({ column }) => (
      <SortableHeader column={column} title="Fonctinnalités" />
    ),
    cell: ({ row }) => (
      <TruncatedCell maxWidth="250px">
        {row
          .getValue('features')
          ?.map((f: { name: string; done: boolean }) => f.name)
          .join(', ')}
      </TruncatedCell>
    ),
  },
  {
    accessorKey: 'mvpSteps',
    header: ({ column }) => (
      <SortableHeader column={column} title="Etapes MVP" />
    ),
    cell: ({ row }) => (
      <TruncatedCell maxWidth="250px">{row.getValue('mvpSteps')}</TruncatedCell>
    ),
  },
  {
    accessorKey: 'roiEstimate',
    header: ({ column }) => (
      <SortableHeader column={column} title="Estimation ROI" />
    ),
  },
  {
    accessorKey: 'feasibility',
    header: ({ column }) => (
      <SortableHeader column={column} title="Faisabilité" />
    ),
  },
  {
    accessorKey: 'impact',
    header: ({ column }) => (
      <SortableHeader column={column} title="Impact" />
    ),
  },
  {
    accessorKey: 'riskLevel',
    header: ({ column }) => (
      <SortableHeader column={column} title="Niveau de Risque" />
    ),
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <SortableHeader column={column} title="Statut" />
    ),
  },
  {
    accessorKey: 'category',
    header: ({ column }) => (
      <SortableHeader column={column} title="Catégories" />
    ),
  },
  {
    accessorKey: 'votes',
    header: ({ column }) => (
      <SortableHeader column={column} title="Votes" />
    ),
  },

  {
    accessorKey: 'deadlineEstimate',
    header: ({ column }) => (
      <SortableHeader column={column} title="Deadline Estimé" />
    ),
  },

  {
    accessorKey: 'createdAt',
    header: () => <span>Créée le</span>,
    cell: ({ getValue }) => (
      <span>
        {formatDateToLocalString(getValue())}
      </span>
    ),
  },
  {
    accessorKey: 'updatedAt',
    header: () => <span>Mise à jour le</span>,
    cell: ({ getValue }) => (
      <span>
        {formatDateToLocalString(getValue())}
      </span>
    ),
  },
];

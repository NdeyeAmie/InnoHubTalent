import { ColumnDef } from '@tanstack/react-table';
import {
  ArrowUpDown,
  MoreHorizontal,
  Pencil,
  Trash,
  Play,
  FileText,
  BookOpen,
  Info,
  CheckCircle,
  PauseCircle,
  AlertCircle,
  Video,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { useState } from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogFooter,
} from '@/components/ui/dialog';
import EditProductDialog from '@/components/productCard/partials/EditProductDialog';
import { useDeleteProduct } from '@/hooks/useDeleteProduct';

// Utilise le type Product depuis lib/types/Product
import { Product } from '@/lib/types/Product';

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        className="px-0 font-semibold font-sans text-sm"
      >
        NomXXXX
      </Button>
    ),
    cell: ({ row }) => {
      const [open, setOpen] = useState(false);
      const [descOpen, setDescOpen] = useState(false);
      console.log('row.original', row.original);
      return (
        <div className="flex items-center gap-2-">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="ghost">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem asChild>
                <a
                  href={row.original.launch || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-bold"
                  style={{ textDecoration: 'none' }}
                >
                  <Play className="w-4 h-4 text-green-600" />
                  <span className="text-green-700 font-bold">Launch</span>
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a
                  href={row.original.demo || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-bold"
                  style={{ textDecoration: 'none' }}
                >
                  <Video className="w-4 h-4 text-blue-600" />
                  <span className="text-blue-700 font-bold">Démo</span>
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a
                  href={row.original.flowchart || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FileText className="w-4 h-4 mr-2" /> Flowchart
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a
                  href={row.original.userguide || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <BookOpen className="w-4 h-4 mr-2" /> User Guide
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setDescOpen(true)}>
                <Info className="w-4 h-4 mr-2" /> Description
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setOpen(true)}>
                <Trash className="w-4 h-4 mr-2 text-red-500" /> Supprimer
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
              <div className="text-center py-4">
                <p>Voulez-vous vraiment supprimer ?</p>
              </div>
              <DialogFooter className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Non
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  Oui
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Dialog open={descOpen} onOpenChange={setDescOpen}>
            <DialogContent>
              <div className="py-4">
                <h2 className="font-semibold mb-2">Description</h2>
                <p>{row.original.description || 'Aucune description.'}</p>
                {/* Bouton Supprimer en bas de la description */}
                <Button
                  variant="destructive"
                  className="mt-2 flex items-center gap-2"
                  onClick={() => setOpen(true)}
                >
                  <Trash className="w-4 h-4" />
                  Supprimer
                </Button>
              </div>
              <DialogFooter className="flex justify-end">
                <Button variant="outline" onClick={() => setDescOpen(false)}>
                  Fermer
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <span>{row.original.name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'type',
    header: () => <span className="font-semibold font-sans text-sm">Type</span>,
    cell: ({ row }) => row.original.type,
  },
  {
    accessorKey: 'status',
    header: () => (
      <span className="font-semibold font-sans text-sm">Statut</span>
    ),
    cell: ({ row }) => {
      const status = row.original.status;
      let color = 'bg-gray-200 text-gray-800';
      let icon = null;
      if (status === 'RUNNING') {
        color = 'bg-green-100 text-green-800';
        icon = <CheckCircle className="w-3 h-3 mr-1 text-green-600" />;
      }
      if (status === 'STOPPED') {
        color = 'bg-yellow-100 text-yellow-800';
        icon = <PauseCircle className="w-3 h-3 mr-1 text-yellow-600" />;
      }
      if (status === 'DEPRECATED') {
        color = 'bg-red-100 text-red-800';
        icon = <AlertCircle className="w-3 h-3 mr-1 text-red-600" />;
      }
      return (
        <span
          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${color}`}
        >
          {icon}
          {status}
        </span>
      );
    },
  },
  {
    accessorKey: 'version',
    header: () => (
      <span className="font-semibold font-sans text-sm">Version</span>
    ),
    cell: ({ row }) => row.original.version || '—',
  },
  {
    accessorKey: 'thumbnail',
    header: () => (
      <span className="font-semibold font-sans text-sm">Thumbnail</span>
    ),
    cell: ({ row }) =>
      row.original.thumbnail ? (
        typeof row.original.thumbnail === 'string' ? (
          <img
            src={row.original.thumbnail}
            alt="thumbnail"
            className="h-8 w-8 object-cover rounded"
          />
        ) : (
          'Fichier'
        )
      ) : (
        '—'
      ),
  },
  {
    accessorKey: 'flowchart',
    header: () => (
      <span className="font-semibold font-sans text-sm">Flowchart</span>
    ),
    cell: ({ row }) =>
      row.original.flowchart ? (
        typeof row.original.flowchart === 'string' ? (
          <a
            href={row.original.flowchart}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            Voir
          </a>
        ) : (
          'Fichier'
        )
      ) : (
        '—'
      ),
  },
  {
    accessorKey: 'readme',
    header: () => (
      <span className="font-semibold font-sans text-sm">Readme</span>
    ),
    cell: ({ row }) =>
      row.original.readme ? (
        <span className="truncate block max-w-[140px]">
          {row.original.readme}
        </span>
      ) : (
        '—'
      ),
  },
  {
    accessorKey: 'launch_url',
    header: () => <span className="font-semibold font-sans text-sm">Lien</span>,
    cell: ({ row }) => {
      console.log('launch_url:', row.original.launch_url);
      return row.original.launch_url ? (
        <a
          href={row.original.launch_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          Lancer
        </a>
      ) : (
        '—'
      );
    },
  },
  {
    accessorKey: 'demo',
    header: () => <span className="font-semibold font-sans text-sm">Démo</span>,
    cell: ({ row }) =>
      row.original.demo ? (
        <a
          href={row.original.demo}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          Démo
        </a>
      ) : (
        '—'
      ),
  },
  {
    accessorKey: 'repositoryUrl',
    header: () => (
      <span className="font-semibold font-sans text-sm">Lien Github</span>
    ),
    cell: ({ row }) =>
      row.original.repositoryUrl ? (
        <a
          href={row.original.repositoryUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          Github
        </a>
      ) : (
        '—'
      ),
  },
  {
    accessorKey: 'techStack',
    header: () => (
      <span className="font-semibold font-sans text-sm">Technos</span>
    ),
    cell: ({ row }) =>
      row.original.techStack && row.original.techStack.length > 0
        ? row.original.techStack.join(', ')
        : '—',
  },
  {
    accessorKey: 'updatedBy',
    header: () => (
      <span className="font-semibold font-sans text-sm">Modifié par</span>
    ),
    cell: ({ row }) => row.original.updatedBy || '—',
  },
  {
    accessorKey: 'isPublic',
    header: () => (
      <span className="font-semibold font-sans text-sm">Public</span>
    ),
    cell: ({ row }) => (row.original.isPublic ? 'Oui' : 'Non'),
  },
  {
    accessorKey: 'createdAt',
    header: () => (
      <span className="font-semibold font-sans text-sm">Créé le</span>
    ),
    cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString(),
  },
  {
    accessorKey: 'updatedAt',
    header: () => (
      <span className="font-semibold font-sans text-sm">Modifié le</span>
    ),
    cell: ({ row }) => new Date(row.original.updatedAt).toLocaleDateString(),
  },
  {
    accessorKey: 'actions',
    header: () => (
      <span className="font-semibold font-sans text-sm">Actions</span>
    ),
    cell: ({ row }) => {
      const [open, setOpen] = useState(false);
      const deleteProduct = useDeleteProduct(row.original.id);

      const handleDelete = () => {
        deleteProduct.mutate(undefined, {
          onSuccess: () => {
            setOpen(false);
            window.location.reload();
          },
          onError: (err: any) => {
            alert('Erreur lors de la suppression');
            setOpen(false);
          },
        });
      };

      return (
        <div className="flex items-center gap-2">
          <EditProductDialog
            dataProduct={row.original}
            onUpdate={() => window.location.reload()}
            trigger={
              <Button size="icon" variant="ghost">
                <Pencil className="w-4 h-4 text-blue-500" />
              </Button>
            }
          />
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button size="icon" variant="ghost" onClick={() => setOpen(true)}>
                <Trash className="w-4 h-4 text-red-500" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <div className="text-center py-4">
                <p>Voulez-vous vraiment supprimer ?</p>
              </div>
              <DialogFooter className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Non
                </Button>
                <Button
                  variant="destructive"
                  onClick={useDeleteProduct}
                  disabled={deleteProduct.isPending}
                >
                  {deleteProduct.isPending ? 'Suppression...' : 'Oui'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      );
    },
  },
];

import { ColumnDef } from '@tanstack/react-table';
import {
  MoreHorizontal,
  Pencil,
  Play,
  BookOpen,
  CheckCircle,
  PauseCircle,
  AlertCircle,
  Workflow,
  Trash2,
  MonitorPlay,
  Eye,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import EditProductDialog from '@/components/productCard/partials/EditProductDialog';

import { Product } from '@/lib/types/Product';
import { SortableHeader } from '@/components/table/SortableHeader';
import { DeleteProductDialog } from '@/components/productCard/partials/DeleteProductDialog';
import { FlowchartProductDialog } from '@/components/productCard/partials/FlowchartProductDialog';
import { UserGuideProductDialog } from '@/components/productCard/partials/UserGuideProductDialog';
import { DemoProductDialog } from '@/components/productCard/partials/DemoProductDialog';
import { Badge } from '@/components/ui/badge';
import { ReadMeProductDialog } from '@/components/productCard/partials/ReadMeProductDialog';
import { toast } from 'sonner';
import { TruncatedCell } from '@/components/table/TruncatedCell';
import { useAuth } from '@/hooks/useAuth';
import { formatDateToLocalString } from '@/utils/formatDateToLocalString';

export function getColumns(isConsultant: boolean): ColumnDef<Product>[] {
  return [
    {
      id: 'actions',
      cell: ({ row }) => {
        const product = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="ghost">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {/* Launch aligné avec les autres */}
              <DropdownMenuItem asChild>
                <Button
                  variant="ghost"
                  className="-ml-1 flex justify-start items-center w-full text-green-600"
                  onClick={(e) => {
                    if (!product.launch_url) {
                      e.preventDefault();
                      toast.error('Aucun lien de lancement disponible pour ce produit.');
                      return;
                    }
                    window.open(product.launch_url, '_blank', 'noopener,noreferrer');
                  }}
                >
                  <Play className="w-4 h-4 mr-2 text-green-600" />
                  Launch
                </Button>
              </DropdownMenuItem>

              {/* Démo */}
              <DropdownMenuItem asChild>
                <DemoProductDialog
                  product={product}
                  trigger={
                    <Button
                      variant="ghost"
                      className="-ml-1 flex justify-start items-center w-full"
                    >
                      <MonitorPlay className="w-4 h-4 mr-2" />
                      Démo
                    </Button>
                  }
                />
              </DropdownMenuItem>

              {/* Flowchart */}
              <DropdownMenuItem asChild>
                <FlowchartProductDialog
                  product={product}
                  trigger={
                    <Button
                      variant="ghost"
                      className="-ml-1 flex justify-start items-center w-full"
                    >
                      <Workflow className="w-4 h-4 mr-2" />
                      Flowchart
                    </Button>
                  }
                />
              </DropdownMenuItem>

              {/* User Guide */}
              <DropdownMenuItem asChild>
                <UserGuideProductDialog
                  product={product}
                  trigger={
                    <Button
                      variant="ghost"
                      className="-ml-1 flex justify-start items-center w-full"
                    >
                      <BookOpen className="w-4 h-4 mr-2" />
                      User Guide
                    </Button>
                  }
                />
              </DropdownMenuItem>

              {/* ReadMe */}
              <DropdownMenuItem asChild>
                <ReadMeProductDialog
                  product={product}
                  trigger={
                    <Button
                      variant="ghost"
                      className="-ml-1 flex justify-start items-center w-full"
                    >
                      <Workflow className="w-4 h-4 mr-2" />
                      ReadMe
                    </Button>
                  }
                />
              </DropdownMenuItem>

              {/* Modifier */}
              {!isConsultant &&
              <DropdownMenuItem asChild>
                <EditProductDialog
                  product={product}
                  trigger={
                    <Button
                      variant="ghost"
                      className="-ml-1 flex justify-start items-center w-full"
                    >
                      <Pencil className="w-4 h-4 mr-2" />
                      Modifier
                    </Button>
                  }
                />
              </DropdownMenuItem>}

              {/* Supprimer */}
              {!isConsultant &&
              <DropdownMenuItem asChild>
                <DeleteProductDialog
                  product={product}
                  trigger={
                    <Button
                      variant="ghost"
                      className="-ml-1 flex justify-start items-center text-red-600 hover:text-red-700 hover:bg-red-100 w-full"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Supprimer
                    </Button>
                  }
                />
              </DropdownMenuItem>}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
    {
      accessorKey: 'name',
      header: ({ column }) => (
        <SortableHeader column={column} title="Nom Produit" />
      ),
      cell: ({ row }) => {
        const url = row.original.launch_url;

        const handleClick = (e: React.MouseEvent) => {
          if (!url) {
            e.preventDefault();
            toast.error('Aucun lien disponible pour ce produit.');
          }
        };

        return (
          <a
            href={url || '#'}
            onClick={handleClick}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-primary hover:underline cursor-pointer"
            title="Lancer l'application"
          >
            {row.getValue('name')}
          </a>
        );
      },
    },
    {
      accessorKey: 'type',
      header: ({ column }) => <SortableHeader column={column} title="Type" />,
    },
    {
      accessorKey: 'description',
      header: ({ column }) => (
        <SortableHeader column={column} title="Description" />
      ),
      cell: ({ row }) =>
        row.original.description ? (
          <span className="whitespace-pre-line break-words block max-w-[400px]">
            {row.original.description}
          </span>
        ) : (
          <span className="text-gray-300">N/A</span>
        ),
    },
    {
      accessorKey: 'status',
      header: ({ column }) => <SortableHeader column={column} title="Statut" />,
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
      header: ({ column }) => <SortableHeader column={column} title="Version" />,
      cell: ({ row }) =>
        row.original.version || <span className="text-gray-300">N/A</span>,
    },
    {
      accessorKey: 'launch_url',
      header: ({ column }) => <SortableHeader column={column} title="Lien" />,
      cell: ({ row }) =>
        row.original.launch_url ? (
          <a
            href={row.original.launch_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            {row.original.launch_url}
          </a>
        ) : (
          <span className="text-gray-300">N/A</span>
        ),
    },

    {
      accessorKey: 'repositoryUrl',
      header: ({ column }) => (
        <SortableHeader column={column} title="Repo GitHub" />
      ),
      cell: ({ row }) =>
        row.original.repositoryUrl ? (
          <TruncatedCell>
            <a
              href={row.original.repositoryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              {row.original.repositoryUrl}
            </a>
          </TruncatedCell>
        ) : (
          <span className="text-gray-300">N/A</span>
        ),
    },

    {
      accessorKey: 'documentationUrl',

      header: ({ column }) => (
        <SortableHeader column={column} title="Documentation" />
      ),
      cell: ({ row }) => {
        const url = row.original.documentationUrl;

        return url ? (
          <TruncatedCell>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              {url}
            </a>
          </TruncatedCell>
        ) : (
          <span className="text-gray-300">N/A</span>
        );
      },
    },
    {
      accessorKey: 'techStack',
      header: ({ column }) => (
        <SortableHeader column={column} title="Stack Tech" />
      ),
      cell: ({ row }) =>
        row.original.techStack && row.original.techStack.length > 0 ? (
          <div className="flex flex-wrap gap-1">
            {row.original.techStack.map((tech: string, idx: number) => {
              const colors = [
                'bg-blue-100 text-blue-800 border-blue-300',
                'bg-green-100 text-green-800 border-green-300',
                'bg-yellow-100 text-yellow-800 border-yellow-300',
                'bg-purple-100 text-purple-800 border-purple-300',
                'bg-pink-100 text-pink-800 border-pink-300',
              ];
              const color = colors[idx % colors.length];
              return (
                <Badge
                  key={tech}
                  variant="outline"
                  className={`text-xs px-2 py-1 font-semibold rounded border ${color}`}
                >
                  {tech}
                </Badge>
              );
            })}
          </div>
        ) : (
          <span className="text-gray-300">N/A</span>
        ),
    },

    {
      accessorKey: 'flowchart',
      header: ({ column }) => (
        <SortableHeader column={column} title="Flowchart" />
      ),
      cell: ({ row }) =>
        row.original.flowchart ? (
          <FlowchartProductDialog
            product={row.original}
            trigger={
              <Button
                variant="outline"
                className="-ml-1 flex justify-start items-center w-full"
              >
                <Eye className="w-4 h-4 mr-2" />
                Flowchart
              </Button>
            }
          />
        ) : (
          <span className="text-gray-300">N/A</span>
        ),
    },
    
    {
      accessorKey: 'demo',
      header: ({ column }) => (
        <SortableHeader column={column} title="Démo Vidéo" />
      ),
      cell: ({ row }) =>
        row.original.demo ? (
          <DemoProductDialog
            product={row.original}
            trigger={
              <Button
                variant="outline"
                className="-ml-1 flex justify-start items-center w-full"
              >
                <MonitorPlay className="w-4 h-4 mr-2" />
                Démo
              </Button>
            }
          />
        ) : (
          <span className="text-gray-300">N/A</span>
        ),
    },

    {
      accessorKey: 'userguide',
      header: ({ column }) => (
        <SortableHeader column={column} title="User Guide" />
      ),
      cell: ({ row }) =>
        row.original.userguide ? (
          <a
            href={row.original.userguide}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            Voir
          </a>
        ) : (
          <span className="text-gray-300">N/A</span>
        ),
    },
    {
      accessorKey: 'dependencies',
      header: ({ column }) => (
        <SortableHeader column={column} title="Dependencies" />
      ),
      cell: ({ row }) =>
        row.original.dependencies && row.original.dependencies.length > 0 ? (
          <div className="flex flex-wrap gap-1">
            {row.original.dependencies.map((dep: string, idx: number) => {
              const colors = [
                'bg-blue-100 text-blue-800 border-blue-300',
                'bg-green-100 text-green-800 border-green-300',
                'bg-yellow-100 text-yellow-800 border-yellow-300',
                'bg-purple-100 text-purple-800 border-purple-300',
                'bg-pink-100 text-pink-800 border-pink-300',
              ];
              const color = colors[idx % colors.length];
              return (
                <Badge
                  key={dep}
                  variant="outline"
                  className={`text-xs px-2 py-1 font-semibold rounded border ${color}`}
                >
                  {dep}
                </Badge>
              );
            })}
          </div>
        ) : (
          <span className="text-gray-300">N/A</span>
        ),
    },

    {
      accessorKey: 'updatedBy',
      header: ({ column }) => (
        <SortableHeader column={column} title="Modifié par" />
      ),
      cell: ({ row }) =>
        row.original?.updatedBy || <span className="text-gray-300">N/A</span>,
    },
    {
      accessorKey: 'isPublic',
      header: ({ column }) => <SortableHeader column={column} title="Public" />,
      cell: ({ row }) => (row.original.isPublic ? 'Oui' : 'Non'),
    },
    {
      accessorKey: 'createdAt',
      header: ({ column }) => (
        <SortableHeader column={column} title="Ajouté le" />
      ),
      cell: ({ row }) => {
        const date = row.original.createdAt;
        return (
          <span>
            {formatDateToLocalString(row.original.createdAt)}
          </span>
        );
      },
    },
    {
      accessorKey: 'updatedAt',
      header: ({ column }) => (
        <SortableHeader column={column} title="Mise à jour le" />
      ),
      cell: ({ row }) => {
        const date = row.original.updatedAt;
        return (
          <span>
            {date
              ? new Date(date).toLocaleString('fr-FR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                })
              : '—'}
          </span>
        );
      },
    },
  ];
}

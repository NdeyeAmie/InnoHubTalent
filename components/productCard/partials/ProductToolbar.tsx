import { Button } from '@/components/ui/button';
import { BookOpenText, Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { UiDialog } from '../../ui/UiDialog';
import ReactMarkdown from 'react-markdown';
import { DeleteProductDialog } from './DeleteProductDialog';
import EditProductDialog from './EditProductDialog';
import { useAuth } from '@/hooks/useAuth';

export function ProductToolbar({
  dataProduct,
}: {
  dataProduct: any;
  handleUpdate: () => void;
}) {
  const { isConsultant } = useAuth();
  const [openReadme, setOpenReadme] = useState(false);

  return (
    <div className="flex justify-between items-center mb-2">
      <p className="text-sm text-muted-foreground">{dataProduct.name}</p>
      <div className="flex gap-2">
        {/* README */}
        <UiDialog
          open={openReadme}
          setOpen={setOpenReadme}
          title="ReadMe"
          description="informations po
          ur demarrer le projet et se connecter etc ..."
          icon={BookOpenText}
          trigger={
            <Button size="icon" variant="ghost">
              <BookOpenText className="w-4 h-4" />
            </Button>
          }
        >
          {dataProduct.readme ? (
            <ReactMarkdown>{dataProduct.readme}</ReactMarkdown>
          ) : (
            <p>Pas de ReadMe disponible.</p>
          )}
        </UiDialog>

        {/* Edition */}
        {!isConsultant && (
          <EditProductDialog
            product={dataProduct.id}
            trigger={
              <Button size="icon" variant="ghost">
                <Pencil className="w-4 h-4" />
              </Button>
            }
          />
        )}

        {/* Suppression */}
        {!isConsultant && (
          <DeleteProductDialog
            product={dataProduct}
            trigger={
              <Button size="icon" variant="ghost">
                <Trash2 color="red" className="w-4 h-4" />
              </Button>
            }
          />
        )}
      </div>
    </div>
  );
}

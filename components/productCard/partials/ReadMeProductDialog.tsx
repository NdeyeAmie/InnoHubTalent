import { UiDialog } from '@/components/ui/UiDialog';
import { Info } from 'lucide-react';
import { useState } from 'react';

type ReadMeProductDialogProps = {
  product: { readme?: string | null };
  trigger: React.ReactNode;
};

export function ReadMeProductDialog({
  product,
  trigger,
}: ReadMeProductDialogProps) {
  const [openDesc, setOpenDesc] = useState(false);

  return (
    <UiDialog
      open={openDesc}
      setOpen={setOpenDesc}
      title="ReadMe"
      description="Description complète du produit"
      icon={Info}
      height="xl"
      trigger={trigger}
    >
      {product?.readme ? (
        <p className="text-muted-foreground">{product?.readme}</p>
      ) : (
        <p>Pas de description utilisateur.</p>
      )}
    </UiDialog>
  );
}

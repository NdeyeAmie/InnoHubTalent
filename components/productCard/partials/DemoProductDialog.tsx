import { UiDialog } from '@/components/ui/UiDialog';
import { Product } from '@/lib/types/Product';
import { MonitorPlay } from 'lucide-react';
import { useState } from 'react';

type DemoProductDialogProps = {
  product: Product;
  trigger: React.ReactNode;
};

export function DemoProductDialog({
  product,
  trigger,
}: DemoProductDialogProps) {
  const [openDemo, setOpenDemo] = useState(false);

  return (
    <UiDialog
      open={openDemo}
      setOpen={setOpenDemo}
      title="Démo Vidéo"
      description="video de demo "
      icon={MonitorPlay}
      trigger={trigger}
    >
      {product?.demo ? (
        <video controls className="w-full rounded">
          <source src={product?.demo} type="video/mp4" />
          Votre navigateur ne supporte pas la lecture de vidéo.
        </video>
      ) : (
        <p>Aucune démo disponible.</p>
      )}
    </UiDialog>
  );
}

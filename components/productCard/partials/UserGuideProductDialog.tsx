import { UiDialog } from '@/components/ui/UiDialog';
import { BookOpenCheck } from 'lucide-react';
import PdfViewer from '@/components/PdfViewer';
import { useState } from 'react';
import { Product } from '@/lib/types/Product';

type UserGuideProductDialogProps = {
  product: Product;
  trigger: React.ReactNode;
};

export function UserGuideProductDialog({
  product,
  trigger,
}: UserGuideProductDialogProps) {
  const [openGuide, setOpenGuide] = useState(false);

  return (
    <UiDialog
      open={openGuide}
      setOpen={setOpenGuide}
      title="Guide utilisateur"
      description="Guide utilisateur description ..."
      icon={BookOpenCheck}
      height="xl"
      trigger={trigger}
    >
      {product?.userguide ? (
        <PdfViewer url={product?.userguide} />
      ) : (
        <p>Pas de guide utilisateur.</p>
      )}
    </UiDialog>
  );
}

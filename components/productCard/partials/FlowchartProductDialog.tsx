import { UiDialog } from '@/components/ui/UiDialog';
import { Workflow } from 'lucide-react'; // Remplace FileBarChart2 par Workflow
import { useState } from 'react';

type FlowchartProductDialogProps = {
  product: any;
  trigger: React.ReactNode;
};

export function FlowchartProductDialog({
  product,
  trigger,
}: FlowchartProductDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <UiDialog
      open={open}
      setOpen={setOpen}
      title="Flowchart du produit"
      description="Diagramme de flux associé à ce produit"
      icon={Workflow} // Utilise l'icône Workflow ici
      trigger={trigger}
      height="full"
    >
      <div className="flex-1 overflow-auto flex justify-center items-center">
        {product?.flowchart ? (
          product.flowchart.match(/\.(svg|png|jpg|jpeg|gif)$/i) ? (
            <img
              src={product.flowchart}
              alt="Flowchart"
              className="w-full h-full object-contain rounded"
              style={{ maxHeight: 480, maxWidth: '100%' }}
            />
          ) : (
            <a
              href={product.flowchart}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              Voir le flowchart
            </a>
          )
        ) : (
          <span className="text-gray-400">Aucun flowchart disponible.</span>
        )}
      </div>
    </UiDialog>
  );
}



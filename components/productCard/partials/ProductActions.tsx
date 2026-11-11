import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { UserGuideProductDialog } from './UserGuideProductDialog';
import { FlowchartProductDialog } from './FlowchartProductDialog';
import { DemoProductDialog } from './DemoProductDialog';

export function ProductActions({ 
  dataProduct,
  onLaunchClick, 
}: { 
  dataProduct: any;
  onLaunchClick?: (e: React.MouseEvent) => void; 
}) {
  const handleLaunchClick = (e: React.MouseEvent) => {
    if (!dataProduct.launch_url) {
      e.preventDefault();
      toast.error('Aucun lien de lancement disponible pour ce produit.');
      return;
    }
    
    if (onLaunchClick) {
      onLaunchClick(e);
    } else {
      window.open(dataProduct.launch_url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="space-y-2">
      <Button
        className="w-full"
        onClick={handleLaunchClick}
      >
        Launch
      </Button>

      <DemoProductDialog
        dataProduct={dataProduct}
        trigger={<Button className="w-full">Démo</Button>}
      />

      <FlowchartProductDialog
        dataProduct={dataProduct}
        trigger={<Button className="w-full">Flowchart</Button>}
      />

      <UserGuideProductDialog
        dataProduct={dataProduct}
        trigger={<Button className="w-full">User Guide</Button>}
      />
    </div>
  );
}

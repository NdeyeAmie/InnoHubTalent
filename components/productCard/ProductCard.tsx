import { ProductBack } from './partials/ProductBack';
import { ProductFront } from './partials/ProductFront';

export default function ProductCard({
  dataProduct,
  handleUpdate,
}: ProductCardProps) {
  return (
    <div className="perspective">
      <div className="relative w-full h-64 transition-transform duration-500 transform-style-preserve-3d hover:rotate-y-180">
        <ProductFront dataProduct={dataProduct} />
        <ProductBack dataProduct={dataProduct} handleUpdate={handleUpdate} />
      </div>
    </div>
  );
}

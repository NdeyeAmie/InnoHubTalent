import { ProductActions } from './ProductActions';
import { ProductToolbar } from './ProductToolbar';

export function ProductBack({
  dataProduct,
  handleUpdate,
}: {
  dataProduct: any;
  handleUpdate: () => void;
}) {
  return (
    <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-gray-100 rounded-xl shadow-md p-4 flex flex-col justify-between">
      <div>
        <ProductToolbar dataProduct={dataProduct} handleUpdate={handleUpdate} />
      </div>
      <ProductActions dataProduct={dataProduct} />
    </div>
  );
}

import Image from 'next/image';

export function ProductFront({ dataProduct }: { dataProduct: any }) {
  return (
    <div className="absolute w-full h-full backface-hidden bg-white rounded-xl shadow-xl p-4 border border-gray-200">
      <div className="w-full h-32 mb-2 overflow-hidden rounded-md">
        <Image
          src={dataProduct.thumbnail || '/placeholder.png'}
          alt={dataProduct.name}
          width={300}
          height={128}
          className="w-full h-32 object-cover"
        />
      </div>
      <h3 className="text-lg font-semibold mb-1 line-clamp-1">
        {dataProduct.name}
      </h3>
      <p className="text-sm text-muted-foreground line-clamp-2">
        {dataProduct.description}
      </p>
    </div>
  );
}

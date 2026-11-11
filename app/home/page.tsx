'use client';

import ProductsSection from '@/components/ProductsSection';
import { Layout } from '@/components/layout/Layout';

export default function Home() {
  return (
    <Layout>
      <ProductsSection />

      <div className="flex flex-1 flex-col gap-4 p-4">
        {Array.from({ length: 24 }).map((_, index) => (
          <div
            key={index}
            className="bg-muted/50 aspect-video h-12 w-full rounded-lg"
          />
        ))}
      </div>
    </Layout>
  );
}

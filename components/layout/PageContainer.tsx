'use client';

import { ReactNode } from 'react';

interface PageContainerProps {
  title: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
}

export function PageContainer({
  title,
  description,
  action,
  children,
}: PageContainerProps) {
  return (
    <div className="container mx-auto py-10 px-5">
      <div className="mb-5 max-w-[50%]">
        <h1 className="text-3xl font-bold">{title}</h1>
        {description && (
          <p className="text-gray-500 mt-2 text-sm">{description}</p>
        )}
      </div>

      {action && <div className="flex justify-end mb-5">{action}</div>}

      {children}
    </div>
  );
}

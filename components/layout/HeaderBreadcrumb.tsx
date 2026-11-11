'use client';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { useBreadcrumb } from '@/hooks/useBreadcrumb';
import { PRODUCT_TYPE_LABELS } from '@/lib/constants/product';

export const HeaderBreadcrumb = () => {
  const { activeTab } = useBreadcrumb();

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Produits</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>
            {/* {tabLabels[activeTab]} */}

            {
              PRODUCT_TYPE_LABELS[
                activeTab.toLowerCase() as keyof typeof PRODUCT_TYPE_LABELS
              ]
            }
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

import { ProductType } from '@prisma/client';

// Correspondance frontend → backend
export const PRODUCT_TYPE_MAP: Record<string, ProductType> = {
  application: 'APPLICATION',
  workflow: 'WORKFLOW',
  robot: 'ROBOT',
};

// Labels pour l’UI
export const PRODUCT_TYPE_LABELS: Record<
  keyof typeof PRODUCT_TYPE_MAP,
  string
> = {
  application: 'Application',
  workflow: 'Workflow',
  robot: 'Robot',
};

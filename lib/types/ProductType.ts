import { ProductType } from '@prisma/client';

export const PRODUCT_TYPES_OPTIONS = Object.values(ProductType).map(
  (value) => ({
    value,
    label:
      value === 'APPLICATION'
        ? 'Applications'
        : value === 'WORKFLOW'
          ? 'Workflows'
          : 'Robots',
  })
);

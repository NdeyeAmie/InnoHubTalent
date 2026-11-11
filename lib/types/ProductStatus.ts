import { ProductStatus } from '@prisma/client';

export const PRODUCT_STATUS_OPTIONS = Object.values(ProductStatus).map(
  (value) => ({
    value,
    label:
      value === 'RUNNING'
        ? 'En cours'
        : value === 'STOPPED'
          ? 'Arrêté'
          : 'Obsolète',
  })
);

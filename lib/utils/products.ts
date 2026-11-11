import { ProductType } from '@prisma/client';
import { PRODUCT_TYPE_MAP } from '../constants/product';

export function normalizeProductType(type: string | null): ProductType | null {
  if (!type) return null;

  // 1. Exact match (enum Prisma)
  if (Object.values(ProductType).includes(type as ProductType)) {
    return type as ProductType;
  }

  // 2. Lookup map (alias)
  return PRODUCT_TYPE_MAP[type.toLowerCase()] ?? null;
}

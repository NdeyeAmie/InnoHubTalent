import { ProductStatus, ProductType } from '@prisma/client';

export type Product = {
  id: string;
  name: string;
  description?: string | null;

  type: ProductType;
  status: ProductStatus;

  version?: string | null;
  category?: string | null; // ex FINANCE, RH, IA ...
  tags?: string[]; // mots cles pour la recherche et filtrage

  thumbnail?: string | File | null;
  flowchart?: string | File | null;
  readme?: string | null;
  launch_url?: string | null;
  demo?: string | File | null;
  userguide?: string | File | null;
  documentationUrl?: string | null;

  repositoryUrl?: string | null; // lien github
  techStack?: string[]; // technologis utilsie
  dependencies?: string[]; // autres produits ou servics necessaire

  ownerId: string;
  team?: string | null;
  updatedBy?: string | null;
  isPublic: boolean;

  meta?: Record<string, unknown> | null;

  createdAt: string;
  updatedAt: string;
};

export type ProductFormData = {
  name?: string;
  description?: string | null;
  type?: ProductType;
  status?: ProductStatus;

  // fichiers: upload (File) ou URL déjà stockée (string)
  thumbnail?: File | string | null;
  flowchart?: File | string | null;
  demo?: File | string | null;
  userguide?: File | string | null;
  readme?: string | null;

  version?: string | null;
  category?: string | null;
  tags?: string[];

  launch_url?: string | null;
  repositoryUrl?: string | null;
  documentationUrl?: string | null;
  techStack?: string[];
  dependencies?: string[];

  team?: string | null;
  isPublic?: boolean;

  meta?: Record<string, unknown> | null;
};

export function toFormData(data?: ProductFormData): FormData {
  const formData = new FormData();
  if (!data) return formData;

  Object.entries(data).forEach(([key, value]) => {
    if (value === undefined || value === null) return;

    if (Array.isArray(value)) {
      formData.append(key, JSON.stringify(value));
    } else if (typeof value === 'object' && !(value instanceof File)) {
      formData.append(key, JSON.stringify(value));
    } else {
      formData.append(key, value as any);
    }
  });

  return formData;
}

export const PRODUCT_TYPES: ProductType[] = [
  'APPLICATION',
  'WORKFLOW',
  'ROBOT',
];

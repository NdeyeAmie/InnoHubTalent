import { Status } from '@prisma/client';

export const STATUS_OPTIONS = Object.values(Status).map((value) => ({
  value,
  label: value === 'ACTIVE' ? 'Actif' : 'Inactif',
}));

import { Role } from '@prisma/client';

export const ROLES_OPTIONS = Object.values(Role).map((value) => ({
  value,
  label: 
    value === 'ADMINSYSTEM'
      ? 'Administrateur Système'
      : value === 'ADMIN'
        ? 'Administrateur'
        : value === 'PRODUCTMANAGER'
          ? 'Responsable Produit'
          : value === 'CONSULTANT'
            ? 'Consultant'
            : value,
}));

// Export filtré sans "Administrateur Système"
export const ROLES2_OPTIONS = ROLES_OPTIONS.filter(
  (role) => role.value !== 'ADMINSYSTEM'
);


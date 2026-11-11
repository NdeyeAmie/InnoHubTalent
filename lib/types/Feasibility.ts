import { Feasibility } from '@prisma/client';

export const FEASIBILITY_OPTIONS = Object.values(Feasibility).map((value) => ({
  value,
  label: value === 'HIGH' ? 'High' : value === 'MEDIUM' ? 'Medium' : 'Low',
}));

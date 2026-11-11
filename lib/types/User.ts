import { Role, Status } from '@prisma/client';

export type User = {
  id: string;
  email: string;
  lastname: string | null;
  firstname: string | null;
  role: Role;
  department: string | null;
  status: Status;
  createdAt: Date;
  updatedAt: Date;
};

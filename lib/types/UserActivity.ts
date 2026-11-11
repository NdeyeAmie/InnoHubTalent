export type UserActivity = {
  id: string;
  userId: string;
  action: string;
  type?: string;
  meta?: Record<string, any>;
  createdAt: string;
};

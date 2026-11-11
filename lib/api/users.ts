import { User } from '@/lib/types/User';

// Récupérer la liste des users
export async function fetchUsers(): Promise<User[]> {
  const res = await fetch('/api/users');
  if (!res.ok) throw new Error('Erreur lors du chargement des utilisateurs');
  return res.json();
}

// Ajouter un user
export async function createUser(data: Partial<User> & { password: string }) {
  const res = await fetch('/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const { error } = await res.json();
    throw new Error(error || 'Erreur lors de la création');
  }
  return res.json();
}

// Mettre à jour un user
export async function updateUser(id: string, data: Partial<User>) {
  const res = await fetch(`/api/users/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const { error } = await res.json().catch(() => ({}));
    throw new Error(error || 'Erreur lors de la mise à jour');
  }

  return res.json();
}

// Supprimer un user
export async function deleteUser(id: string) {
  const res = await fetch(`/api/users/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Erreur lors de la suppression');
  return res.json();
}

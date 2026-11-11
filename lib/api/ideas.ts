import { Idea } from '@prisma/client';

// Récupérer la liste des idées
export async function fetchIdeas(): Promise<Idea[]> {
  const res = await fetch('/api/ideas');
  if (!res.ok) throw new Error('Erreur lors du chargement des idées');
  return res.json();
}

// Ajouter une idée
export async function createIdea(data: Partial<Idea>) {
  const res = await fetch('/api/ideas', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const { error } = await res.json().catch(() => ({}));
    throw new Error(error || 'Erreur lors de la création de l\'idée');
  }

  return res.json();
}

// Mettre à jour une idée
export async function updateIdea(id: string, data: Partial<Idea>) {
  const res = await fetch(`/api/ideas/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const { error } = await res.json().catch(() => ({}));
    throw new Error(error || 'Erreur lors de la mise à jour de l\'idée');
  }

  return res.json();
}

// Supprimer une idée
export async function deleteIdea(id: string) {
  const res = await fetch(`/api/ideas/${id}`, { method: 'DELETE' });

  if (!res.ok) {
    const { error } = await res.json().catch(() => ({}));
    throw new Error(error || 'Erreur lors de la suppression de l\'idée');
  }

  return res.json();
}

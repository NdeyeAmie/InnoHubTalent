'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect, useMemo } from 'react';

export function useAuth() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<any | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/auth/me', { credentials: 'include' });
        if (!res.ok) {
          setUser(null);
          router.push('/login');
          return;
        }

        const data = await res.json();
        setUser(data);

        if (window.location.pathname === '/login') {
          router.push('/home');
        }
      } catch {
        setUser(null);
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erreur inconnue');

      setUser(data.user);
      router.push('/home');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
    setUser(null);
    router.push('/login');
  };

  // Centralisation des permissions
  const roles = useMemo(() => {
    const role = user?.role;
    return {
      isAdminSystem: role === 'ADMINSYSTEM',
      isAdmin: role === 'ADMIN',
      isProductManager: role === 'PRODUCTMANAGER',
      isConsultant: role === 'CONSULTANT',
      isStaff: ['ADMIN', 'PRODUCTMANAGER', 'CONSULTANT'].includes(role ?? ''),
    };
  }, [user?.role]);

  return { login, logout, user, loading, error, ...roles };
}

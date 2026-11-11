import { NextResponse } from 'next/server';

export async function POST() {
  // ✅ On "supprime" le cookie en le réécrivant expiré
  const response = NextResponse.json({ message: 'Déconnecté avec succès' });

  response.cookies.set({
    name: 'token',
    value: '',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    expires: new Date(0), // expire immédiatement
  });

  return response;
}

import { jwtVerify } from 'jose';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET);

export async function GET(req: Request) {
  try {
    const cookieHeader = req.headers.get('cookie') || '';
    const token = cookieHeader
      .split(';')
      .find((c) => c.trim().startsWith('token='))
      ?.split('=')[1];

    if (!token) {
      return NextResponse.json({ error: 'Non connecté' }, { status: 401 });
    }

    const { payload } = await jwtVerify(token, secret);
    const { userId, role } = payload;

    if (!userId) {
      return NextResponse.json({ error: 'Token invalide' }, { status: 401 });
    }

    // 🔍 Optionnel : recharger les infos dynamiques (status, department, etc.)
    const user = await prisma.user.findUnique({
      where: { id: userId as string },
      select: {
        id: true,
        email: true,
        firstname: true,
        lastname: true,
        role: true,
        department: true,
        status: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Utilisateur introuvable' },
        { status: 404 }
      );
    }

    return NextResponse.json(user, { status: 200 });
  } catch (err) {
    console.error('Erreur /auth/me:', err);
    return NextResponse.json({ error: 'Token invalide' }, { status: 401 });
  }
}

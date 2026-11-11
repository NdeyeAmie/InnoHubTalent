// app/api/auth/activities/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
    if (!userId) {
      return NextResponse.json({ error: 'userId requis' }, { status: 400 });
    }

    const activities = await prisma.activity.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 50,
      select: {
        action: true,
        type: true,
        createdAt: true,
      },
    });

    return NextResponse.json(activities);
  } catch (err) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get('authorization');
    if (!authHeader)
      return NextResponse.json({ error: 'Non connecté' }, { status: 401 });

    const token = authHeader.split(' ')[1];
    if (!token)
      return NextResponse.json({ error: 'Non connecté' }, { status: 401 });

    const { payload } = await jwtVerify(token, secret);
    if (!payload.userId)
      return NextResponse.json({ error: 'Token invalide' }, { status: 401 });

    const { action, type, meta } = await req.json();

    const activity = await prisma.activity.create({
      data: {
        userId: payload.userId as string,
        action,
        type,
        meta,
      },
    });

    return NextResponse.json(activity);
  } catch (err) {
    console.error('Erreur POST /activities', err);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

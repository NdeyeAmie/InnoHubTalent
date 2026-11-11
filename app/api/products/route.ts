import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import { normalizeProductType } from '@/lib/utils/products';

const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET);

//  GET → Liste des produits
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
    });

    const productsByStatus = await prisma.product.groupBy({
      by: ['status'],
      _count: { status: true },
    });

    const productsByType = await prisma.product.groupBy({
      by: ['type'],
      _count: { type: true },
    });

    const totalProducts = await prisma.product.count();

    return NextResponse.json(
      {
        products,
        stats: {
          byStatus: productsByStatus,
          byType: productsByType,
          total: totalProducts,
        },
      },
      { status: 200 }
    );
  } catch (err) {
    console.error('Erreur API GET products:', err);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

//  POST → Créer un produit
export async function POST(req: Request) {
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
    if (!payload.userId) {
      return NextResponse.json({ error: 'Token invalide' }, { status: 401 });
    }

    const ownerId = payload.userId as string;
    const formData = await req.formData();

    const name = formData.get('name') as string;
    const description = formData.get('description') as string | null;
    const rawType = formData.get('type') as string;
    const type = normalizeProductType(rawType);

    if (!name || !type) {
      return NextResponse.json(
        { error: 'Nom et type requis' },
        { status: 400 }
      );
    }

    const product = await prisma.product.create({
      data: {
        name,
        description,
        type,
        ownerId,
        updatedBy: ownerId,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (err: any) {
    console.error('❌ Erreur API POST products:', err);
    return NextResponse.json(
      { error: err.message || 'Erreur serveur' },
      { status: 500 }
    );
  }
}

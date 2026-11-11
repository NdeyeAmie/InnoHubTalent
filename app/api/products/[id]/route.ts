import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

// 🔹 GET → Récupérer un produit par ID
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: params.id },
    });

    if (!product) {
      return NextResponse.json(
        { error: 'Produit introuvable' },
        { status: 404 }
      );
    }

    return NextResponse.json(product, { status: 200 });
  } catch (err) {
    console.error('Erreur API GET product:', err);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

// 🔹 PUT → Mettre à jour un produit
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const formData = await req.formData();

    const dataToUpdate: Record<string, any> = {};
    for (const [key, value] of formData.entries()) {
      if (value instanceof File) {
        // ⚠️ Ici tu peux gérer l’upload fichier si nécessaire
        // Exemple : upload vers S3 et stocker l’URL
        continue;
      }

      if (typeof value === 'string') {
        try {
          // Essayer de parser JSON (pour arrays, objets, booleans, numbers)
          dataToUpdate[key] = JSON.parse(value);
        } catch {
          dataToUpdate[key] = value;
        }
      }
    }

    const product = await prisma.product.update({
      where: { id: params.id },
      data: dataToUpdate,
    });

    return NextResponse.json(product, { status: 200 });
  } catch (err: any) {
    console.error('❌ Erreur API PUT product:', err);
    return NextResponse.json(
      { error: err.message || 'Erreur serveur' },
      { status: 500 }
    );
  }
}

// 🔹 DELETE → Supprimer un produit
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.product.delete({ where: { id: params.id } });

    // 204 = No Content → pas de JSON nécessaire
    return new Response(null, { status: 204 });
  } catch (err) {
    console.error('Erreur API DELETE product:', err);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

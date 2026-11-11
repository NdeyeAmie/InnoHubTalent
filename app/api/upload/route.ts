import { NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const file = formData.get('file') as File | null;
    const productId = formData.get('productId') as string | null;
    const field = formData.get('field') as
      | 'thumbnail'
      | 'flowchart'
      | 'demo'
      | 'userguide'
      | 'readme'
      | null;

    if (!file) {
      return NextResponse.json(
        { error: 'Aucun fichier reçu.' },
        { status: 400 }
      );
    }

    // Conversion du fichier en buffer pour Cloudinary
    const buffer = Buffer.from(await file.arrayBuffer());

    // Dossier cible dans Cloudinary (logique selon field)
    const folder = productId
      ? `products/${productId}/${field}`
      : `products/temp`;

    // Upload vers Cloudinary via un stream
    const result: any = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder,
            resource_type: 'auto',
          },
          (err, res) => {
            if (err) reject(err);
            else resolve(res);
          }
        )
        .end(buffer);
    });

    // Si pas de productId → on ne fait que retourner l’URL Cloudinary
    if (!productId || !field) {
      return NextResponse.json({ url: result.secure_url });
    }

    // Mise à jour du produit dans Prisma
    await prisma.product.update({
      where: { id: productId },
      data: { [field]: result.secure_url },
    });

    return NextResponse.json({
      url: result.secure_url,
      message: `Fichier ${field} uploadé avec succès.`,
    });
  } catch (err: any) {
    console.error('❌ Erreur upload produit :', err);
    return NextResponse.json(
      { error: err.message || 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}

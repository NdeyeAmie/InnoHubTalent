import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET → récupérer un utilisateur par son id
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: params.id },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Utilisateur non trouvé' },
        { status: 404 }
      );
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error('Erreur API GET user:', error);
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}

// PUT → activer/désactiver un utilisateur
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const { email, firstname, lastname, role, department, status } = body;

    const user = await prisma.user.update({
      where: { id: params.id },
      data: {
        ...(email && { email }),
        ...(firstname && { firstname }),
        ...(lastname && { lastname }),
        ...(role && { role }),
        ...(department && { department }),
        ...(status && { status }),
      },
    });

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error('Erreur API update user:', error);
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}

// DELETE → supprimer un utilisateur
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.user.delete({
      where: { id: params.id },
    });

    return NextResponse.json(
      { message: 'Utilisateur supprimé avec succès' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Erreur API delete user:', error);
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}

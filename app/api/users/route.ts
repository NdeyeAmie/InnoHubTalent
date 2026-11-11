import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

// GET → Liste des utilisateurs
export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        firstname: true,
        lastname: true,
        role: true,
        department: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    // Compter par statut
    const usersByStatus = await prisma.user.groupBy({
      by: ['status'],
      _count: { status: true },
    });

    // Compter par rôle
    const usersByRole = await prisma.user.groupBy({
      by: ['role'],
      _count: { role: true },
    });

    // Compter le total
    const totalUsers = await prisma.user.count();

    return NextResponse.json(
      {
        users,
        stats: {
          byStatus: usersByStatus,
          byRole: usersByRole,
          total: totalUsers,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Erreur API GET users:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des utilisateurs' },
      { status: 500 }
    );
  }
}

// POST → Création d’un utilisateur
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, firstname, lastname, password, role, department, status } =
      body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Champs requis manquants' },
        { status: 400 }
      );
    }

    // Vérifier si l’utilisateur existe déjà
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      return NextResponse.json(
        { error: 'Un utilisateur avec cet email existe déjà' },
        { status: 400 }
      );
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer l’utilisateur
    const user = await prisma.user.create({
      data: {
        email,
        firstname,
        lastname,
        password: hashedPassword,
        role: role ?? 'CONSULTANT', // valeur par défaut
        department: department ?? null,
        status: status ?? 'ACTIVE', // valeur par défaut
      },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error('Erreur API création user:', error);
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Parser Markdown pour remplir ton modèle complet
function parseMarkdown(md: string) {
  const lines = md.split('\n');

  const idea: any = {
    title: '',
    description: '',
    problem: '',
    targetClients: '',
    expectedBenefits: '',
    similarProducts: '',
    differentiators: '',
    resourcesNeeded: '',
    priority: '',
    committeeComment: '',
    features: [],
    mvpSteps: [],
  };

  lines.forEach((line) => {
    line = line.trim();

    if (line.startsWith('# 📌')) {
      idea.title = line.replace('# 📌', '').trim();
    } else if (line.startsWith('- **Description**')) {
      idea.description = line.split(':')[1]?.trim() || '';
    } else if (line.startsWith('- **Problème')) {
      idea.problem = line.split(':')[1]?.trim() || '';
    } else if (line.startsWith('- **Client')) {
      idea.targetClients = line.split(':')[1]?.trim() || '';
    } else if (line.startsWith('- **Bénéfices')) {
      idea.expectedBenefits = line.split(':')[1]?.trim() || '';
    } else if (line.startsWith('- **Produits similaires')) {
      idea.similarProducts = line.split(':')[1]?.trim() || '';
    } else if (line.startsWith('- **Différenciateurs')) {
      idea.differentiators = line.split(':')[1]?.trim() || '';
    } else if (line.startsWith('- **Ressources')) {
      idea.resourcesNeeded = line.split(':')[1]?.trim() || '';
    } else if (line.startsWith('- **Priorité**')) {
      idea.priority = line.split(':')[1]?.trim() || 'Nouveau';
    } else if (line.startsWith('- **Commentaire du comité')) {
      idea.committeeComment = line.split(':')[1]?.trim() || '';
    } else if (line.startsWith('- [ ]')) {
      idea.features.push(line.replace('- [ ]', '').trim());
    } else if (line.match(/^\d+\./)) {
      idea.mvpSteps.push(line.replace(/^\d+\./, '').trim());
    }
  });

  return idea;
}

// GET → Récupération de toutes les idées
export async function GET() {
  try {
    const ideas = await prisma.idea.findMany({
      orderBy: { createdAt: 'desc' },
    });

    // Compter par statut
    const ideasByStatus = await prisma.idea.groupBy({
      by: ['status'],
      _count: { status: true },
    });

    // Compter par statut
    const ideasByFeasibility = await prisma.idea.groupBy({
      by: ['feasibility'],
      _count: { status: true },
    });

    // Compter le total
    const totalIdeas = await prisma.idea.count();

    return NextResponse.json(
      {
        ideas,
        stats: {
          byStatus: ideasByStatus,
          byRole: ideasByFeasibility,
          total: totalIdeas,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Erreur API GET ideas:', error);
    console.error('Détails de l\'erreur:', error.message);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des idées' },
      { status: 500 }
    );
  }
}

// API pour sauvegarder l'idée

export async function POST(req: Request) {
  try {
    const { title, description, category } = await req.json();
    
    if (!title) {
      return NextResponse.json({ error: 'Titre requis' }, { status: 400 });
    }
    
    const idea = await prisma.idea.create({
      data: {
        title,
        description: description || null,
        category: category || null,
        // Laisse Prisma gérer les valeurs par défaut
      },
    });
    
    return NextResponse.json(idea, { status: 201 });
  } catch (error) {
    console.error('Erreur complète:', error);
    return NextResponse.json(
      { error: `Erreur lors de la création: ${error.message}` },
      { status: 500 }
    );
  }
}

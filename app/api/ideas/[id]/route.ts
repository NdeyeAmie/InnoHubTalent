import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET - Récupérer une idée par ID
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const idea = await prisma.idea.findUnique({
      where: { id: params.id },
    });

    if (!idea) {
      return NextResponse.json(
        { error: 'Idée non trouvée' },
        { status: 404 }
      );
    }

    return NextResponse.json(idea, { status: 200 });
  } catch (error) {
    console.error('Erreur API GET idea:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération de l\'idée' },
      { status: 500 }
    );
  }
}

// PUT - Modifier une idée
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const { 
      title, 
      submissionDate, 
      author, 
      description, 
      problem, 
      targetClients, 
      expectedBenefits, 
      similarProducts, 
      differentiators, 
      resourcesNeeded, 
      priority, 
      committeeComment, 
      features, 
      mvpSteps, 
      roiEstimate, 
      feasibility, 
      impact, 
      riskLevel, 
      status, 
      category, 
      votes, 
      deadlineEstimate 
    } = body;
    
    const idea = await prisma.idea.update({
      where: { id: params.id },
      data: {
        // ✅ Mise à jour conditionnelle (seulement si fourni)
        ...(title && { title }),
        ...(submissionDate && { submissionDate }),
        ...(author && { author }),
        ...(description && { description }),
        ...(problem && { problem }),
        ...(targetClients && { targetClients }),
        ...(expectedBenefits && { expectedBenefits }),
        ...(similarProducts && { similarProducts }),
        ...(differentiators && { differentiators }),
        ...(resourcesNeeded && { resourcesNeeded }),
        ...(priority && { priority }),
        ...(committeeComment && { committeeComment }),
        ...(features && { features }),
        ...(mvpSteps && { mvpSteps }),
        ...(roiEstimate && { roiEstimate }),
        ...(feasibility && { feasibility }),
        ...(impact && { impact }),
        ...(riskLevel && { riskLevel }),
        ...(status && { status }),
        ...(category && { category }),
        ...(votes !== undefined && { votes }),
        ...(deadlineEstimate && { deadlineEstimate }),
      },
    });

    return NextResponse.json(idea, { status: 200 });
  } catch (error) {
    console.error('Erreur API PUT idea:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la modification de l\'idée' },
      { status: 500 }
    );
  }
}

// DELETE - Supprimer une idée
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const idea = await prisma.idea.delete({
      where: { id: params.id },
    });

    return NextResponse.json(
      { message: 'Idée supprimée avec succès', idea },
      { status: 200 }
    );
  } catch (error) {
    console.error('Erreur API DELETE idea:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la suppression de l\'idée' },
      { status: 500 }
    );
  }
}

// Test dans la console navigateur
fetch('/api/ideas/ton-id-ici', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: 'Titre modifié',
    description: 'Description modifiée'
  })
})
.then(res => res.json())
.then(console.log);
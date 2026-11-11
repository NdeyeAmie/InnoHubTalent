import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { oldPassword, newPassword, confirmPassword } = await req.json();

    console.log('REQ', req);

    console.log('OLD PASSWORD', oldPassword);
    console.log('NEW PASSWORD', newPassword);
    console.log('CONFIRM PASSWORD', confirmPassword);

    // ⚠️ Champs obligatoires
    if (!oldPassword || !newPassword || !confirmPassword) {
      return NextResponse.json(
        { message: 'Tous les champs sont requis' },
        { status: 400 }
      );
    }

    // ⚠️ Vérification correspondance
    if (newPassword !== confirmPassword) {
      return NextResponse.json(
        {
          message:
            'Le nouveau mot de passe et la confirmation ne correspondent pas',
        },
        { status: 400 }
      );
    }

    // ✅ Exemple: récupérer le token depuis les cookies
    const token = req.headers.get('cookie')?.match(/token=([^;]+)/)?.[1];
    if (!token) {
      return NextResponse.json({ message: 'Non authentifié' }, { status: 401 });
    }

    const isValid = oldPassword === '123'; // ⚠️ à remplacer par bcrypt
    if (!isValid) {
      return NextResponse.json(
        { message: 'Ancien mot de passe incorrect' },
        { status: 403 }
      );
    }

    return NextResponse.json(
      { message: 'Mot de passe changé avec succès ✅' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Erreur changement de mot de passe:', error);
    return NextResponse.json(
      { message: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}

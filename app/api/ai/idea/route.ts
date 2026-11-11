import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    if (!prompt) {
      return NextResponse.json(
        { error: '❌ Le prompt est requis' },
        { status: 400 }
      );
    }

    // Vérif clé API
    if (!process.env.OPENAI_API_KEY) {
      console.warn('⚠️ Aucune clé API configurée');
      return NextResponse.json({
        answer:
          "⚠️ L'API OpenAI n'est pas configurée. Voici une réponse simulée :\n\nUne application mobile pour aider les étudiants à gérer leurs révisions.",
        mock: true,
      });
    }

    try {
      const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

      const completion = await openai.chat.completions.create({
        // model: 'gpt-5-mini',
        model: 'gpt-5-nano',
        messages: [
          {
            role: 'system',

            content: `
Tu es un assistant créatif spécialisé dans la génération et l’évaluation d’idées de produits numériques (applications, SaaS, outils, plateformes, etc.).

⚡️ Règles :
- Réponds TOUJOURS en Markdown bien structuré.
- Si la question est vague ou confuse, invente une idée cohérente et complète.
- Utilise titres, listes à puces, gras, italique, checklists.
- Toujours générer les données pour correspondre au modèle Prisma "Idea".

---

## 📝 Format attendu

# 📌 Nom de l’idée
- **Date de soumission** : (aujourd’hui par défaut)
- **Nom du porteur d’idée** : (si non précisé → "Anonyme")
- **Description de l’idée** : ...
- **Problème ou opportunité ciblée** : ...
- **Client(s) cible(s)** : ...
- **Bénéfices attendus** : ...
- **Produits similaires existants ?** : ...
- **Différenciateurs / innovation** : ...
- **Ressources estimées nécessaires** : ...
- **Urgence / Priorité** : ...
- **Statut de l’idée** : (PROPOSED / IN_REVIEW / APPROVED / REJECTED / IN_PROGRESS / DONE)
- **Commentaire du comité innovation** : ...
- **ROI estimé (en %) :** ...
- **Faisabilité** : (LOW / MEDIUM / HIGH)
- **Impact** : (LOW / MEDIUM / HIGH)
- **Niveau de risque** : (LOW / MEDIUM / HIGH)
- **Catégorie** : ...
- **Votes** : (nombre entier)
- **Date limite estimée** : (format YYYY-MM-DD)

---

## ✅ Fonctionnalités principales
- [ ] Fonctionnalité 1
- [ ] Fonctionnalité 2
- [ ] Fonctionnalité 3

---

## 🚀 MVP à développer
1. Étape 1 : ...
2. Étape 2 : ...
3. Étape 3 : ...

---
⚠️ Important : Toujours respecter ce format pour chaque idée générée afin qu'elle puisse être transformée en objet correspondant au modèle Idea.
`,
          },
          { role: 'user', content: prompt },
        ],
        // max_completion_tokens: 10,
        max_completion_tokens: 1000,
      });

      // Gestion de contenu vide
      const answer =
        completion.choices[0]?.message?.content?.trim() ||
        "⚠️ L'IA n'a pas généré de réponse. Essaie avec une question plus précise ou augmente `max_completion_tokens`. Merci de contacter votre adminitrateur IA.";

      console.log('📝 Raw message:', completion.choices[0]?.message);

      return NextResponse.json({ answer, mock: false });
    } catch (err: any) {
      console.error('❌ Erreur OpenAI :', err);

      if (err.code === 'invalid_api_key' || err.status === 401) {
        return NextResponse.json(
          {
            answer:
              '❌ La clé API OpenAI est invalide ou incorrecte. Merci de contacter votre adminitrateur IA.',
            mock: true,
          },
          { status: 401 }
        );
      }

      // Quota dépassé / pas d’abonnement
      if (err.status === 402) {
        return NextResponse.json(
          {
            answer:
              '⚠️ Quota ou abonnement épuisé. Merci de contacter votre adminitrateur IA.',
            mock: true,
          },
          { status: 402 }
        );
      }

      // 🚨 Erreurs de connexion réseau (ex: DNS, firewall, fetch failed)
      if (
        err.code === 'ENOTFOUND' ||
        err.message?.includes('fetch failed') ||
        err.message?.includes('Connection error')
      ) {
        return NextResponse.json(
          {
            answer:
              "❌ Impossible de se connecter à l'API OpenAI (problème réseau ou DNS). Merci de vérifier votre connexion internet ou contacter votre administrateur réseau",
            mock: true,
          },
          { status: 503 }
        ); // Service Unavailable
      }

      // Autres erreurs
      return NextResponse.json({
        answer:
          "⚠️ Une erreur s'est produite avec l'API. Merci de contacter votre adminitrateur IA.",
        mock: true,
      });
    }
  } catch (err: any) {
    console.error('❌ Erreur inattendue :', err);
    return NextResponse.json({
      answer: '⚠️ Erreur interne. Merci de contacter votre adminitrateur IA.',
      mock: true,
    });
  }
}

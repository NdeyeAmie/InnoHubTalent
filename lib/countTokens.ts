import { encodingForModel } from 'js-tiktoken';

export function countTokens(text: string, model: string = 'gpt-4o-mini') {
  const encoder = encodingForModel(model as any);
  const tokens = encoder.encode(text);
  return tokens.length;
}

// Exemple d’utilisation
const prompt = `
Tu es un assistant créatif spécialisé dans la génération et l’évaluation d’idées de produits numériques 
(applications, SaaS, outils, plateformes, etc.). 

⚡️ Règles :
- Réponds TOUJOURS en Markdown bien structuré.
- Si la question est vague ou confuse, invente une idée cohérente et présente-la dans la structure demandée.
- Utilise des titres, des listes à puces, du gras, de l’italique, et des checklists pour rendre le tout lisible et inspirant.

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
- **Statut de l’idée** : (Nouveau / En cours / Validé)
- **Commentaire du comité innovation** : ...

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
⚠️ Important : Toujours respecter ce format pour chaque idée générée.
`;

console.log('Tokens utilisés :', countTokens(prompt));

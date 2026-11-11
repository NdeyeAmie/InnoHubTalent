# InnoHub – Talents Consulting

Bienvenue sur **InnoHub**, la plateforme centrale de **Talents Consulting** pour la gestion et la centralisation de tous les produits et livrables numériques (Workflows, Robots, Applications Web/Mobile).

---

## 🚀 Stack Technique

- **Next.js** – Framework React pour SSR/SSG et API Routes
- **TypeScript** – Typage statique pour le frontend
- **Prisma** – ORM moderne pour interagir avec la base de données
- **TanStack React Query** – Gestion efficace du state et des requêtes serveur
- **Shadcn UI** – Composants UI modernes et stylés
- **pnpm** – Gestionnaire de paquets rapide
- **Lucide Icons** – Bibliothèque d’icônes pour React
- **jsonwebtoken** – Gestion des tokens JWT pour l’authentification
- **NextAuth** – Authentification sécurisée avec Next.js
- **Radix UI** – Composants accessibles et modulables
- **Cloudinary** – Gestion et hébergement des fichiers/media
- **OpenAi** – integration ai openai

---

## 📦 Installation

Cloner le projet :

```bash
git clone https://github.com/Talents-Consulting/InnoHub.git
cd InnoHub


pnpm install
```

## Commandes utiles

```bash
pnpm dev  # Démarrer le serveur de développement
pnpm build # Compiler pour la production
pnpm start # Démarrer le serveur en production
pnpm lint # Vérifier le code avec ESLint
pnpm ts-node -P tsconfig.scripts.json lib/countTokens.ts # Pour tester le nombre de tokens (input-output) consommer par OpenAI

```

## 📦 Prisma

```bash
npx prisma migrate dev   # Appliquer les migrations
npx prisma db push       # Mettre à jour la base sans migration
npx prisma generate      # Générer le client Prisma
npx prisma studio        # Ouvrir Prisma Studio (GUI)
```

## 📦 Structure du projet

```bash
├── app/            # Pages et routes Next.js
│   └── page.tsx    # Exemple de page
├── components/     # Composants UI réutilisables
├── hooks/          # Hooks personnalisés
├── lib/            # Librairies utilitaires (Prisma, Cloudinary, etc.)
├── prisma/         # Schéma Prisma et migrations
│   └── schema.prisma
├── public/         # Fichiers statiques (logos, images, etc.)
├── .env            # Variables d'environnement
└── README.md       # Documentation du projet
```

## APIs

Product
GET /api/products → liste

POST /api/products → créer

GET /api/products/:id → détail

PUT /api/products/:id → update

DELETE /api/products/:id → suppression

## Role-Based Access Control

| Rôle              | Accès / Actions possibles                              |
| ----------------- | ------------------------------------------------------ |
| `ADMINSYSTEM`     | Tout (gestion des rôles, produits, utilisateurs, etc.) |
| `ADMIN`           | CRUD produits + gestion d’équipe                       |
| `PRODUCT MANAGER` | Lecture + édition produits de son équipe               |
| `CONSULTANT`      | Lecture seule                                          |

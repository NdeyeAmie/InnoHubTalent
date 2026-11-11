import {
  PrismaClient,
  Role,
  Status,
  ProductType,
  Feasibility,
  Impact,
  RiskLevel,
  IdeaStatus,
} from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash('123', 10);

  const ibrahima = await prisma.user.upsert({
    where: { email: 'ibrahima.gueye@talentsconsult.com' },
    update: { password },
    create: {
      email: 'ibrahima.gueye@talentsconsult.com',
      password,
      firstname: 'Ibrahima',
      lastname: 'Gueye',
      role: Role.ADMINSYSTEM,
      department: 'R&D',
      status: Status.ACTIVE,
    },
  });

  const diegane = await prisma.user.upsert({
    where: { email: 'diegane.sarr@talentsconsult.com' },
    update: { password },
    create: {
      email: 'diegane.sarr@talentsconsult.com',
      password,
      firstname: 'Diegane',
      lastname: 'Sarr',
      role: Role.ADMINSYSTEM,
      department: 'R&D',
      status: Status.ACTIVE,
    },
  });

  const admin = await prisma.user.upsert({
    where: { email: 'developer@talentsconsult.com' },
    update: { password },
    create: {
      email: 'developer@talentsconsult.com',
      password,
      firstname: 'Admin',
      lastname: 'Admin',
      role: Role.ADMIN,
      department: 'Global',
      status: Status.ACTIVE,
    },
  });

  const productManager = await prisma.user.upsert({
    where: { email: 'manager@talentsconsult.com' },
    update: { password },
    create: {
      email: 'manager@talentsconsult.com',
      password,
      firstname: 'Product Manager',
      lastname: '',
      role: Role.PRODUCTMANAGER,
      department: '',
      status: Status.ACTIVE,
    },
  });

  const consultant = await prisma.user.upsert({
    where: { email: 'consultant@talentsconsult.com' },
    update: { password },
    create: {
      email: 'consultant@talentsconsult.com',
      password,
      firstname: 'Consultant',
      lastname: 'Gueye',
      role: Role.CONSULTANT,
      department: '',
      status: Status.ACTIVE,
    },
  });

  const developer = await prisma.user.upsert({
    where: { email: 'developer@talentsconsult.com' },
    update: { password },
    create: {
      email: 'developer@talentsconsult.com',
      password,
      firstname: 'Admin',
      lastname: 'Admin',
      role: Role.ADMIN,
      department: 'Global',
      status: Status.ACTIVE,
    },
  });

  console.log('✅ Utilisateurs admins créés :', [
    ibrahima.email,
    diegane.email,
    developer.email,
    admin.email,
    productManager.email,
    consultant.email,
  ]);

  // Création de quelques produits de test
  const products = await prisma.$transaction([
    prisma.product.upsert({
      where: { id: 'prod_app_1' },
      update: {},
      create: {
        id: 'prod_app_1',
        name: 'Analyx Budget',
        description: 'Appliucation de gestion budgetaire',
        type: ProductType.APPLICATION,
        status: 'RUNNING',
        version: '1.0.0',
        category: 'IT',
        tags: ['app', 'business', 'Finance', 'Compta'],
        isPublic: true,
        ownerId: ibrahima.id,
        meta: { vendor: 'Talents Consulting' },
      },
    }),

    prisma.product.upsert({
      where: { id: 'prod_workflow_1' },
      update: {},
      create: {
        id: 'prod_workflow_1',
        name: 'Workflow Habilitation',
        description: 'Un workflow pour automatiser vos tâches',
        type: ProductType.WORKFLOW,
        status: 'RUNNING',
        category: 'Automation',
        tags: ['jira', 'workflow', 'RH', 'habilitation'],
        isPublic: true,
        ownerId: diegane.id,
        meta: { steps: 5, tool: 'Airflow' },
      },
    }),

    prisma.product.upsert({
      where: { id: 'prod_workflow_2' },
      update: {},
      create: {
        id: 'prod_workflow_2',
        name: 'Workflow Crédit',
        description: 'Un workflow pour automatiser les tâches liées au crédit',
        type: ProductType.WORKFLOW,
        status: 'STOPPED',
        category: 'Finance',
        isPublic: false,
        ownerId: ibrahima.id,
        meta: { steps: 5, tool: 'Airflow' },
      },
    }),

    prisma.product.upsert({
      where: { id: 'prod_robot_1' },
      update: {},
      create: {
        id: 'prod_robot_1',
        name: 'Robot Habilitation',
        description:
          'Gestion des habilitations sur Amplitude Nouvelle Recrue, Mobilité, Congé ...',
        type: ProductType.ROBOT,
        status: 'RUNNING',
        category: 'Security',
        isPublic: false,
        ownerId: ibrahima.id,
        thumbnail:
          'https://res.cloudinary.com/dbt6tzjzc/image/upload/v1758222582/thumbnail_robot_habilitation_pmrakb.jpg',
        flowchart:
          'https://res.cloudinary.com/dbt6tzjzc/image/upload/v1758283010/flowchart_robot_habilitation_q8vduc.png',
        readme: `# Robot Habilitation - Guide de démarrage

          ## Description
          Ce robot permet de gérer les habilitations sur Amplitude pour les nouvelles recrues, la mobilité et les congés.
          
          ## Identifiants de connexion
          - **Utilisateur test** : test.user@example.com
          - **Mot de passe** : P@ssword123
          
          ## Prérequis
          - Node.js >= 18
          - UiPath Studio / Orchestrator
          - Accès à l’API Amplitude
          
          ## Installation
          1. Cloner le dépôt GitHub : https://github.com/ton-organisation/robot-habilitation
          2. Installer les dépendances : \`npm install\`
          3. Configurer le fichier \`.env\` avec vos identifiants et URL de l’API
          
          ## Lancement
          - Commande pour démarrer le robot : \`npm run start\` ou selon ton script
          
          ## Liens utiles
          - Dépôt GitHub : https://github.com/ton-organisation/robot-habilitation
          - Documentation UiPath : https://docs.uipath.com
          
          ## Notes
          - Assurez-vous que les identifiants et les droits sont corrects avant de lancer le robot.
          - Ce guide peut être mis à jour en fonction des nouvelles versions.`,
        repositoryUrl: 'https://github.com/ton-organisation/robot-habilitation',
        techStack: ['UiPath', 'VBA'],
      },
    }),

    prisma.product.upsert({
      where: { id: 'prod_robot_2' },
      update: {},
      create: {
        id: 'prod_robot_2',
        name: 'Robot Fiabilisation',
        description: 'Fiabilisation en masse des données clients Amplitude',
        type: ProductType.ROBOT,
        status: 'RUNNING',
        category: 'Data',
        isPublic: true,
        ownerId: ibrahima.id,
        thumbnail:
          'https://res.cloudinary.com/dbt6tzjzc/image/upload/v1758222606/thumbnail_robot_fiabilisation_iguiv2.avif',
        meta: { stack: 'UiPath' },
      },
    }),

    prisma.product.upsert({
      where: { id: 'prod_robot_3' },
      update: {},
      create: {
        id: 'prod_robot_3',
        name: 'Robot Update Chapter',
        description:
          'Automatisation des changements de chapitres Recouvrement sur amplitude',
        type: ProductType.ROBOT,
        status: 'DEPRECATED',
        category: 'Banking',
        isPublic: false,
        ownerId: diegane.id,
        thumbnail:
          'https://res.cloudinary.com/dbt6tzjzc/image/upload/v1758222599/thumbnail_robot_update_chapter_rqzykc.avif',
        meta: { stack: 'UiPath' },
      },
    }),

    prisma.product.upsert({
      where: { id: 'prod_robot_4' },
      update: {},
      create: {
        id: 'prod_robot_4',
        name: 'Robot Virement Multiple',
        description: 'Automatisation des virements multiples sur amplitude',
        type: ProductType.ROBOT,
        status: 'RUNNING',
        category: 'Payments',
        isPublic: true,
        ownerId: diegane.id,
        thumbnail:
          'https://res.cloudinary.com/dbt6tzjzc/image/upload/v1758222621/thumbnail_robot_virement_multiple_ze65px.jpg',
        meta: { stack: 'UiPath' },
      },
    }),
  ]);

  console.log(
    '✅ Produits créés :',
    products.map((p) => p.name)
  );

  // 🔹 Exemple d’activité pour ton admin
  await prisma.activity.create({
    data: {
      userId: ibrahima.id,
      action: 'Seed initial',
      type: 'INIT',
      meta: { note: 'Création via script seed.ts' },
    },
  });

  console.log('✅ Activité enregistrée pour l’admin');
}

// 🔹 Seed des idées
const ideas = await prisma.$transaction([
  prisma.idea.upsert({
    where: { id: 'idea_1' },
    update: {},
    create: {
      id: 'idea_1',
      title: 'Automatisation des rapports financiers',
      submissionDate: new Date(),
      author: 'Ibrahima Gueye',
      description: 'Automatiser la génération de rapports financiers mensuels.',
      problem: 'Rapports générés manuellement prennent trop de temps.',
      targetClients: 'Finance, Comptabilité',
      expectedBenefits: 'Gain de temps, réduction des erreurs humaines',
      similarProducts: 'Excel macros internes',
      differentiators: 'Intégration complète avec ERP existant',
      resourcesNeeded: '2 devs, 1 analyste, 1 mois',
      priority: 'Nouveau',
      committeeComment: '',
      features: [
        { name: 'Export PDF', done: false },
        { name: 'Dashboard', done: false },
      ],
      mvpSteps: ['Analyser les données', 'Créer modèles automatisés', 'Tester'],
      roiEstimate: 50000,
      feasibility: Feasibility.HIGH,
      impact: Impact.HIGH,
      riskLevel: RiskLevel.LOW,
      status: IdeaStatus.PROPOSED,
      category: 'Finance',
      votes: 5,
    },
  }),
  prisma.idea.upsert({
    where: { id: 'idea_2' },
    update: {},
    create: {
      id: 'idea_2',
      title: 'Plateforme interne de partage de connaissances',
      submissionDate: new Date(),
      author: 'Diegane Sarr',
      description:
        'Créer un wiki interne pour centraliser les bonnes pratiques.',
      problem: 'Informations dispersées entre Slack, emails et docs.',
      targetClients: 'Tous les départements',
      expectedBenefits: 'Gain de temps, onboarding plus rapide',
      similarProducts: 'Confluence, Notion',
      differentiators: 'Intégration native avec outils internes',
      resourcesNeeded: '1 dev, 2 mois',
      priority: 'Nouveau',
      committeeComment: '',
      features: [
        { name: 'Recherche rapide', done: false },
        { name: 'Commentaires', done: false },
      ],
      mvpSteps: ['Architecture', 'Création du wiki', 'Test interne'],
      roiEstimate: 30000,
      feasibility: Feasibility.MEDIUM,
      impact: Impact.MEDIUM,
      riskLevel: RiskLevel.MEDIUM,
      status: IdeaStatus.PROPOSED,
      category: 'Knowledge Management',
      votes: 3,
    },
  }),
  prisma.idea.upsert({
    where: { id: 'idea_3' },
    update: {},
    create: {
      id: 'idea_3',
      title: 'Chatbot d’assistance interne',
      submissionDate: new Date(),
      author: 'Admin',
      description:
        'Un chatbot pour répondre aux questions fréquentes des employés.',
      problem: 'Trop de tickets récurrents au support RH et IT.',
      targetClients: 'Ressources Humaines, IT',
      expectedBenefits:
        'Réduction du volume de tickets, meilleure satisfaction',
      similarProducts: 'Slack bot interne',
      differentiators: 'Apprentissage automatique sur les tickets passés',
      resourcesNeeded: '1 dev IA, 1 dev front, 2 mois',
      priority: 'Nouveau',
      committeeComment: '',
      features: [
        { name: 'Réponses automatiques', done: false },
        { name: 'Escalade ticket', done: false },
      ],
      mvpSteps: ['Collecter FAQ', 'Créer modèle NLP', 'Déployer sur Slack'],
      roiEstimate: 40000,
      feasibility: Feasibility.MEDIUM,
      impact: Impact.HIGH,
      riskLevel: RiskLevel.MEDIUM,
      status: IdeaStatus.PROPOSED,
      category: 'Support & IT',
      votes: 4,
    },
  }),
]);

console.log(
  '✅ Idées créées :',
  ideas.map((i) => i.title)
);

main()
  .catch((e) => {
    console.error('❌ Erreur lors du seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

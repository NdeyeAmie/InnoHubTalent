'use client';

import * as React from 'react';
import {
  Users,
  CodeXml,
  ShoppingBasket,
  SquareChartGantt,
  Lightbulb,
  List,
} from 'lucide-react';

import { NavMain } from './NavMain';
import { NavSettings } from './NavSettings';
import { NavUser } from './NavUser';
import { TeamSwitcher } from './TeamSwitcher';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarSeparator,
} from '@/components/ui/sidebar';

import { useSidebarData } from '@/hooks/useSidebarData';
import { NavHome } from './NavHome';
import { NavSearchForm } from './NavSearchForm';
import { NavIdeas } from './NavIdeas';
import NavTable from './NavTable';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { navMain } = useSidebarData();

  const teams = [
    { name: 'Equipe Développeurs', logo: CodeXml, plan: 'Talents Consulting' },
    { name: 'Equipe MOA', logo: SquareChartGantt, plan: 'Talents Consulting' },
    {
      name: 'Equipe Commerciale',
      logo: ShoppingBasket,
      plan: 'Talents Consulting',
    },
  ];

  const settings = [{ name: 'Utilisateurs', url: '/users', icon: Users }];
  const ideas = [
    { name: 'Assistant IA - Recueil Idée', url: '/ideasAI', icon: Lightbulb },
    { name: 'Liste Idèes', url: '/ideasList', icon: List },
  ];

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={teams} />
      </SidebarHeader>

      <SidebarContent>
        <NavSearchForm />
        <NavHome />
        <SidebarSeparator />

        {/* Ajoute le bouton Tableau ici */}
        <NavTable />
        <SidebarSeparator />

        <NavMain
          items={navMain.map((section) => ({
            title: section.title,
            url: section.url,
            items: section.items,
            icon: section.icon,
          }))}
        />
        <SidebarSeparator />
        <NavSettings settings={settings} />

        <SidebarSeparator />
        <NavIdeas ideas={ideas} />
        <SidebarSeparator />
      </SidebarContent>

      <SidebarFooter>
        <NavUser />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}

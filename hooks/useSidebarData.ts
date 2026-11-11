'use client';

import { useMemo } from 'react';
import { TabletSmartphone, Workflow, Bot, LucideIcon } from 'lucide-react';
import { useGetProducts } from '@/hooks/products/useGetProducts';
import { ProductType, Product } from '@prisma/client';

type NavItem = {
  title: string;
  url: string;
};

type NavSection = {
  title: string;
  url: string;
  icon: LucideIcon;
  items: NavItem[];
};

export function useSidebarData() {
  // On récupère les produits pour chaque type
  const { data: apps } = useGetProducts('APPLICATION' as ProductType);
  const { data: workflows } = useGetProducts('WORKFLOW' as ProductType);
  const { data: robots } = useGetProducts('ROBOT' as ProductType);

  const navMain: NavSection[] = useMemo(() => {
    const buildSection = (
      title: string,
      data: any[] | undefined,
      icon: any
    ) => ({
      title,
      url: '#',
      icon,
      items: (data?.products ?? []).map((item) => ({
        title: item.name,
        url: `/products/${item.id}`,
      })),
    });

    return [
      buildSection('Applications', apps, TabletSmartphone),
      buildSection('Workflows', workflows, Workflow),
      buildSection('Robots', robots, Bot),
    ];
  }, [apps, workflows, robots]);

  return {
    navMain,
    versions: ['1.0.1', '1.1.0-alpha', '2.0.0-beta1'], // placeholder
  };
}

'use client';

import { ReactNode } from 'react';
import { AppSidebar } from '@/components/sidebar/AppSidebar';
import { Separator } from '@/components/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { BreadcrumbProvider } from '@/hooks/useBreadcrumb';
import { HeaderBreadcrumb } from './HeaderBreadcrumb';
import { ThemeSelect } from '../theme/ThemeSelect';
import { NavUser } from '../sidebar/NavUser';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <SidebarProvider>
      <BreadcrumbProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="bg-background sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />

            <HeaderBreadcrumb />

            <div className="ml-auto flex items-center gap-2">
              <NavUser />
              <ThemeSelect />
            </div>
          </header>

          {children}
        </SidebarInset>
      </BreadcrumbProvider>
    </SidebarProvider>
  );
};

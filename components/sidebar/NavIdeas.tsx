'use client';

import { type LucideIcon, Sparkles } from 'lucide-react';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

export function NavIdeas({
  ideas,
}: {
  ideas: {
    name: string;
    url: string;
    icon: LucideIcon;
  }[];
}) {
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel className="flex items-center gap-2 text-indigo-600 font-semibold">
        <Sparkles className="h-4 w-4 text-yellow-500 animate-pulse" />
        Boîte à Idées
      </SidebarGroupLabel>

      <SidebarMenu className="space-y-2 mt-2 an">
        {ideas.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild>
              <a
                href={item.url}
                className={cn(
                  'flex items-center gap-2 text-white bg-gradient-to-r from-blue-800 via-blue-500 to-cyan-400',

                  'hover:from-cyan-400 hover:via-blue-500 hover:to-blue-800 hover:text-white',
                  'shadow-lg shadow-purple-300/50 rounded-xl transition-all duration-300 transform hover:scale-105'
                )}
              >
                <div className="p-1 rounded-lg">
                  <item.icon className="h-5 w-5" />
                </div>
                <span className="font-semibold">{item.name}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}

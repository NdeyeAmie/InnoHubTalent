'use client';

import { ChevronsUpDown, Loader2, LogOut, Activity } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';

import { useAuth } from '@/hooks/useAuth';
import { UpdatePasswordDialog } from '../users/UpdatePasswordDialog';
import { UserProfileDialog } from '../users/UserProfileDialog';
import { UserActivitiesDialog } from '../users/UserActivitiesDialog';

export function NavUser() {
  const { isMobile } = useSidebar();
  const { logout, user, loading } = useAuth();

  if (loading) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <div className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground">
            <Loader2 className="w-4 h-4 animate-spin" />
            Chargement...
          </div>
        </SidebarMenuItem>
      </SidebarMenu>
    );
  }

  if (!user) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <div className="px-4 py-2 text-sm text-red-500">Non connecté</div>
        </SidebarMenuItem>
      </SidebarMenu>
    );
  }

  const displayName =
    (user.firstname && user.lastname
      ? `${user.firstname} ${user.lastname}`
      : user.firstname || user.lastname || user.email.split('@')[0]) ??
    'Utilisateur';

  const initials = [
    user.firstname?.charAt(0) ?? '',
    user.lastname?.charAt(0) ?? '',
  ]
    .join('')
    .toUpperCase();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8">
                {user.avatar ? (
                  <AvatarImage
                    src={user.avatar}
                    alt={displayName}
                    className="rounded-lg object-cover"
                  />
                ) : (
                  <AvatarFallback>
                    <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square h-8 w-8 items-center justify-center rounded-lg">
                      {initials || '?'}
                    </div>
                  </AvatarFallback>
                )}
              </Avatar>

              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{displayName}</span>
                <span className="truncate text-xs">{user.email}</span>
                <span className="italic truncate text-xs font-bold">
                  ({user.role})
                </span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? 'bottom' : 'right'}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8">
                  {user.avatar ? (
                    <AvatarImage
                      src={user.avatar}
                      alt={displayName}
                      className="rounded-lg object-cover"
                    />
                  ) : (
                    <AvatarFallback>
                      <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square h-8 w-8 items-center justify-center rounded-lg">
                        {initials || '?'}
                      </div>
                    </AvatarFallback>
                  )}
                </Avatar>

                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{displayName}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <UserProfileDialog user={user} />
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <UserActivitiesDialog
                  userId={user.id}
                  trigger={
                    <Button
                      variant="ghost"
                      className="-ml-1 flex justify-start items-center w-full font-normal"
                    >
                      <Activity className="w-4 h-4 mr-2" />
                      Mes activités
                    </Button>
                  }
                />
              </DropdownMenuItem>
              <UpdatePasswordDialog />
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={logout}
              className="text-red-600 focus:bg-red-50 focus:text-red-600"
            >
              <LogOut className="mr-2 size-4 text-red-600" />
              <span>Se Déconnecter</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

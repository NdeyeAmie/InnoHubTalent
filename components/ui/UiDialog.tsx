'use client';

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { LucideIcon } from 'lucide-react';
import { Separator } from './separator';

type DialogHeight = 'sm' | 'md' | 'lg' | 'xl' | 'full';

const heightMap: Record<DialogHeight, string> = {
  sm: 'max-h-[50vh]',
  md: 'max-h-[70vh]',
  lg: 'max-h-[85vh]',
  xl: 'max-h-[90vh]',
  full: 'max-h-screen',
};

export function UiDialog({
  open,
  setOpen,
  title,
  description,
  icon: Icon,
  trigger,
  children,
  height = 'md',
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
  title: string;
  description?: string;
  icon?: LucideIcon;
  trigger: React.ReactNode;
  children: React.ReactNode;
  height?: DialogHeight;
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent
        className={`${heightMap[height]} overflow-y-auto sm:max-w-4xl
`}
      >
        <DialogTitle className="flex items-center gap-2">
          <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
            {Icon && <Icon className="h-5 w-5" />}
          </div>
          {title}
        </DialogTitle>
        {description && <DialogDescription>{description}</DialogDescription>}
        <Separator />
        {children}
      </DialogContent>
    </Dialog>
  );
}

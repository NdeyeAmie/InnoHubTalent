'use client';

import { Button } from '@/components/ui/button';
import { ArrowUpDown } from 'lucide-react';
import { Column } from '@tanstack/react-table';

interface SortableHeaderProps<TData> {
  column: Column<TData, unknown>;
  title: string;
}

export function SortableHeader<TData>({
  column,
  title,
}: SortableHeaderProps<TData>) {
  return (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      className="flex gap-2 w-full justify-start font-bold"
    >
      {title}
      <ArrowUpDown className="h-4 w-4" />
    </Button>
  );
}

'use client';

import * as React from 'react';
import { Table } from '@tanstack/react-table';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

interface UiSelectProps<TData> {
  table: Table<TData>;
  columnId: string;
  options: { value: string; label: string }[];
  stats?: { [key: string]: any; _count: { [key: string]: number } }[];
  statsKey: string;
  total: number;
  placeholder?: string;
}

export function UiSelect<TData>({
  table,
  columnId,
  options,
  stats,
  statsKey,
  total,
  placeholder = 'Filtrer...',
}: UiSelectProps<TData>) {
  return (
    <Select
      defaultValue="all"
      onValueChange={(value) =>
        table.getColumn(columnId)?.setFilterValue(value === 'all' ? '' : value)
      }
    >
      <SelectTrigger className="w-[220px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">
          <Badge variant="default" className="mr-2">
            {total}
          </Badge>
          Tous{' '}
        </SelectItem>

        {options.map((opt) => {
          const count =
            stats?.find((s) => s[statsKey] === opt.value)?._count?.[statsKey] ??
            0;

          return (
            <SelectItem key={opt.value} value={opt.value}>
              <Badge variant="default" className="mr-2">
                {count}
              </Badge>
              {opt.label}{' '}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}

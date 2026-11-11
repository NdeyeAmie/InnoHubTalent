'use client';

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import React from 'react';
import { Input } from '@/components/ui/input';
import { DataTablePagination } from './data-table-pagination';
import { STATUS_IDEAS_OPTIONS } from '@/lib/types/IdeaStatus';
import { FEASIBILITY_OPTIONS } from '@/lib/types/Feasibility';
import { UiTabs } from '@/components/ui/UiTabsTable';
import { UiSelect } from '@/components/ui/UiSelect';

type IdeaStats = {
  byStatus: { status: string; _count: { status: number } }[];
  byFeasibility: { feasibility: string; _count: { feasibility: number } }[];
  total: number;
};

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  statsIdeas: IdeaStats;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  statsIdeas,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = React.useState('');

  const table = useReactTable({
    data,
    columns,
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      globalFilter,
      columnPinning: {
        left: ['actions'],
      },
    },
    initialState: {
      pagination: {
        pageSize: 15,
      },
    },
  });

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-4">
        <Input
          placeholder="Rechercher globale..."
          value={globalFilter ?? ''}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="max-w-sm"
        />

        <UiTabs
          columnId="feasibility"
          table={table}
          options={FEASIBILITY_OPTIONS}
          stats={statsIdeas?.byFeasibility}
          statsKey="feasibility"
          total={statsIdeas?.total ?? 0}
        />
        <UiSelect
          columnId="status"
          table={table}
          options={STATUS_IDEAS_OPTIONS}
          stats={statsIdeas?.byStatus}
          statsKey="status"
          total={statsIdeas?.total ?? 0}
          placeholder="Filtrer par statut"
        />
      </div>

      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Pas de données.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className=" py-2">
        <DataTablePagination table={table} />
      </div>
    </div>
  );
}

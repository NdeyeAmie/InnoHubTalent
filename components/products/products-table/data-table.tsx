'use client';

import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  ColumnDef,
  SortingState,
  getFilteredRowModel,
  getSortedRowModel,
} from '@tanstack/react-table';
import { DataTablePagination } from '@/components/users/users-table/data-table-pagination';
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
import { UiTabs } from '@/components/ui/UiTabsTable';
import { PRODUCT_TYPES_OPTIONS } from '@/lib/types/ProductType';
import { PRODUCT_STATUS_OPTIONS } from '@/lib/types/ProductStatus';

type ProductStats = {
  byStatus: { status: string; _count: { status: number } }[];
  byType: { type: string; _count: { type: number } }[];
  total: number;
};

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  statsProducts: ProductStats;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  statsProducts,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = React.useState('');

  const table = useReactTable({
    data,
    columns,
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      globalFilter,
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
          columnId="type"
          table={table}
          options={PRODUCT_TYPES_OPTIONS}
          stats={statsProducts?.byType}
          statsKey="type"
          total={statsProducts?.total ?? 0}
        />

        <UiTabs
          columnId="status"
          table={table}
          options={PRODUCT_STATUS_OPTIONS}
          stats={statsProducts?.byStatus}
          statsKey="status"
          total={statsProducts?.total ?? 0}
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

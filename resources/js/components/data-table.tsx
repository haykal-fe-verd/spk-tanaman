import React from "react";
import { type Table as TanstackTable, flexRender } from "@tanstack/react-table";

import { cn } from "@/lib/utils";

import { DataTablePagination } from "@/components/data-table-pagination";
import { DataTableViewOptions } from "@/components/data-table-view-options";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";

interface DataTableProps<TData> {
    table: TanstackTable<TData>;
    search: string;
    onSearchChange: (value: string) => void;
    actionBar?: React.ReactNode;
}

export function DataTable<TData>({
    table,
    search,
    onSearchChange,
    actionBar,
}: DataTableProps<TData>) {
    return (
        <div
            className={cn("flex w-full flex-col gap-2.5 overflow-auto")}
            style={{ overflow: "visible" }}
        >
            <div
                role="toolbar"
                aria-orientation="horizontal"
                className="flex w-full items-start justify-between gap-2"
            >
                <Input
                    type="search"
                    placeholder="Cari..."
                    className="h-9 w-40 lg:w-56"
                    value={search}
                    onChange={(e) => onSearchChange(e.target.value)}
                />

                <DataTableViewOptions table={table} />
            </div>

            <div className="overflow-hidden rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead
                                        key={header.id}
                                        colSpan={header.colSpan}
                                    >
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef
                                                      .header,
                                                  header.getContext()
                                              )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && "selected"
                                    }
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
                                    colSpan={table.getAllColumns().length}
                                    className="h-20 text-center"
                                >
                                    Tidak ada data untuk ditampilkan.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex flex-col gap-2.5">
                <DataTablePagination table={table} />
                {actionBar &&
                    table.getFilteredSelectedRowModel().rows.length > 0 &&
                    actionBar}
            </div>
        </div>
    );
}

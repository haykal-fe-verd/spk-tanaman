import { ColumnDef } from "@tanstack/react-table";

import type { SubKriteria } from "@/types";
import { formatDate } from "@/lib/utils";

import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/data-table-column-header";

export const columns: ColumnDef<SubKriteria>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <div className="w-full text-center">
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && "indeterminate")
                    }
                    onCheckedChange={(value) =>
                        table.toggleAllPageRowsSelected(!!value)
                    }
                    aria-label="Select all"
                />
            </div>
        ),
        cell: ({ row }) => (
            <div className="flex justify-center">
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            </div>
        ),
        enableSorting: false,
        enableHiding: false,
        size: 40,
    },
    {
        id: "no",
        header: () => <div className="text-center">No</div>,
        cell: ({ row, table }) => {
            const pageIndex = table.getState().pagination.pageIndex;
            const pageSize = table.getState().pagination.pageSize;
            const number = pageIndex * pageSize + row.index + 1;

            return <div className="text-center w-full">{number}</div>;
        },

        enableSorting: false,
        enableHiding: false,
        size: 40,
    },
    {
        id: "kriteria.nama",
        accessorKey: "kriteria.nama",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Nama Kriteria" />
        ),
        cell: ({ row }) => {
            const kriteria = row.original.kriteria?.nama || "-";
            return <div className="whitespace-nowrap">{kriteria}</div>;
        },
    },
    {
        id: "nama",
        accessorKey: "nama",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Nama Sub Kriteria" />
        ),
    },
    {
        id: "nilai",
        accessorKey: "nilai",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Nilai (TOPSIS)" />
        ),
        cell: ({ row }) => {
            const nilai = row.getValue("nilai") as number;
            return (
                <div className="whitespace-nowrap">
                    {nilai != null ? nilai.toFixed(1) : "-"}
                </div>
            );
        },
    },
    {
        id: "created_at",
        accessorKey: "created_at",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Tanggal Dibuat" />
        ),
        cell: ({ row }) => {
            const rawDate = row.getValue("created_at") as string;
            return (
                <div className="whitespace-nowrap">{formatDate(rawDate)}</div>
            );
        },
    },
];

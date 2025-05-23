import { ColumnDef } from '@tanstack/react-table';

import type { SyaratTanam } from '@/types';
import { formatDate } from '@/lib/utils';

import { Checkbox } from '@/components/ui/checkbox';
import { DataTableColumnHeader } from '@/components/data-table-column-header';

export const columns: ColumnDef<SyaratTanam>[] = [
    {
        id: 'select',
        header: ({ table }) => (
            <div className="w-full text-center">
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && 'indeterminate')
                    }
                    onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                />
            </div>
        ),
        cell: ({ row }) => (
            <div className="flex justify-center">
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={value => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            </div>
        ),
        enableSorting: false,
        enableHiding: false,
        size: 40,
    },
    {
        id: 'no',
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
        id: 'tanaman',
        accessorKey: 'tanaman.nama',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Tanaman" />,
    },
    {
        id: 'kriteria',
        accessorKey: 'kriteria.nama',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Kriteria" />,
    },
    {
        id: 'subkriteria',
        accessorKey: 'subkriteria.nama',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Sub Kriteria" />,
        enableSorting: false,
        enableHiding: false,
    },
    {
        id: 'nilai',
        accessorKey: 'nilai',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Nilai" />,
    },
    {
        id: 'created_at',
        accessorKey: 'created_at',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Tanggal Dibuat" />,
        cell: ({ row }) => {
            const rawDate = row.getValue('created_at') as string;
            return <div className="whitespace-nowrap">{formatDate(rawDate)}</div>;
        },
    },
];

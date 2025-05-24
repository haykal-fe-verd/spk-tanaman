import React from 'react';
import { ChevronsUpDown, Settings2 } from 'lucide-react';
import type { Table } from '@tanstack/react-table';
import { formatColumnId } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface DataTableViewOptionsProps<TData> {
    table: Table<TData>;
}

export function DataTableViewOptions<TData>({ table }: DataTableViewOptionsProps<TData>) {
    // state
    const columns = React.useMemo(
        () =>
            table
                .getAllColumns()
                .filter(column => typeof column.accessorFn !== 'undefined' && column.getCanHide()),
        [table]
    );

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    aria-label="Toggle columns"
                    role="combobox"
                    variant="outline"
                    size="sm"
                    className="ml-auto h-8 flex"
                >
                    <Settings2 />
                    Kolom
                    <ChevronsUpDown className="ml-auto opacity-50" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[150px]">
                {columns.map(column => {
                    return (
                        <DropdownMenuCheckboxItem
                            key={column.id}
                            className="capitalize"
                            checked={column.getIsVisible()}
                            onCheckedChange={value => column.toggleVisibility(!!value)}
                        >
                            {formatColumnId(column.id)}
                        </DropdownMenuCheckboxItem>
                    );
                })}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

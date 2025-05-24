import { ColumnDef } from '@tanstack/react-table';
import { Eye, MoreHorizontal, SquarePen, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { kriteriaFilter } from '@/data/filter';

export function dataTableWithRowAction<T extends { nama: string }>(
    columns: ColumnDef<T>[],
    onAction: (type: 'detail' | 'edit' | 'delete', data: T) => void
): ColumnDef<T>[] {
    return [
        ...columns,
        {
            id: 'actions',
            cell: ({ row }) => {
                const data = row.original;
                const isProtected = kriteriaFilter.includes(data.nama ?? '');

                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => onAction('detail', row.original)}>
                                <Eye />
                                Detail
                            </DropdownMenuItem>
                            {!isProtected && (
                                <>
                                    <DropdownMenuItem onClick={() => onAction('edit', data)}>
                                        <SquarePen className="mr-2 h-4 w-4" />
                                        Edit
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                        className="text-destructive"
                                        onClick={() => onAction('delete', data)}
                                    >
                                        <Trash2 className="mr-2 h-4 w-4" />
                                        Hapus
                                    </DropdownMenuItem>
                                </>
                            )}
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ];
}

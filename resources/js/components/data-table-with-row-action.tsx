import { ColumnDef } from "@tanstack/react-table";
import { Eye, MoreHorizontal, SquarePen, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

export function dataTableWithRowAction<T>(
    columns: ColumnDef<T>[],
    onAction: (type: "detail" | "edit" | "delete", data: T) => void
): ColumnDef<T>[] {
    return [
        ...columns,
        {
            id: "actions",
            cell: ({ row }) => (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem
                            onClick={() => onAction("detail", row.original)}
                        >
                            <Eye />
                            Detail
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => onAction("edit", row.original)}
                        >
                            <SquarePen />
                            Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => onAction("delete", row.original)}
                        >
                            <Trash2 />
                            Hapus
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ),
        },
    ];
}

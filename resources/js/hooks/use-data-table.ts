import React from "react";
import { pickBy } from "lodash";
import { router } from "@inertiajs/react";
import {
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    ColumnDef,
} from "@tanstack/react-table";

import type { SortingState } from "@tanstack/react-table";
import type { PaginationType } from "@/types";
import { useDebounce } from "@/hooks/use-debounce";

interface UseDataTableOptions<TData> {
    columns: ColumnDef<TData>[];
    data: TData[];
    meta: PaginationType<TData>;
    routeName: string;
    defaultSort?: { id: string; desc: boolean };
}

type QueryParams = {
    page?: number;
    per_page?: number;
    search?: string;
    sort_by?: string;
    sort_dir?: string;
};

export function useDataTable<TData>({
    columns,
    data,
    meta,
    routeName,
    defaultSort = { id: "created_at", desc: true },
}: UseDataTableOptions<TData>) {
    const query = route().params || {};
    const isFirstRender = React.useRef(true);

    // states
    const [activeAction, setActiveAction] = React.useState<{
        type: "create" | "detail" | "edit" | "delete";
        data?: TData;
    } | null>(null);
    const closeAction = () => setActiveAction(null);
    const [pagination, setPagination] = React.useState({
        pageIndex: meta.current_page - 1,
        pageSize: meta.per_page,
    });
    const [search, setSearch] = React.useState<string>(
        (query.search as string) || ""
    );
    const debouncedSearch = useDebounce(search, 500);
    const [sorting, setSorting] = React.useState<SortingState>(() => {
        if (query.sort_by) {
            return [
                {
                    id: query.sort_by as string,
                    desc: query.sort_dir === "desc",
                },
            ];
        }

        return [defaultSort];
    });
    const [rowSelection, setRowSelection] = React.useState({});

    // effects
    React.useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        const query = pickBy<QueryParams>(
            {
                page:
                    pagination.pageIndex + 1 !== 1
                        ? pagination.pageIndex + 1
                        : undefined,
                per_page:
                    pagination.pageSize !== 10
                        ? pagination.pageSize
                        : undefined,
                search:
                    debouncedSearch.trim() !== "" ? debouncedSearch : undefined,
                sort_by:
                    sorting.length > 0 && sorting[0]?.id !== defaultSort.id
                        ? sorting[0]?.id
                        : undefined,
                sort_dir:
                    sorting.length > 0 &&
                    (sorting[0]?.id !== defaultSort.id ||
                        sorting[0]?.desc !== defaultSort.desc)
                        ? sorting[0]?.desc
                            ? "desc"
                            : "asc"
                        : undefined,
            },
            (value) => value !== undefined
        );

        router.get(route(routeName), query, {
            preserveState: true,
            replace: true,
            only: ["response"],
        });
    }, [
        debouncedSearch,
        defaultSort.desc,
        defaultSort.id,
        pagination.pageIndex,
        pagination.pageSize,
        routeName,
        sorting,
    ]);

    const table = useReactTable({
        data,
        columns,
        pageCount: meta.last_page,
        state: {
            pagination,
            rowSelection,
            sorting,
        },
        manualPagination: true,
        onRowSelectionChange: setRowSelection,
        onPaginationChange: setPagination,
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    return {
        table,
        search,
        setSearch,
        activeAction,
        setActiveAction,
        closeAction,
    };
}

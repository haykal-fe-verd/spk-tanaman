import React from 'react';
import { Download, Trash } from 'lucide-react';
import * as XLSX from 'xlsx';
import { router } from '@inertiajs/react';

import type { Table } from '@tanstack/react-table';
import { SubKriteria } from '@/types';
import { formatDate } from '@/lib/utils';

import {
    DataTableActionBar,
    DataTableActionBarAction,
    DataTableActionBarSelection,
} from '@/components/data-table-action-bar';
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';

interface ActionBarProps {
    table: Table<SubKriteria>;
}

function ActionBar({ table }: ActionBarProps) {
    // states
    const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);

    const selectedRows = table.getFilteredSelectedRowModel().rows.map(row => row.original);

    // events
    const handleExportSelected = () => {
        if (selectedRows.length === 0) return;

        const dataToExport = selectedRows.map(({ id, kriteria, nama, created_at, updated_at }) => ({
            Id: id,
            Kriteria: kriteria.nama,
            Nama: nama,
            Created: formatDate(created_at),
            Updated: formatDate(updated_at),
        }));

        const worksheet = XLSX.utils.json_to_sheet(dataToExport);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sub Kriteria');

        XLSX.writeFile(workbook, 'subkriteria_terpilih.xlsx');
    };

    const handleDeleteSelected = () => {
        const ids = selectedRows.map(item => item.id);
        router.post(
            route('subkriteria.destroy.multiple'),
            {
                ids,
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                    table.toggleAllRowsSelected(false);
                    setOpenDeleteDialog(false);
                },
                onError: () => toast.error('Gagal menghapus data'),
            }
        );
    };

    return (
        <DataTableActionBar table={table}>
            <DataTableActionBarSelection table={table} />
            {/* export */}
            <DataTableActionBarAction
                tooltip="Export Data"
                onClick={handleExportSelected}
                disabled={selectedRows.length === 0}
            >
                <Download />
            </DataTableActionBarAction>

            {/* hapus */}
            <DataTableActionBarAction
                tooltip="Hapus Data"
                onClick={() => setOpenDeleteDialog(true)}
            >
                <Trash />
            </DataTableActionBarAction>

            <AlertDialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Yakin ingin menghapus data terpilih?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Tindakan ini tidak bisa dibatalkan. {selectedRows.length} data akan
                            dihapus permanen.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDeleteSelected}>Hapus</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </DataTableActionBar>
    );
}

export default ActionBar;

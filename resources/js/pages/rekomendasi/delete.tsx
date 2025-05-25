import React from 'react';
import { router } from '@inertiajs/react';
import { Loader2 } from 'lucide-react';

import { RiwayatTanam } from '@/types';

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

interface DeleteProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    riwayatTanam: RiwayatTanam;
}

function Delete({ open, setOpen, riwayatTanam }: DeleteProps) {
    // states
    const [isDeleting, setIsDeleting] = React.useState<boolean>(false);

    // events
    const handleDelete = async () => {
        setIsDeleting(true);
        router.delete(route('riwayat.tanam.destroy', riwayatTanam.id), {
            onSuccess: () => {
                setOpen(false);
                setIsDeleting(false);
            },
        });
    };

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Yakin ingin menghapus?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Riwayat Tanam akan dihapus secara permanen dan tidak bisa dikembalikan.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isDeleting}>Batal</AlertDialogCancel>
                    <AlertDialogAction disabled={isDeleting} onClick={() => handleDelete()}>
                        {isDeleting && <Loader2 className="animate-spin" />}
                        {isDeleting ? 'Menghapus...' : 'Hapus'}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export default Delete;

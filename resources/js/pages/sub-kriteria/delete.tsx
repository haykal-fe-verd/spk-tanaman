import React from "react";
import { Loader2 } from "lucide-react";
import { router } from "@inertiajs/react";

import { SubKriteria } from "@/types";

import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
} from "@/components/ui/alert-dialog";

interface DeleteProps {
    open: boolean;
    data: SubKriteria;
    onClose: () => void;
}

function Delete({ open, data, onClose }: DeleteProps) {
    // states
    const [isDeleting, setIsDeleting] = React.useState<boolean>(false);

    // events
    const handleDelete = async (id: string) => {
        setIsDeleting(true);
        router.delete(route("subkriteria.destroy", id), {
            onSuccess: () => {
                onClose();
                setIsDeleting(false);
            },
        });
    };

    return (
        <AlertDialog open={open} onOpenChange={onClose}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Yakin ingin menghapus?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Sub Kriteria{" "}
                        <strong className="text-primary">{data.nama}</strong>{" "}
                        akan dihapus secara permanen dan tidak bisa
                        dikembalikan.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isDeleting}>
                        Batal
                    </AlertDialogCancel>
                    <AlertDialogAction
                        disabled={isDeleting}
                        onClick={() => handleDelete(data.id)}
                    >
                        {isDeleting && <Loader2 className="animate-spin" />}
                        {isDeleting ? "Menghapus..." : "Hapus"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export default Delete;

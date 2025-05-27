import React from 'react';
import { Trash2 } from 'lucide-react';
import { useForm } from '@inertiajs/react';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';

function Delete() {
    const {
        data,
        setData,
        delete: destroy,
        processing,
        errors,
    } = useForm({
        password: '',
    });

    // events
    const handleDelete = () => {
        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => setData('password', ''),
        });
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger className="w-fit" asChild>
                <Button variant="destructive">
                    <Trash2 /> Hapus Akun
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Apakah anda yakin?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Akun anda akan dihapus secara permanen dan tidak bisa dikembalikan.
                        <br />
                        <br />
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="••••••••"
                                autoComplete="current-password"
                                value={data.password}
                                onChange={e => setData('password', e.target.value)}
                            />
                            <InputError message={errors.password} />
                        </div>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Tidak</AlertDialogCancel>
                    <AlertDialogAction
                        disabled={processing || !data.password}
                        onClick={handleDelete}
                    >
                        Hapus
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export default Delete;

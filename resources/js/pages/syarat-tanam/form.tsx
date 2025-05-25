import React from 'react';
import { useForm } from '@inertiajs/react';
import { Loader2 } from 'lucide-react';

import { Kriteria, SyaratTanam, Tanaman } from '@/types';
import { nilaiSubKriteria } from '@/data/options';

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

interface FormSheetProps {
    type: 'create' | 'edit';
    data?: SyaratTanam;
    open: boolean;
    onClose: () => void;
    tanaman: Tanaman[];
    kriteria: Kriteria[];
}

type FormInput = {
    id_tanaman: string;
    id_kriteria: string;
    id_sub_kriteria: string;
    nilai: string;
};

function FormSheet({ type, data, open, onClose, tanaman, kriteria }: FormSheetProps) {
    // hooks
    const {
        data: formData,
        setData,
        post,
        put,
        processing,
        errors,
        reset,
    } = useForm<FormInput>({
        id_tanaman: data?.id_tanaman || '',
        id_kriteria: data?.id_kriteria || '',
        id_sub_kriteria: data?.id_sub_kriteria || '',
        nilai: data?.nilai != null ? data.nilai.toString() : '',
    });

    // states
    const isEdit = type === 'edit';

    // events
    const onSubmit: React.FormEventHandler = async e => {
        e.preventDefault();
        if (isEdit && data) {
            put(route('syarattanam.update', data.id), {
                onSuccess: () => {
                    reset();
                    onClose();
                },
            });
        } else {
            post(route('syarattanam.store'), {
                onSuccess: () => {
                    reset();
                    onClose();
                },
            });
        }
    };

    const findSub = React.useMemo(() => {
        return kriteria.find(k => k.id === formData.id_kriteria);
    }, [formData.id_kriteria, kriteria]);

    React.useEffect(() => {
        if (isEdit && data) {
            setData({
                id_tanaman: data.id_tanaman,
                id_kriteria: data.id_kriteria,
                id_sub_kriteria: data.id_sub_kriteria,
                nilai: data.nilai.toString(),
            });
        } else {
            setData({ id_tanaman: '', id_kriteria: '', id_sub_kriteria: '', nilai: '' });
        }
    }, [data, isEdit, setData]);

    return (
        <Sheet open={open} onOpenChange={onClose}>
            <SheetContent side="right">
                <SheetHeader>
                    <SheetTitle>
                        {type === 'create' ? 'Tambah Syarat Tanam' : 'Edit Syarat Tanam'}
                    </SheetTitle>
                    <SheetDescription>
                        {type === 'create'
                            ? 'Masukkan informasi syarat tanama baru.'
                            : 'Perbarui data syarat tanam.'}
                    </SheetDescription>
                </SheetHeader>

                <form onSubmit={onSubmit} className="space-y-5 mt-10">
                    {/* id_tanaman */}
                    <div className="flex w-full flex-col gap-2">
                        <Label htmlFor="id_tanaman">Nama Tanaman</Label>
                        <Select
                            name="id_tanaman"
                            value={formData.id_tanaman}
                            onValueChange={e => setData('id_tanaman', e)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="" />
                            </SelectTrigger>
                            <SelectContent>
                                {tanaman.map(t => (
                                    <SelectItem key={t.id} value={t.id}>
                                        {t.nama}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <InputError message={errors.id_tanaman} />
                    </div>

                    {/* id_kriteria */}
                    <div className="flex w-full flex-col gap-2">
                        <Label htmlFor="id_kriteria">Nama Kriteria</Label>
                        <Select
                            name="id_kriteria"
                            value={formData.id_kriteria}
                            onValueChange={e => setData('id_kriteria', e)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="" />
                            </SelectTrigger>
                            <SelectContent>
                                {kriteria.map(k => (
                                    <SelectItem key={k.id} value={k.id}>
                                        {k.nama}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <InputError message={errors.id_kriteria} />
                    </div>

                    {/* id_sub_kriteria */}
                    <div className="flex w-full flex-col gap-2">
                        <Label htmlFor="id_sub_kriteria">Nama Sub Kriteria</Label>
                        <Select
                            name="id_sub_kriteria"
                            value={formData.id_sub_kriteria}
                            onValueChange={e => {
                                setData('id_sub_kriteria', e);
                            }}
                            disabled={!findSub}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="" />
                            </SelectTrigger>
                            <SelectContent>
                                {findSub &&
                                    findSub?.sub_kriteria.map(sk => (
                                        <SelectItem key={sk.id} value={sk.id}>
                                            {sk.nama}
                                        </SelectItem>
                                    ))}
                            </SelectContent>
                        </Select>
                        <p className="text-[0.8rem] text-muted-foreground">
                            Pilih kriteria terlebih dahulu.
                        </p>

                        <InputError message={errors.id_sub_kriteria} />
                    </div>

                    {/* nilai */}
                    <div className="flex w-full flex-col gap-2">
                        <Label htmlFor="nilai">Nilai</Label>
                        <Select
                            name="nilai"
                            value={formData.nilai}
                            onValueChange={e => setData('nilai', e)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="" />
                            </SelectTrigger>
                            <SelectContent>
                                {nilaiSubKriteria.map(sk => (
                                    <SelectItem key={sk.value} value={sk.value}>
                                        {sk.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <InputError message={errors.nilai} />
                    </div>

                    <Button
                        type="submit"
                        disabled={processing}
                        className="inline-flex w-fit items-center justify-center"
                    >
                        {processing && <Loader2 className="animate-spin" />}
                        {isEdit ? 'Simpan Perubahan' : 'Tambah'}
                    </Button>
                </form>
            </SheetContent>
        </Sheet>
    );
}

export default FormSheet;

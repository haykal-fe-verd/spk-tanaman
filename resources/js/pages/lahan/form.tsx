import React from 'react';
import { useForm } from '@inertiajs/react';

import { Kriteria, Lahan } from '@/types';
import { kriteriaFilter } from '@/data/filter';

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
} from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from '@/components/ui/select';
import InputError from '@/components/input-error';

interface FormSheetProps {
    open: boolean;
    onClose: () => void;
    kriteria: Kriteria[];
    type: 'create' | 'edit' | 'delete' | null;
    data?: Lahan;
}

function FormSheet({ open, onClose, kriteria, type, data }: FormSheetProps) {
    const isEdit = type === 'edit';
    const [step, setStep] = React.useState(1);
    const filteredKriteria = kriteria.filter(k => kriteriaFilter.includes(k.nama));

    const {
        data: formData,
        setData,
        post,
        put,
        processing,
        errors,
        reset,
    } = useForm({
        nama: data?.nama || '',
        lokasi: data?.lokasi || '',
        luas: data?.luas?.toString() || '',
        kriteria: [] as { id_kriteria: string; id_sub_kriteria: string }[],
    });

    const errorMap = errors as Record<string, string>;

    const handlePrevious = () => setStep(1);
    const handleNext = () => setStep(2);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const action = isEdit && data ? put : post;
        const url = isEdit && data ? route('lahan.update', data.id) : route('lahan.store');

        action(url, {
            onSuccess: () => {
                reset();
                setStep(1);
                onClose();
            },
        });
    };

    React.useEffect(() => {
        if (isEdit && data) {
            const prepared = data.kriteria_lahan.map(kl => ({
                id_kriteria: kl.id_kriteria,
                id_sub_kriteria: kl.id_sub_kriteria,
            }));
            setData('kriteria', prepared);
        }
    }, [data, isEdit, setData]);

    return (
        <Sheet open={open} onOpenChange={onClose}>
            <SheetContent side="right">
                <SheetHeader>
                    <SheetTitle>{isEdit ? 'Edit Lahan' : 'Tambah Lahan'}</SheetTitle>
                    <SheetDescription>
                        {step === 1
                            ? 'Masukkan informasi dasar lahan.'
                            : 'Pilih kondisi kriteria lahan Anda.'}
                    </SheetDescription>
                </SheetHeader>

                <form onSubmit={handleSubmit} className="space-y-5 mt-5">
                    {step === 1 && (
                        <>
                            <div className="flex flex-col gap-2">
                                <Label>Nama Lahan</Label>
                                <Input
                                    value={formData.nama}
                                    onChange={e => setData('nama', e.target.value)}
                                />
                                <InputError message={errors.nama} />
                            </div>

                            <div className="flex flex-col gap-2">
                                <Label>Lokasi</Label>
                                <Input
                                    value={formData.lokasi}
                                    onChange={e => setData('lokasi', e.target.value)}
                                />
                                <InputError message={errors.lokasi} />
                            </div>

                            <div className="flex flex-col gap-2">
                                <Label>Luas (m²)</Label>
                                <Input
                                    type="number"
                                    value={formData.luas}
                                    onChange={e => setData('luas', e.target.value)}
                                />
                                <InputError message={errors.luas} />
                            </div>

                            <div className="text-right">
                                <Button type="button" onClick={handleNext}>
                                    Lanjut
                                </Button>
                            </div>
                        </>
                    )}

                    {step === 2 && (
                        <>
                            {filteredKriteria.map((k, i) => {
                                const selected = formData.kriteria.find(
                                    item => item.id_kriteria === k.id
                                );
                                const errorKey = `kriteria.${i}.id_sub_kriteria`;

                                return (
                                    <div key={k.id} className="flex flex-col gap-2">
                                        <Label>{k.nama}</Label>
                                        <Select
                                            value={selected?.id_sub_kriteria || ''}
                                            onValueChange={val => {
                                                const updated = [...formData.kriteria];
                                                const idx = updated.findIndex(
                                                    item => item.id_kriteria === k.id
                                                );

                                                if (idx !== -1) {
                                                    updated[idx].id_sub_kriteria = val;
                                                } else {
                                                    updated.push({
                                                        id_kriteria: k.id,
                                                        id_sub_kriteria: val,
                                                    });
                                                }

                                                setData('kriteria', updated);
                                            }}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder={`Pilih ${k.nama}`} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {k.sub_kriteria.map(sk => (
                                                    <SelectItem key={sk.id} value={sk.id}>
                                                        {sk.nama}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <InputError message={errorMap[errorKey]} />
                                        <InputError message={errors.kriteria} />
                                    </div>
                                );
                            })}

                            <div className="flex justify-between">
                                <Button type="button" variant="secondary" onClick={handlePrevious}>
                                    Kembali
                                </Button>
                                <Button type="submit" disabled={processing}>
                                    Simpan
                                </Button>
                            </div>
                        </>
                    )}
                </form>
            </SheetContent>
        </Sheet>
    );
}

export default FormSheet;

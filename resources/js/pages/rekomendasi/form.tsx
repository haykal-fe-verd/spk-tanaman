import React from 'react';
import { useForm } from '@inertiajs/react';
import { CalendarIcon, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

import { cn } from '@/lib/utils';
import { Kriteria, Lahan, RiwayatTanam, Tanaman } from '@/types';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import { kriteriaFilter } from '@/data/filter';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

type TanggalField = 'tanggal_tanam' | 'tanggal_panen' | 'tanggal_istirahat';

type FormInput = {
    id_lahan: string;
    id_tanaman: string;
    tanggal_tanam: string;
    tanggal_panen: string;
    tanggal_istirahat: string;
    kriteria: { id_kriteria: string; id_sub_kriteria: string }[];
};

interface FormModalProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    typeAction: 'create' | 'edit' | 'delete' | null;
    data?: RiwayatTanam;
    tanaman: Tanaman[];
    lahan: Lahan;
    kriteria: Kriteria[];
}

function FormModal({ open, setOpen, data, typeAction, tanaman, lahan, kriteria }: FormModalProps) {
    // hooks
    const isEdit = typeAction === 'edit';
    const filteredForKriteriaRiwayat = kriteria.filter(k => !kriteriaFilter.includes(k.nama));

    const {
        data: formData,
        setData,
        post,
        put,
        processing,
        errors,
        reset,
    } = useForm<FormInput>({
        id_lahan: lahan.id,
        id_tanaman: data?.id_tanaman || '',
        tanggal_tanam: data?.tanggal_tanam || '',
        tanggal_panen: data?.tanggal_panen || '',
        tanggal_istirahat: data?.tanggal_istirahat || '',
        kriteria: [] as { id_kriteria: string; id_sub_kriteria: string }[],
    });

    // events
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const action = isEdit && data ? put : post;
        const url =
            isEdit && data ? route('riwayat.tanam.update', data.id) : route('riwayat.tanam.store');

        action(url, {
            onSuccess: () => {
                reset();
                setOpen(false);
            },
        });
    };

    React.useEffect(() => {
        if (isEdit && data) {
            const prepared = data.kriteria_riwayat_tanam.map(kl => ({
                id_kriteria: kl.id_kriteria,
                id_sub_kriteria: kl.id_sub_kriteria,
            }));

            setData({
                id_lahan: data.id_lahan,
                id_tanaman: data.id_tanaman,
                tanggal_tanam: data.tanggal_tanam,
                tanggal_panen: data.tanggal_panen || '',
                tanggal_istirahat: data.tanggal_istirahat || '',
                kriteria: prepared,
            });
        }
    }, [isEdit, data, setData]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className={cn('lg:max-w-4xl')}>
                <DialogHeader>
                    <DialogTitle>
                        {isEdit ? 'Edit Riwayat Tanam' : 'Tambah Riwayat Tanam'}
                    </DialogTitle>
                    <DialogDescription>
                        Isi data riwayat tanam untuk lahan <strong>{lahan.nama}</strong>
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-2 gap-5 w-full">
                        {/* id_tanaman  */}
                        <div className="col-span-2 lg:col-span-1 space-y-2">
                            <Label htmlFor="id_tanaman">Tanaman Selanjutnya</Label>
                            <Select
                                name="id_tanaman"
                                value={formData.id_tanaman}
                                onValueChange={e => setData('id_tanaman', e)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih tanaman" />
                                </SelectTrigger>
                                <SelectContent>
                                    {tanaman.map(t => (
                                        <SelectItem key={t.id} value={t.id}>
                                            {t.nama}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <p className="text-[0.8rem] text-muted-foreground">
                                <sup className="text-destructive">*</sup>Perkiraan tanaman
                                selanjutnya
                            </p>
                            <InputError message={errors.id_tanaman} />
                        </div>

                        {/* tanggal */}
                        {(
                            [
                                'tanggal_tanam',
                                'tanggal_panen',
                                'tanggal_istirahat',
                            ] as TanggalField[]
                        ).map(field => (
                            <div key={field} className="col-span-2 lg:col-span-1 space-y-2">
                                <Label>
                                    {field.replace('tanggal_', 'Tanggal ').replace('_', ' ')}
                                </Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className={cn(
                                                'w-full pl-3 text-left font-normal',
                                                !formData[field as keyof typeof formData] &&
                                                    'text-muted-foreground'
                                            )}
                                        >
                                            {formData[field as keyof typeof formData]
                                                ? format(
                                                      formData[
                                                          field as keyof typeof formData
                                                      ] as string,
                                                      'dd MMMM yyyy',
                                                      {
                                                          locale: id,
                                                      }
                                                  )
                                                : ''}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={
                                                formData[field as keyof typeof formData]
                                                    ? new Date(formData[field])
                                                    : undefined
                                            }
                                            onSelect={(date: Date | undefined) =>
                                                setData(
                                                    field as keyof typeof formData,
                                                    date?.toISOString().split('T')[0] || ''
                                                )
                                            }
                                            disabled={d => d > new Date()}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <InputError message={errors[field]} />
                            </div>
                        ))}

                        {/* kriteria riwayat tanam */}
                        {filteredForKriteriaRiwayat.map(k => {
                            const current = formData.kriteria.find(kr => kr.id_kriteria === k.id);

                            return (
                                <div key={k.id} className="col-span-2 lg:col-span-1 space-y-2">
                                    <Label>
                                        {k.nama === 'Riwayat Tanam' ? 'Tanaman Sebelumnya' : k.nama}
                                    </Label>
                                    <Select
                                        value={current?.id_sub_kriteria || ''}
                                        onValueChange={val => {
                                            const updated = [...formData.kriteria];
                                            const existing = updated.findIndex(
                                                kr => kr.id_kriteria === k.id
                                            );
                                            if (existing !== -1) {
                                                updated[existing].id_sub_kriteria = val;
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
                                </div>
                            );
                        })}
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
            </DialogContent>
        </Dialog>
    );
}

export default FormModal;

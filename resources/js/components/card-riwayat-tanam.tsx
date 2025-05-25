import React from 'react';
import {
    Clock,
    Clock1,
    Clock3,
    Clock6,
    Command,
    RedoDot,
    SquarePen,
    Trash2,
    UndoDot,
} from 'lucide-react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { RiwayatTanam } from '@/types';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface CardRiwayatTanamProps {
    className?: string;
    riwayatTanam: RiwayatTanam;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setTypeAction: React.Dispatch<React.SetStateAction<'create' | 'edit' | 'delete' | null>>;
    setEditData: React.Dispatch<React.SetStateAction<RiwayatTanam | null>>;
}

function CardRiwayatTanam({
    className,
    riwayatTanam,
    setOpen,
    setTypeAction,
    setEditData,
}: CardRiwayatTanamProps) {
    // events
    const lamaIstirahat = riwayatTanam.tanggal_istirahat
        ? Math.max(
              0,
              Math.ceil(
                  (new Date().getTime() - new Date(riwayatTanam.tanggal_istirahat).getTime()) /
                      (1000 * 60 * 60 * 24)
              )
          )
        : null;

    const riwayatTanamItem = riwayatTanam?.kriteria_riwayat_tanam?.find(
        krt => krt.kriteria?.nama === 'Riwayat Tanam'
    );

    const handleEdit = async () => {
        setTypeAction('edit');
        setEditData(riwayatTanam);
        setOpen(true);
    };

    const handleDelete = async () => {
        setTypeAction('delete');
        setEditData(riwayatTanam);
        setOpen(true);
    };

    return (
        <Card className={cn('bg-background rounded-md', className)}>
            <CardContent className="pt-6 space-y-5">
                <div className="grid grid-cols-2 gap-5 w-full">
                    <div className="flex items-center flex-row gap-2 col-span-2 lg:col-span-1">
                        <UndoDot className="size-4" />
                        <h5 className="font-semibold text-sm">Tanaman Sebelumnya:</h5>
                        <p className="text-sm">{riwayatTanamItem?.sub_kriteria?.nama || '-'}</p>
                    </div>

                    <div className="flex items-center flex-row gap-2 col-span-2 lg:col-span-1">
                        <RedoDot className="size-4" />
                        <h5 className="font-semibold text-sm">Tanaman Selanjutnya:</h5>
                        <p className="text-sm">{riwayatTanam?.tanaman?.nama || '-'}</p>
                    </div>

                    <div className="flex items-center flex-row gap-2 col-span-2 lg:col-span-1">
                        <Clock className="size-4" />
                        <h5 className="font-semibold text-sm">Tanggal Tanam:</h5>
                        <p className="text-sm">
                            {riwayatTanam.tanggal_tanam
                                ? format(new Date(riwayatTanam.tanggal_tanam), 'dd MMMM yyyy', {
                                      locale: id,
                                  })
                                : '-'}
                        </p>
                    </div>

                    <div className="flex items-center flex-row gap-2 col-span-2 lg:col-span-1">
                        <Clock1 className="size-4" />
                        <h5 className="font-semibold text-sm">Tanggal Panen:</h5>
                        <p className="text-sm">
                            {riwayatTanam.tanggal_panen
                                ? format(new Date(riwayatTanam.tanggal_panen), 'dd MMMM yyyy', {
                                      locale: id,
                                  })
                                : '-'}
                        </p>
                    </div>

                    <div className="flex items-center flex-row gap-2 col-span-2 lg:col-span-1">
                        <Clock3 className="size-4" />
                        <h5 className="font-semibold text-sm">Tanggal Istirahat:</h5>
                        <p className="text-sm">
                            {riwayatTanam.tanggal_istirahat
                                ? format(new Date(riwayatTanam.tanggal_istirahat), 'dd MMMM yyyy', {
                                      locale: id,
                                  })
                                : '-'}
                        </p>
                    </div>

                    <div className="flex items-center flex-row gap-2 col-span-2 lg:col-span-1">
                        <Clock6 className="size-4" />
                        <h5 className="font-semibold text-sm">Lama Istirahat:</h5>
                        <p className="text-sm">
                            {lamaIstirahat !== null ? `${lamaIstirahat} hari` : '-'}
                        </p>
                    </div>

                    {riwayatTanam.kriteria_riwayat_tanam
                        .filter(krt => krt.kriteria?.nama !== 'Riwayat Tanam')
                        .map((krt, index) => (
                            <div
                                key={index + 1}
                                id={krt.id}
                                className="flex items-center flex-row gap-2 col-span-2 lg:col-span-1"
                            >
                                <Command className="size-4" />
                                <h5 className="font-semibold text-sm">{krt.kriteria?.nama}:</h5>
                                <p className="text-sm">{krt.sub_kriteria?.nama || '-'}</p>
                            </div>
                        ))}
                </div>

                <div className="flex items-center gap-2">
                    {/* edit */}
                    <Button variant="secondary" size="sm" onClick={handleEdit}>
                        <SquarePen />
                        Edit
                    </Button>

                    {/* hapus */}
                    <Button variant="destructive" size="sm" onClick={handleDelete}>
                        <Trash2 />
                        Hapus
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}

export default CardRiwayatTanam;

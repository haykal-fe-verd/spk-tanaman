import React from 'react';
import { ArrowLeft, ArrowUpWideNarrow } from 'lucide-react';
import { router } from '@inertiajs/react';

import { Kriteria, Lahan, RiwayatTanam, Tanaman } from '@/types';

import UserLayout from '@/layouts/user-layout';
import PageWrapper from '@/components/page-wrapper';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import CardRiwayatTanam from '@/components/card-riwayat-tanam';
import Keterangan from './keterangan';
import FormModal from './form';
import Delete from './delete';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface RekomendasiPageProps {
    lahan: Lahan;
    tanaman: Tanaman[];
    kriteria: Kriteria[];
}

function RekomendasiPage({ lahan, tanaman, kriteria }: RekomendasiPageProps) {
    // states
    const [open, setOpen] = React.useState<boolean>(false);
    const [typeAction, setTypeAction] = React.useState<'create' | 'edit' | 'delete' | null>(null);
    const [editData, setEditData] = React.useState<RiwayatTanam | null>(null);

    return (
        <UserLayout title="Rekomendasi">
            <PageWrapper title="Rekomendasi" Icon={ArrowUpWideNarrow}>
                {/* keterangan */}
                <Keterangan lahan={lahan} />

                <Separator />

                {/* riwayat tanam */}
                <div className="space-y-5">
                    <h3 className="text-lg font-semibold">Riwayat Tanam</h3>

                    <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => {
                            setOpen(true);
                            setTypeAction('create');
                        }}
                    >
                        Tambah Riwayat Tanam
                    </Button>

                    {lahan.riwayat_tanam.length === 0 ? (
                        <p className="text-sm text-muted-foreground">Belum ada riwayat tanam.</p>
                    ) : (
                        <div className="space-y-5">
                            {lahan.riwayat_tanam.map((rt, index) => (
                                <CardRiwayatTanam
                                    key={index + 1}
                                    riwayatTanam={rt}
                                    setOpen={setOpen}
                                    setTypeAction={setTypeAction}
                                    setEditData={setEditData}
                                />
                            ))}
                        </div>
                    )}
                </div>
                <Separator />

                {/* button */}
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <Button
                                className="w-full"
                                onClick={() => {
                                    router.post(
                                        route('rekomendasi.calculate', lahan.id),
                                        {},
                                        {
                                            preserveState: true,
                                            preserveScroll: true,
                                        }
                                    );
                                }}
                                disabled={lahan.riwayat_tanam.length === 0}
                            >
                                <ArrowUpWideNarrow />
                                Proses Rekomendasi (TOPSIS)
                            </Button>
                        </TooltipTrigger>

                        {lahan.riwayat_tanam.length === 0 && (
                            <TooltipContent>
                                Harap tambahkan riwayat tanam terlebih dahulu.
                            </TooltipContent>
                        )}
                    </Tooltip>
                </TooltipProvider>

                <Button
                    size="sm"
                    variant="destructive"
                    className="w-full"
                    onClick={() => window.history.back()}
                >
                    <ArrowLeft />
                    Kembali
                </Button>
            </PageWrapper>

            {/* create */}
            {typeAction === 'create' && (
                <FormModal
                    open={open}
                    setOpen={setOpen}
                    typeAction={typeAction}
                    lahan={lahan}
                    kriteria={kriteria}
                    tanaman={tanaman}
                />
            )}

            {/* edit */}
            {typeAction === 'edit' && editData && (
                <FormModal
                    open={open}
                    setOpen={setOpen}
                    typeAction={typeAction}
                    data={editData}
                    lahan={lahan}
                    kriteria={kriteria}
                    tanaman={tanaman}
                />
            )}

            {/* delete */}
            {typeAction === 'delete' && editData && (
                <Delete open={open} setOpen={setOpen} riwayatTanam={editData} />
            )}
        </UserLayout>
    );
}

export default RekomendasiPage;

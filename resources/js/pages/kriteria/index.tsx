import React from 'react';
import { Calculator, List, PlusCircle, ShieldCheck } from 'lucide-react';

import type { Kriteria, PaginationType } from '@/types';
import { useDataTable } from '@/hooks/use-data-table';

import AuthLayout from '@/layouts/auth-layout';
import PageWrapper from '@/components/page-wrapper';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/data-table';
import { dataTableWithRowAction } from '@/components/data-table-with-row-action';
import { columns } from './columns';
import ActionBar from './action-bar';
import FormSheet from './form';
import Detail from './detail';
import Delete from './delete';
import { router } from '@inertiajs/react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { toast } from 'sonner';
import axios from 'axios';

interface KriteriaPageProps {
    response: PaginationType<Kriteria>;
    jumlah_perbandingan: number;
}

function KriteriaPage({ response, jumlah_perbandingan }: KriteriaPageProps) {
    // hooks
    const { table, search, setSearch, activeAction, setActiveAction, closeAction } =
        useDataTable<Kriteria>({
            columns: dataTableWithRowAction(columns, (type, data) =>
                setActiveAction({ type, data })
            ),
            data: response.data,
            meta: response,
            routeName: 'kriteria.index',
            defaultSort: { id: 'created_at', desc: true },
        });

    // events
    const totalKriteria = response.total;
    const expectedPerbandingan = (totalKriteria * (totalKriteria - 1)) / 2;
    const isPerbandinganLengkap = jumlah_perbandingan >= expectedPerbandingan;

    const handleCalculate = () => {
        router.post(
            route('kriteria.calculate'),
            {},
            {
                preserveScroll: true,
                preserveState: true,
                onSuccess: () => {
                    table.resetRowSelection();
                },
            }
        );
    };

    const handleCheckKonsistensi = async () => {
        try {
            const { data } = await axios.post(route('kriteria.check.konsistensi'));

            if (!data.status) {
                toast.error('Oops', {
                    description: data.message,
                });
                return;
            }

            toast.success(data.konsisten ? 'Konsisten ✅' : 'Tidak Konsisten ❌', {
                description: `λ max: ${data.lambda_max}, CI: ${data.ci}, CR: ${data.cr}`,
            });
        } catch (err: unknown) {
            if (err instanceof Error) {
                toast.error('Oops', {
                    description: err.message,
                });
            }
        }
    };

    return (
        <AuthLayout title="Kriteria">
            <PageWrapper title="Kriteria" Icon={List}>
                <div className="flex flex-col lg:flex-row gap-5">
                    <Button className="w-fit" onClick={() => setActiveAction({ type: 'create' })}>
                        <PlusCircle />
                        Tambah Kriteria
                    </Button>

                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger className="w-fit">
                                <Button
                                    variant="secondary"
                                    className="w-fit"
                                    onClick={handleCalculate}
                                    disabled={!isPerbandinganLengkap}
                                >
                                    <Calculator />
                                    Hitung Bobot Kriteria
                                </Button>
                            </TooltipTrigger>
                            {!isPerbandinganLengkap && (
                                <TooltipContent>
                                    Harap lakukan perbandingan kriteria terlebih dahulu
                                </TooltipContent>
                            )}
                        </Tooltip>
                    </TooltipProvider>

                    <Button
                        variant="destructive"
                        className="w-fit"
                        onClick={handleCheckKonsistensi}
                    >
                        <ShieldCheck />
                        Cek Konsistensi AHP
                    </Button>
                </div>

                <p className="text-muted-foreground text-sm text-justify">
                    Bobot tidak diisi secara manual, tetapi dihitung bedasarkan:
                    <br />- Perbandingan berpasangan antar kriteria.
                    <br />- Normalisasi dan rata-rata dari hasil matriks perbandingan.
                    <br />
                    <br />
                    Untuk menghitung bobot kriteria, silahkan kunjungi halaman{' '}
                    <strong>Nilai Perbandingan</strong>.
                </p>

                <DataTable
                    table={table}
                    search={search}
                    onSearchChange={setSearch}
                    actionBar={<ActionBar table={table} />}
                />

                <p className="text-muted-foreground text-sm text-justify">
                    <strong>Keterangan</strong>:
                    <br />- <strong>Benefit</strong>: Semakin besar nilainya maka semakin baik.
                    <br />- <strong>Cost</strong>: Semakin kecil nilainya maka semakin baik.
                </p>
            </PageWrapper>

            {/* detail */}
            {activeAction?.type === 'detail' && activeAction.data && (
                <Detail open data={activeAction.data} onClose={closeAction} />
            )}

            {/* create */}
            {activeAction?.type === 'create' && (
                <FormSheet open type="create" onClose={closeAction} />
            )}

            {/* edit */}
            {activeAction?.type === 'edit' && activeAction.data && (
                <FormSheet open type="edit" data={activeAction.data} onClose={closeAction} />
            )}

            {/* delete */}
            {activeAction?.type === 'delete' && activeAction.data && (
                <Delete open data={activeAction.data} onClose={closeAction} />
            )}
        </AuthLayout>
    );
}

export default KriteriaPage;

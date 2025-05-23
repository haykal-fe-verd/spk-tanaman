import React from 'react';
import { PanelRightClose, PlusCircle } from 'lucide-react';

import type { Kriteria, PaginationType, SyaratTanam, Tanaman } from '@/types';
import { useDataTable } from '@/hooks/use-data-table';

import AuthLayout from '@/layouts/auth-layout';
import PageWrapper from '@/components/page-wrapper';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/data-table';
import { dataTableWithRowAction } from '@/components/data-table-with-row-action';
import { columns } from './columns';
import ActionBar from './action-bar';
import Detail from './detail';
import Delete from './delete';
import FormSheet from './form';
import Keterangan from './keterangan';

interface SyaratTanamPageProps {
    response: PaginationType<SyaratTanam>;
    tanaman: Tanaman[];
    kriteria: Kriteria[];
}

function SyaratTanamPage({ response, tanaman, kriteria }: SyaratTanamPageProps) {
    // hooks
    const { table, search, setSearch, activeAction, setActiveAction, closeAction } =
        useDataTable<SyaratTanam>({
            columns: dataTableWithRowAction(columns, (type, data) =>
                setActiveAction({ type, data })
            ),
            data: response.data,
            meta: response,
            routeName: 'syarattanam.index',
            defaultSort: { id: 'created_at', desc: true },
        });

    return (
        <AuthLayout title="Syarat Tanam">
            <PageWrapper title="Syarat Tanam" Icon={PanelRightClose}>
                <Button className="w-fit" onClick={() => setActiveAction({ type: 'create' })}>
                    <PlusCircle />
                    Tambah Syarat Tanam
                </Button>

                <DataTable
                    table={table}
                    search={search}
                    onSearchChange={setSearch}
                    actionBar={<ActionBar table={table} />}
                />

                <Keterangan />
            </PageWrapper>

            {/* detail */}
            {activeAction?.type === 'detail' && activeAction.data && (
                <Detail open data={activeAction.data} onClose={closeAction} />
            )}

            {/* create */}
            {activeAction?.type === 'create' && (
                <FormSheet
                    open
                    type="create"
                    onClose={closeAction}
                    tanaman={tanaman}
                    kriteria={kriteria}
                />
            )}

            {/* edit */}
            {activeAction?.type === 'edit' && activeAction.data && (
                <FormSheet
                    open
                    type="edit"
                    data={activeAction.data}
                    onClose={closeAction}
                    tanaman={tanaman}
                    kriteria={kriteria}
                />
            )}

            {/* delete */}
            {activeAction?.type === 'delete' && activeAction.data && (
                <Delete open data={activeAction.data} onClose={closeAction} />
            )}
        </AuthLayout>
    );
}

export default SyaratTanamPage;

import React from "react";
import { ListStart, PlusCircle } from "lucide-react";

import type { Kriteria, PaginationType, SubKriteria } from "@/types";
import { useDataTable } from "@/hooks/use-data-table";

import AuthLayout from "@/layouts/auth-layout";
import PageWrapper from "@/components/page-wrapper";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table";
import { dataTableWithRowAction } from "@/components/data-table-with-row-action";
import { columns } from "./columns";
import ActionBar from "./action-bar";
import FormSheet from "./form";
import Detail from "./detail";
import Delete from "./delete";

interface SubKriteriaPageProps {
    response: PaginationType<SubKriteria>;
    kriteria: Kriteria[];
}

function SubKriteriaPage({ response, kriteria }: SubKriteriaPageProps) {
    // hooks
    const {
        table,
        search,
        setSearch,
        activeAction,
        setActiveAction,
        closeAction,
    } = useDataTable<SubKriteria>({
        columns: dataTableWithRowAction(columns, (type, data) =>
            setActiveAction({ type, data })
        ),
        data: response.data,
        meta: response,
        routeName: "subkriteria.index",
        defaultSort: { id: "created_at", desc: true },
    });

    return (
        <AuthLayout title="Sub Kriteria">
            <PageWrapper title="Sub Kriteria" Icon={ListStart}>
                <div className="flex flex-col lg:flex-row gap-5">
                    <Button
                        className="w-fit"
                        onClick={() => setActiveAction({ type: "create" })}
                    >
                        <PlusCircle />
                        Tambah Sub Kriteria
                    </Button>
                </div>

                <DataTable
                    table={table}
                    search={search}
                    onSearchChange={setSearch}
                    actionBar={<ActionBar table={table} />}
                />
            </PageWrapper>

            {/* detail */}
            {activeAction?.type === "detail" && activeAction.data && (
                <Detail open data={activeAction.data} onClose={closeAction} />
            )}

            {/* create */}
            {activeAction?.type === "create" && (
                <FormSheet
                    open
                    type="create"
                    onClose={closeAction}
                    kriteria={kriteria}
                />
            )}

            {/* edit */}
            {activeAction?.type === "edit" && activeAction.data && (
                <FormSheet
                    open
                    type="edit"
                    data={activeAction.data}
                    onClose={closeAction}
                    kriteria={kriteria}
                />
            )}

            {/* delete */}
            {activeAction?.type === "delete" && activeAction.data && (
                <Delete open data={activeAction.data} onClose={closeAction} />
            )}
        </AuthLayout>
    );
}

export default SubKriteriaPage;

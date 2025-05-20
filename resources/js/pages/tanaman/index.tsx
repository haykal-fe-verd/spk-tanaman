import React from "react";
import { PlusCircle, Sprout } from "lucide-react";

import type { PaginationType, Tanaman } from "@/types";
import { useDataTable } from "@/hooks/use-data-table";

import AuthLayout from "@/layouts/auth-layout";
import PageWrapper from "@/components/page-wrapper";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table";
import { dataTableWithRowAction } from "@/components/data-table-with-row-action";
import { columns } from "./columns";
import ActionBar from "./action-bar";
import FormTanaman from "./form";
import Detail from "./detail";
import Delete from "./delete";

interface TanamanPageProps {
    response: PaginationType<Tanaman>;
}

function TanamanPage({ response }: TanamanPageProps) {
    // hooks
    const {
        table,
        search,
        setSearch,
        activeAction,
        setActiveAction,
        closeAction,
    } = useDataTable<Tanaman>({
        columns: dataTableWithRowAction(columns, (type, data) =>
            setActiveAction({ type, data })
        ),
        data: response.data,
        meta: response,
        routeName: "tanaman.index",
        defaultSort: { id: "created_at", desc: true },
    });

    return (
        <AuthLayout title="Tanaman">
            <PageWrapper title="Tanaman" Icon={Sprout}>
                <Button
                    className="w-fit"
                    onClick={() => setActiveAction({ type: "create" })}
                >
                    <PlusCircle />
                    Tambah Tanaman
                </Button>

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
                <FormTanaman open type="create" onClose={closeAction} />
            )}

            {/* edit */}
            {activeAction?.type === "edit" && activeAction.data && (
                <FormTanaman
                    open
                    type="edit"
                    data={activeAction.data}
                    onClose={closeAction}
                />
            )}

            {/* delete */}
            {activeAction?.type === "delete" && activeAction.data && (
                <Delete open data={activeAction.data} onClose={closeAction} />
            )}
        </AuthLayout>
    );
}

export default TanamanPage;

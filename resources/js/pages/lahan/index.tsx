import React from 'react';
import { MapPinned, PlusCircle } from 'lucide-react';
import { router } from '@inertiajs/react';
import { pickBy } from 'lodash';

import { Kriteria, Lahan, PaginationType } from '@/types';
import { useDebounce } from '@/hooks/use-debounce';

import UserLayout from '@/layouts/user-layout';
import PageWrapper from '@/components/page-wrapper';
import CardLahan from '@/components/card-lahan';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import FormSheet from './form';
import Search from './search';
import Pagination from './pagination';
import Delete from './delete';
import Keterangan from './keterangan';

interface LahanPageProps {
    response: PaginationType<Lahan>;
    kriteria: Kriteria[];
}

type QueryParams = {
    page?: number;
    per_page?: number;
    search?: string;
    sort_by?: string;
    sort_dir?: string;
};

function LahanPage({ response, kriteria }: LahanPageProps) {
    // hooks
    const query = route().params || {};

    // states
    const isFirstRender = React.useRef(true);
    const [open, setOpen] = React.useState<boolean>(false);
    const [typeAction, setTypeAction] = React.useState<'create' | 'edit' | 'delete' | null>(null);
    const [selectedData, setSelectedData] = React.useState<Lahan | null>(null);
    const [search, setSearch] = React.useState<string>(() => (query?.search as string) || '');
    const debouncedSearch = useDebounce(search, 500);
    const [pagination, setPagination] = React.useState({
        pageIndex: response.current_page - 1,
        pageSize: response.per_page,
    });

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(route('lahan.index'), { search }, { preserveScroll: true, preserveState: true });
    };

    // efects
    React.useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        const query = pickBy<QueryParams>(
            {
                page: pagination.pageIndex + 1 !== 1 ? pagination.pageIndex + 1 : undefined,
                per_page: pagination.pageSize !== 6 ? pagination.pageSize : undefined,
                search: debouncedSearch.trim() !== '' ? debouncedSearch : undefined,
            },
            value => value !== undefined
        );

        router.get(route('lahan.index'), query, {
            preserveState: true,
            replace: true,
            only: ['response'],
        });
    }, [debouncedSearch, pagination.pageIndex, pagination.pageSize]);

    return (
        <UserLayout title="Lahan">
            <PageWrapper title="Lahan" Icon={MapPinned}>
                <div className="flex flex-col lg:flex-row gap-5">
                    <Button
                        className="w-fit"
                        onClick={() => {
                            setSelectedData(null);
                            setTypeAction('create');
                            setOpen(true);
                        }}
                    >
                        <PlusCircle />
                        Tambah Lahan
                    </Button>
                </div>

                {/* keterangan */}
                <Keterangan />

                {/* Search */}
                <Search search={search} setSearch={setSearch} handleSearch={handleSearch} />

                <Separator />

                {/* Card */}
                {response?.data?.length === 0 ? (
                    <div className="grid grid-cols-3 gap-5 h-20 p-2 align-middle items-center justify-center">
                        <p className="col-span-3 text-center  ">Tidak ada data lahan.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-3 gap-5">
                        {response.data.map(l => (
                            <CardLahan
                                className="col-span-3 lg:col-span-1"
                                key={l.id}
                                lahan={l}
                                setOpen={setOpen}
                                setTypeAction={setTypeAction}
                                setSelectedData={setSelectedData}
                            />
                        ))}
                    </div>
                )}

                <Separator />

                {/* Paginations */}
                <Pagination
                    pagination={pagination}
                    setPagination={setPagination}
                    currentPage={response.current_page}
                    lastPage={response.last_page}
                />
            </PageWrapper>

            {/* create */}
            {typeAction === 'create' && (
                <FormSheet
                    open={open}
                    onClose={() => {
                        setOpen(false);
                        setSelectedData(null);
                        setTypeAction(null);
                    }}
                    kriteria={kriteria}
                    type={typeAction}
                />
            )}

            {/* edit */}
            {typeAction === 'edit' && selectedData && (
                <FormSheet
                    open={open}
                    onClose={() => {
                        setOpen(false);
                        setSelectedData(null);
                        setTypeAction(null);
                    }}
                    kriteria={kriteria}
                    type={typeAction}
                    data={selectedData}
                />
            )}

            {/* delete */}
            {typeAction === 'delete' && selectedData && (
                <Delete open={open} setOpen={setOpen} lahan={selectedData} />
            )}
        </UserLayout>
    );
}

export default LahanPage;

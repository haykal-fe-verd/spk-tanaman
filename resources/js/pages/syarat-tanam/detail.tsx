import React from 'react';

import { SyaratTanam } from '@/types';

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { formatDate } from '@/lib/utils';

interface DetailProps {
    data: SyaratTanam;
    open: boolean;
    onClose: () => void;
}

function Detail({ data, open, onClose }: DetailProps) {
    return (
        <Sheet open={open} onOpenChange={onClose}>
            <SheetContent side="right">
                <SheetHeader>
                    <SheetTitle>Detail Syarat Tanam</SheetTitle>
                    <SheetDescription>Informasi detail syarat tanam.</SheetDescription>
                </SheetHeader>

                <div className="mt-10 w-full h-full overflow-y-auto space-y-5">
                    <div className="flex flex-col gap-2">
                        <h5 className="text-primary">Id:</h5>
                        <p>{data?.id}</p>
                    </div>
                    <Separator />
                    <div className="flex flex-col gap-2">
                        <h5 className="text-primary">Nama Tanaman:</h5>
                        <p>{data?.tanaman?.nama}</p>
                    </div>
                    <Separator />
                    <div className="flex flex-col gap-2">
                        <h5 className="text-primary">Nama Kriteria:</h5>
                        <p>{data?.kriteria?.nama}</p>
                    </div>
                    <Separator />
                    <div className="flex flex-col gap-2">
                        <h5 className="text-primary">Nama Sub Kriteria:</h5>
                        <p>{data?.subkriteria?.nama}</p>
                    </div>
                    <Separator />
                    <div className="flex flex-col gap-2">
                        <h5 className="text-primary">Nilai:</h5>
                        <p>{data?.nilai}</p>
                    </div>
                    <Separator />
                    <div className="flex flex-col gap-2">
                        <h5 className="text-primary">Created:</h5>
                        <p>{formatDate(data?.created_at)}</p>
                    </div>
                    <Separator />
                    <div className="flex flex-col gap-2">
                        <h5 className="text-primary">Updated:</h5>
                        <p>{formatDate(data?.updated_at)}</p>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}

export default Detail;

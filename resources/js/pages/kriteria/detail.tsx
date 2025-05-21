import React from "react";

import { Kriteria } from "@/types";
import { formatDate } from "@/lib/utils";

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

interface DetailProps {
    data: Kriteria;
    open: boolean;
    onClose: () => void;
}

function Detail({ data, open, onClose }: DetailProps) {
    return (
        <Sheet open={open} onOpenChange={onClose}>
            <SheetContent side="right">
                <SheetHeader>
                    <SheetTitle>Detail Kriteria</SheetTitle>
                    <SheetDescription>
                        Informasi detail kriteria.
                    </SheetDescription>
                </SheetHeader>

                <div className="mt-10 w-full h-full overflow-y-auto space-y-5">
                    <div className="flex flex-col gap-2">
                        <h5 className="text-primary">Id Kriteria:</h5>
                        <p>{data?.id}</p>
                    </div>
                    <Separator />
                    <div className="flex flex-col gap-2">
                        <h5 className="text-primary">Nama Kriteria:</h5>
                        <p>{data?.nama}</p>
                    </div>
                    <Separator />
                    <div className="flex flex-col gap-2">
                        <h5 className="text-primary">Tipe Kriteria:</h5>
                        <p className="capitalize">{data?.tipe}</p>
                    </div>
                    <Separator />
                    <div className="flex flex-col gap-2">
                        <h5 className="text-primary">Bobot Kriteria:</h5>
                        <p>{data?.bobot}</p>
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

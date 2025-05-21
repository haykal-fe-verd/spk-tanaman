import React from "react";

import { SubKriteria } from "@/types";
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
    data: SubKriteria;
    open: boolean;
    onClose: () => void;
}

function Detail({ data, open, onClose }: DetailProps) {
    return (
        <Sheet open={open} onOpenChange={onClose}>
            <SheetContent side="right">
                <SheetHeader>
                    <SheetTitle>Detail Sub Kriteria</SheetTitle>
                    <SheetDescription>
                        Informasi detail sub kriteria.
                    </SheetDescription>
                </SheetHeader>

                <div className="mt-10 w-full h-full overflow-y-auto space-y-5">
                    <div className="flex flex-col gap-2">
                        <h5 className="text-primary">Id Sub Kriteria:</h5>
                        <p>{data?.id}</p>
                    </div>
                    <Separator />
                    <div className="flex flex-col gap-2">
                        <h5 className="text-primary">Nama Kriteria:</h5>
                        <p>{data?.kriteria?.nama}</p>
                    </div>
                    <Separator />
                    <div className="flex flex-col gap-2">
                        <h5 className="text-primary">Nama Sub Kriteria:</h5>
                        <p>{data?.nama}</p>
                    </div>
                    <Separator />
                    <div className="flex flex-col gap-2">
                        <h5 className="text-primary">Nilai:</h5>
                        <p className="capitalize">{data?.nilai}</p>
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

import React from "react";

import { Tanaman } from "@/types";

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { formatDate } from "@/lib/utils";

interface DetailProps {
    data: Tanaman;
    open: boolean;
    onClose: () => void;
}

function Detail({ data, open, onClose }: DetailProps) {
    return (
        <Sheet open={open} onOpenChange={onClose}>
            <SheetContent side="right">
                <SheetHeader>
                    <SheetTitle>Detail Tanaman</SheetTitle>
                    <SheetDescription>
                        Informasi detail tanaman.
                    </SheetDescription>
                </SheetHeader>

                <div className="mt-10 w-full h-full overflow-y-auto space-y-5">
                    <div className="flex flex-col gap-2">
                        <h5 className="text-primary">Id Tanaman:</h5>
                        <p>{data?.id}</p>
                    </div>
                    <Separator />
                    <div className="flex flex-col gap-2">
                        <h5 className="text-primary">Nama Tanaman:</h5>
                        <p>{data?.nama}</p>
                    </div>
                    <Separator />
                    <div className="flex flex-col gap-2">
                        <h5 className="text-primary">Deskripsi Tanaman:</h5>
                        <p>{data?.deskripsi}</p>
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

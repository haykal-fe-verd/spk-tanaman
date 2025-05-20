import React from "react";
import { useForm } from "@inertiajs/react";
import { Loader2 } from "lucide-react";

import { Tanaman } from "@/types";

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import InputError from "@/components/input-error";
import { Textarea } from "@/components/ui/textarea";

interface FormSheetProps {
    type: "create" | "edit";
    data?: Tanaman;
    open: boolean;
    onClose: () => void;
}

type FormInput = {
    nama: string;
    deskripsi: string;
};

function FormTanaman({ type, data, open, onClose }: FormSheetProps) {
    // hooks
    const {
        data: formData,
        setData,
        post,
        put,
        processing,
        errors,
        reset,
    } = useForm<FormInput>({
        nama: data?.nama || "",
        deskripsi: data?.deskripsi || "",
    });

    // states
    const isEdit = type === "edit";

    // events
    const onSubmit: React.FormEventHandler = async (e) => {
        e.preventDefault();
        if (isEdit && data) {
            put(route("tanaman.update", data.id), {
                onSuccess: () => {
                    reset();
                    onClose();
                },
            });
        } else {
            post(route("tanaman.store"), {
                onSuccess: () => {
                    reset();
                    onClose();
                },
            });
        }
    };

    React.useEffect(() => {
        if (isEdit && data) {
            setData({
                nama: data.nama,
                deskripsi: data.deskripsi,
            });
        } else {
            setData({ nama: "", deskripsi: "" });
        }
    }, [data, isEdit, setData]);

    return (
        <Sheet open={open} onOpenChange={onClose}>
            <SheetContent side="right">
                <SheetHeader>
                    <SheetTitle>
                        {type === "create" ? "Tambah Tanaman" : "Edit Tanaman"}
                    </SheetTitle>
                    <SheetDescription>
                        {type === "create"
                            ? "Masukkan informasi tanaman baru."
                            : "Perbarui data tanaman."}
                    </SheetDescription>
                </SheetHeader>

                <form onSubmit={onSubmit} className="space-y-5 mt-10">
                    <div className="flex w-full flex-col gap-2">
                        <Label htmlFor="nama">Nama Tanaman</Label>
                        <Input
                            id="nama"
                            name="nama"
                            type="text"
                            autoComplete="off"
                            value={formData.nama}
                            onChange={(e) => setData("nama", e.target.value)}
                        />
                        <InputError message={errors.nama} />
                    </div>

                    <div className="flex w-full flex-col gap-2">
                        <Label htmlFor="deskripsi">Deskripsi Tanaman</Label>
                        <Textarea
                            id="deskripsi"
                            name="deskripsi"
                            autoComplete="off"
                            value={formData.deskripsi}
                            onChange={(e) =>
                                setData("deskripsi", e.target.value)
                            }
                        />
                        <InputError message={errors.deskripsi} />
                    </div>
                    <Button
                        type="submit"
                        disabled={processing}
                        className="inline-flex w-fit items-center justify-center"
                    >
                        {processing && <Loader2 className="animate-spin" />}
                        {isEdit ? "Simpan Perubahan" : "Tambah"}
                    </Button>
                </form>
            </SheetContent>
        </Sheet>
    );
}

export default FormTanaman;

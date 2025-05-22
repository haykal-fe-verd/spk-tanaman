import React from "react";
import { useForm } from "@inertiajs/react";
import { Loader2 } from "lucide-react";

import { Kriteria } from "@/types";

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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { kriteriaTypes } from "@/data/options";

interface FormSheetProps {
    type: "create" | "edit";
    data?: Kriteria;
    open: boolean;
    onClose: () => void;
}

type FormInput = {
    nama: string;
    tipe: string;
};

function FormSheet({ type, data, open, onClose }: FormSheetProps) {
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
        tipe: data?.tipe || "",
    });

    // states
    const isEdit = type === "edit";

    // events
    const onSubmit: React.FormEventHandler = async (e) => {
        e.preventDefault();
        if (isEdit && data) {
            put(route("kriteria.update", data.id), {
                onSuccess: () => {
                    reset();
                    onClose();
                },
            });
        } else {
            post(route("kriteria.store"), {
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
                tipe: data.tipe,
            });
        } else {
            setData({ nama: "", tipe: "" });
        }
    }, [data, isEdit, setData]);

    return (
        <Sheet open={open} onOpenChange={onClose}>
            <SheetContent side="right">
                <SheetHeader>
                    <SheetTitle>
                        {type === "create"
                            ? "Tambah Kriteria"
                            : "Edit Kriteria"}
                    </SheetTitle>
                    <SheetDescription>
                        {type === "create"
                            ? "Masukkan informasi kriteria baru."
                            : "Perbarui data kriteria."}
                    </SheetDescription>
                </SheetHeader>

                <form onSubmit={onSubmit} className="space-y-5 mt-10">
                    {/* nama */}
                    <div className="flex w-full flex-col gap-2">
                        <Label htmlFor="nama">Nama Kriteria</Label>
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

                    {/* tipe */}
                    <div className="flex w-full flex-col gap-2">
                        <Label htmlFor="tipe">Tipe Kriteria</Label>
                        <Select
                            onValueChange={(e) => setData("tipe", e)}
                            defaultValue={formData.tipe}
                        >
                            <SelectTrigger className="capitalize">
                                <SelectValue placeholder="" />
                            </SelectTrigger>
                            <SelectContent>
                                {kriteriaTypes.map((i) => (
                                    <SelectItem
                                        key={i.value}
                                        value={i.value}
                                        className="capitalize"
                                    >
                                        {i.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <InputError message={errors.tipe} />
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

export default FormSheet;

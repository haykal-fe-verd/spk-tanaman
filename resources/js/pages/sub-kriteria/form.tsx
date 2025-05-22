import React from "react";
import { useForm } from "@inertiajs/react";
import { Loader2 } from "lucide-react";

import { Kriteria, SubKriteria } from "@/types";
import { nilaiSubKriteria } from "@/data/options";

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

interface FormSheetProps {
    type: "create" | "edit";
    data?: SubKriteria;
    open: boolean;
    onClose: () => void;
    kriteria: Kriteria[];
}

type FormInput = {
    id_kriteria: string;
    nama: string;
    nilai: string;
};

function FormSheet({ type, data, open, onClose, kriteria }: FormSheetProps) {
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
        id_kriteria: data?.id_kriteria || "",
        nama: data?.nama || "",
        nilai: data?.nilai != null ? data.nilai.toString() : "",
    });

    // states
    const isEdit = type === "edit";

    // events
    const onSubmit: React.FormEventHandler = async (e) => {
        e.preventDefault();
        if (isEdit && data) {
            put(route("subkriteria.update", data.id), {
                onSuccess: () => {
                    reset();
                    onClose();
                },
            });
        } else {
            post(route("subkriteria.store"), {
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
                id_kriteria: data.id_kriteria,
                nama: data.nama,
                nilai: data.nilai === null ? "" : data.nilai.toString(),
            });
        } else {
            setData({ nama: "", id_kriteria: "", nilai: "" });
        }
    }, [data, isEdit, setData]);

    return (
        <Sheet open={open} onOpenChange={onClose}>
            <SheetContent side="right">
                <SheetHeader>
                    <SheetTitle>
                        {type === "create"
                            ? "Tambah Sub Kriteria"
                            : "Edit Sub Kriteria"}
                    </SheetTitle>
                    <SheetDescription>
                        {type === "create"
                            ? "Masukkan informasi sub kriteria baru."
                            : "Perbarui data sub kriteria."}
                    </SheetDescription>
                </SheetHeader>

                <form onSubmit={onSubmit} className="space-y-5 mt-10">
                    {/* id_kriteria */}
                    <div className="flex w-full flex-col gap-2">
                        <Label htmlFor="nama">Kriteria</Label>
                        <Select
                            onValueChange={(e) => setData("id_kriteria", e)}
                            defaultValue={formData.id_kriteria}
                        >
                            <SelectTrigger className="capitalize">
                                <SelectValue placeholder="" />
                            </SelectTrigger>
                            <SelectContent>
                                {kriteria.map((k) => (
                                    <SelectItem
                                        key={k.id}
                                        value={k.id}
                                        className="capitalize"
                                    >
                                        {k.nama}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <InputError message={errors.id_kriteria} />
                    </div>

                    {/* nama */}
                    <div className="flex w-full flex-col gap-2">
                        <Label htmlFor="nama">Nama Sub Kriteria</Label>
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

                    {/* nilai */}
                    <div className="flex w-full flex-col gap-2">
                        <Label htmlFor="nilai">Nilai</Label>
                        <Select
                            value={formData.nilai?.toString()}
                            onValueChange={(e) => setData("nilai", e)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="" />
                            </SelectTrigger>
                            <SelectContent>
                                {nilaiSubKriteria.map((i) => (
                                    <SelectItem key={i.value} value={i.value}>
                                        {i.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <InputError message={errors.nilai} />
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

import React from 'react';
import { Loader2, Save, Scale } from 'lucide-react';
import { router } from '@inertiajs/react';

import type { Kriteria, NilaiPerbandingan } from '@/types';
import { ahpOptions } from '@/data/options';

import AuthLayout from '@/layouts/auth-layout';
import PageWrapper from '@/components/page-wrapper';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

interface NilaiPerbandinganPageProps {
    kriteria: Kriteria[];
    perbandingan: NilaiPerbandingan[];
}

function NilaiPerbandinganPage({ kriteria, perbandingan }: NilaiPerbandinganPageProps) {
    // states
    const [values, setValues] = React.useState<Record<string, string>>({});
    const [loading, setLoading] = React.useState<boolean>(false);

    // events
    const handleChange = (k1: string, k2: string, value: string) => {
        const key = `${k1}|${k2}`;
        const inverseKey = `${k2}|${k1}`;
        const newValues = { ...values };

        newValues[key] = value;
        newValues[inverseKey] = (1 / parseFloat(value)).toFixed(4);

        setValues(newValues);
    };

    const onSubmit: React.FormEventHandler = async e => {
        e.preventDefault();
        setLoading(true);
        const payload = Object.entries(values).map(([key, val]) => {
            const [id_kriteria_1, id_kriteria_2] = key.split('|');
            return {
                id_kriteria_1,
                id_kriteria_2,
                nilai: parseFloat(val),
            };
        });

        const filtered = payload.filter(item => item.id_kriteria_1 < item.id_kriteria_2);

        router.post(
            route('perbandingan.store'),
            { perbandingan: filtered },
            {
                preserveScroll: true,
                preserveState: true,
                onFinish: () => {
                    setLoading(false);
                },
            }
        );
    };

    // effects
    React.useEffect(() => {
        const initial: Record<string, string> = {};

        perbandingan.forEach(item => {
            const key = `${item.id_kriteria_1}|${item.id_kriteria_2}`;
            initial[key] = item.nilai.toString();
        });

        setValues(initial);
    }, [perbandingan]);

    return (
        <AuthLayout title="Nilai Perbandingan">
            <PageWrapper title="Nilai Perbandingan Kriteria" Icon={Scale}>
                <p className="text-sm text-muted-foreground">
                    Pilih nilai perbandingan antara setiap pasangan kriteria berdasarkan tingkat
                    kepentingannya.
                </p>

                <form onSubmit={onSubmit} className="space-y-5">
                    <div className="overflow-hidden rounded-md border">
                        <Table className="table-fixed w-full">
                            <TableCaption>Tabel Perbandingan Kriteria.</TableCaption>

                            <TableHeader>
                                <TableRow>
                                    <TableHead className="border w-[120px]">Kriteria</TableHead>
                                    {kriteria.map(k => (
                                        <TableHead
                                            key={k.id}
                                            className="border text-center text-wrap w-[120px]"
                                        >
                                            {k.nama}
                                        </TableHead>
                                    ))}
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {kriteria.map((k1, i) => (
                                    <TableRow key={k1.id}>
                                        <TableCell className="border w-[120px]">
                                            {k1.nama}
                                        </TableCell>
                                        {kriteria.map((k2, j) => {
                                            const key = `${k1.id}|${k2.id}`;
                                            const mirrorKey = `${k2.id}|${k1.id}`;
                                            const value = values[key];
                                            const mirrorValue = values[mirrorKey];

                                            return (
                                                <TableCell
                                                    key={k2.id}
                                                    className="border text-center w-[120px]"
                                                >
                                                    {i === j ? (
                                                        <span className="text-destructive font-semibold">
                                                            1
                                                        </span>
                                                    ) : i < j ? (
                                                        <Select
                                                            value={value}
                                                            onValueChange={val =>
                                                                handleChange(k1.id, k2.id, val)
                                                            }
                                                        >
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="-" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {ahpOptions.map(i => (
                                                                    <SelectItem
                                                                        key={i.value}
                                                                        value={i.value}
                                                                    >
                                                                        {i.label}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                    ) : (
                                                        <span className="text-primary">
                                                            {mirrorValue
                                                                ? parseFloat(
                                                                      (
                                                                          1 /
                                                                          parseFloat(mirrorValue)
                                                                      ).toFixed(4)
                                                                  )
                                                                : '-'}
                                                        </span>
                                                    )}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>

                    <div className="text-right">
                        <Button type="submit" disabled={loading}>
                            {loading ? <Loader2 className="animate-spin" /> : <Save />}
                            Simpan Perbandingan
                        </Button>
                    </div>
                </form>

                <div className="text-sm text-muted-foreground space-y-5">
                    <p>
                        <strong>Keterangan:</strong> <br />
                        Nilai perbandingan menunjukkan tingkat kepentingan relatif antara dua
                        kriteria. Nilai 1 berarti kedua kriteria sama penting. Nilai lebih dari 1
                        menunjukkan bahwa kriteria baris lebih penting daripada kriteria kolom,
                        sedangkan nilai kurang dari 1 menunjukkan sebaliknya.
                    </p>

                    <ul className="list-disc list-inside space-y-1">
                        <li>1 – Sama penting</li>
                        <li>3 – Cukup penting</li>
                        <li>5 – Lebih penting</li>
                        <li>7 – Sangat penting</li>
                        <li>9 – Mutlak lebih penting</li>
                        <li>2, 4, 6, 8 – Nilai antara dua tingkat kepentingan</li>
                    </ul>

                    <p>
                        Nilai di bawah diagonal (otomatis) adalah kebalikan dari nilai di atas
                        diagonal, misalnya jika A lebih penting dari B dengan nilai 3, maka B
                        terhadap A bernilai 1/3.
                    </p>
                </div>
            </PageWrapper>
        </AuthLayout>
    );
}

export default NilaiPerbandinganPage;

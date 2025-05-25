import React from 'react';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Lahan } from '@/types';

import PageWrapper from '@/components/page-wrapper';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import UserLayout from '@/layouts/user-layout';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

interface HasilRekomendasiPageProps {
    result: {
        id: string;
        nama: string;
        score: number;
        keterangan: string;
    }[];
    lahan: Lahan;
}

function HasilRekomendasiPage({ result, lahan }: HasilRekomendasiPageProps) {
    const lamaIstirahat = lahan.riwayat_tanam[0].tanggal_istirahat
        ? Math.max(
              0,
              Math.ceil(
                  (new Date().getTime() -
                      new Date(lahan.riwayat_tanam[0].tanggal_istirahat).getTime()) /
                      (1000 * 60 * 60 * 24)
              )
          )
        : null;

    return (
        <UserLayout title="Hasil Rekomendasi">
            <PageWrapper title="Hasil Rekomendasi" Icon={CheckCircle2}>
                <Card className={cn('bg-background rounded-md')}>
                    <CardHeader>
                        <CardTitle>Data Input Dari Riwayat Terakhir</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="list-disc list-inside">
                            <li>
                                <strong>Lahan:</strong> {lahan.nama}
                            </li>
                            <li>
                                <strong>Lokasi:</strong> {lahan.lokasi || '-'}
                            </li>
                            <li>
                                <strong>Luas:</strong> {lahan.luas || '-'} m<sup>2</sup>
                            </li>
                            <li>
                                <strong>Tanaman Sebelumnya:</strong>{' '}
                                {lahan.riwayat_tanam[0].kriteria_riwayat_tanam[0].sub_kriteria
                                    ?.nama || '-'}
                            </li>
                            <li>
                                <strong>Lama Istirahat:</strong> {lamaIstirahat || '-'} hari
                            </li>
                        </ul>
                    </CardContent>
                </Card>

                <Card className={cn('bg-background rounded-md')}>
                    <CardHeader>
                        <CardTitle>Rekomendasi Tanaman</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-hidden rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="text-center w-10">No</TableHead>
                                        <TableHead>Tanaman</TableHead>
                                        <TableHead className="text-center">
                                            Skor Preferensi
                                        </TableHead>
                                        <TableHead className="text-center">Keterangan</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {result.map((r, i) => {
                                        return (
                                            <TableRow key={i}>
                                                <TableCell className="text-center w-10">
                                                    {i + 1}
                                                </TableCell>
                                                <TableCell>{r.nama}</TableCell>
                                                <TableCell className="text-center">
                                                    {r.score}
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    <Badge
                                                        variant={
                                                            r.keterangan === 'Cocok'
                                                                ? 'default'
                                                                : 'destructive'
                                                        }
                                                    >
                                                        {r.keterangan}
                                                    </Badge>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>

                <Button
                    className="mt-5"
                    variant="destructive"
                    onClick={() => window.history.back()}
                >
                    <ArrowLeft />
                    Kembali
                </Button>
            </PageWrapper>
        </UserLayout>
    );
}

export default HasilRekomendasiPage;

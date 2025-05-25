import React from 'react';
import { MapPin, Search, SquarePen, Trash2 } from 'lucide-react';
import { Link } from '@inertiajs/react';

import { cn, truncateWords } from '@/lib/utils';
import { Lahan } from '@/types';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface CardLahanProps {
    className?: string;
    lahan: Lahan;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setTypeAction: React.Dispatch<React.SetStateAction<'create' | 'edit' | 'delete' | null>>;
    setSelectedData: React.Dispatch<React.SetStateAction<Lahan | null>>;
}

function CardLahan({ className, lahan, setOpen, setTypeAction, setSelectedData }: CardLahanProps) {
    // events
    const handleEdit = () => {
        setTypeAction('edit');
        setSelectedData(lahan);
        setOpen(true);
    };

    const handleDelete = async () => {
        setTypeAction('delete');
        setSelectedData(lahan);
        setOpen(true);
    };

    return (
        <Card className={cn('bg-background rounded-md', className)}>
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    <h3 className="text-2xl">{truncateWords(lahan.nama, 3)}</h3>
                    <div className="flex items-center gap-2">
                        {/* edit */}
                        <Button variant="secondary" size="icon" onClick={handleEdit}>
                            <SquarePen />
                        </Button>

                        {/* hapus */}
                        <Button variant="destructive" size="icon" onClick={handleDelete}>
                            <Trash2 />
                        </Button>
                    </div>
                </CardTitle>

                <CardDescription className="flex items-center gap-2">
                    <MapPin className="size-5" />
                    {truncateWords(lahan.lokasi, 5) || '-'}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ul className="list-disc list-inside">
                    <li>
                        <strong>Luas:</strong> {lahan.luas} m<sup>2</sup>
                    </li>
                    {lahan.kriteria_lahan.map(item => (
                        <li key={item.id}>
                            <strong>{item.kriteria?.nama}:</strong> {item.sub_kriteria?.nama}
                        </li>
                    ))}
                </ul>
            </CardContent>
            <CardFooter>
                <Link href={route('rekomendasi.index', lahan.id)} className="w-full">
                    <Button className="w-full">
                        <Search />
                        Lihat Detail & Rekomendasi
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    );
}

export default CardLahan;

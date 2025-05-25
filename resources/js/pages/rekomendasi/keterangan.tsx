import React from 'react';

import { Lahan } from '@/types';

interface KeteranganProps {
    lahan: Lahan;
}

function Keterangan({ lahan }: KeteranganProps) {
    return (
        <div className="text-muted-foreground text-sm text-justify">
            <h2 className="text-xl font-semibold text-card-foreground">Informasi Lahan</h2>
            <p>Lokasi: {lahan.lokasi}</p>
            <p>Luas: {lahan.luas} m²</p>
            <p>Kriteria:</p>
            <ul className="list-disc list-inside">
                {lahan.kriteria_lahan.map(kl => (
                    <li key={kl.id}>
                        {kl.kriteria.nama}: {kl.sub_kriteria.nama}
                    </li>
                ))}
            </ul>
            <br />
            Halaman ini bertujuan untuk memberikan <strong>rekomendasi tanaman</strong> yang paling
            sesuai dengan kondisi lahan yang dimiliki petani. Proses ini dilakukan menggunakan{' '}
            <strong>
                metode TOPSIS (Technique for Order Preference by Similarity to Ideal Solution)
            </strong>
            .
            <br />
            <br />
            Sistem akan mencocokkan kondisi lahan—seperti <em>jenis tanah</em>, <em>drainase</em>,
            dan <em>kebutuhan air</em>—dengan data{' '}
            <strong>syarat tanam dari setiap jenis tanaman</strong>. Kemudian sistem akan memberikan
            peringkat tanaman terbaik berdasarkan tingkat kesesuaian.
            <br />
            <br />
            Sebelum menjalankan proses rekomendasi, pastikan:
            <ul className="list-disc list-inside ml-4 mt-1">
                <li>Data kondisi lahan sudah lengkap dan akurat</li>
                <li>Riwayat tanam sudah ditentukan (jika dibutuhkan sebagai kriteria)</li>
            </ul>
            <br />
            Setelah itu, tekan tombol <strong>"Jalankan Proses Rekomendasi (TOPSIS)"</strong> untuk
            melihat hasil tanaman yang direkomendasikan.
        </div>
    );
}

export default Keterangan;

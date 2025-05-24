import React from 'react';

function Keterangan() {
    return (
        <p className="text-muted-foreground text-sm text-justify">
            Halaman ini digunakan untuk mengelola informasi <strong>lahan milik petani</strong>.
            Setiap lahan memiliki nama, lokasi, luas, serta kondisi tertentu yang dinilai
            berdasarkan
            <strong> kriteria pertanian</strong> seperti <em>jenis tanah</em>, <em>drainase</em>,
            dan
            <em> kebutuhan air</em>.
            <br />
            <br />
            Anda dapat menambahkan lahan dengan menekan tombol <strong>Tambah Lahan</strong> dan
            mengisi dua langkah formulir:
            <ul className="list-disc list-inside">
                <li>
                    <strong>Langkah 1</strong>: Masukkan nama, lokasi, dan luas lahan.
                </li>
                <li>
                    <strong>Langkah 2</strong>: Pilih kondisi dari setiap kriteria lahan.
                </li>
            </ul>
            <br />
            Data lahan ini akan digunakan oleh sistem untuk merekomendasikan tanaman yang paling
            sesuai berdasarkan kecocokan nilai kriteria dan syarat tanam.
        </p>
    );
}

export default Keterangan;

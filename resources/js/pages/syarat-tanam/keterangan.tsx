import React from 'react';

function Keterangan() {
    return (
        <p className="text-muted-foreground text-sm text-justify">
            <strong>Keterangan:</strong>
            <br />
            <span>
                <strong>Syarat Tanam</strong> merupakan ketentuan yang ditetapkan oleh admin
                mengenai kondisi ideal yang dibutuhkan setiap tanaman agar dapat tumbuh optimal.
            </span>
            <br />
            <br />
            <span>
                Setiap tanaman memiliki kombinasi sub-kriteria yang menggambarkan karakteristik
                tanam ideal, misalnya jenis tanah tertentu, musim yang sesuai, dan kebutuhan air
                yang cocok.
            </span>
            <br />
            <br />
            <span>
                Nilai yang tercatat digunakan dalam perhitungan <strong>TOPSIS</strong>, untuk
                menentukan tanaman yang paling cocok dengan kondisi saat ini.
            </span>
            <br />
            <br />
            <span>
                Data ini tidak diisi oleh petani, melainkan oleh admin berdasarkan pengetahuan pakar
                atau referensi teknis pertanian.
            </span>
        </p>
    );
}

export default Keterangan;

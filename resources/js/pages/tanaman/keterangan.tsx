import React from 'react';

function Keterangan() {
    return (
        <div className="text-muted-foreground text-sm text-justify">
            <strong>Keterangan:</strong>
            <br />
            <span>
                Halaman ini digunakan untuk mengelola data tanaman yang menjadi alternatif dalam
                sistem pendukung keputusan.
            </span>
            <br />
            <ul className="list-disc list-inside">
                <li>
                    Setiap <strong>tanaman</strong> akan dinilai berdasarkan{' '}
                    <strong>syarat tanam</strong> dan akan dibandingkan menggunakan metode{' '}
                    <strong>TOPSIS</strong>.
                </li>
                <li>
                    Data tanaman di sini akan digunakan oleh <strong>admin</strong> untuk menentukan
                    tanaman terbaik yang sesuai dengan kondisi lahan, musim, dan preferensi lainnya.
                </li>
                <li>
                    Setelah menambahkan data tanaman, pastikan juga mengisi{' '}
                    <strong>syarat tanam</strong> untuk setiap kriteria penilaian seperti jenis
                    tanah, musim, riwayat tanam, dll.
                </li>
            </ul>
            <br />
            <span>
                Pastikan informasi nama tanaman ditulis dengan benar dan konsisten agar mudah
                dikenali oleh pengguna sistem lainnya.
            </span>
        </div>
    );
}

export default Keterangan;

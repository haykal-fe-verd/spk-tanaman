import React from 'react';

function Keterangan() {
    return (
        <div className="text-muted-foreground text-sm text-justify">
            <strong>Keterangan:</strong>
            <span>
                <ul className="list-disc list-inside">
                    <li>
                        <strong>Benefit</strong>: Semakin besar nilainya maka semakin baik.
                    </li>
                    <li>
                        <strong>Cost</strong>: Semakin kecil nilainya maka semakin baik.
                    </li>
                </ul>
            </span>
            <br />
            <br />
            <span>
                Bobot tidak diisi secara manual, tetapi dihitung berdasarkan:
                <ul className="list-disc list-inside">
                    <li>Perbandingan berpasangan antar kriteria (metode AHP).</li>
                    <li>Normalisasi dan rata-rata dari hasil matriks perbandingan.</li>
                </ul>
            </span>
            <span>
                Setelah menghitung bobot, Anda disarankan untuk melakukan{' '}
                <strong>cek konsistensi</strong> untuk memastikan keputusan logis dan tidak
                bertentangan.
                <br />
                <br />
                <strong>Kenapa harus cek konsistensi?</strong>
                <ul className="list-disc list-inside">
                    <li>
                        AHP mengandalkan penilaian subjektif. Jika penilaian tidak konsisten, maka
                        bobot yang dihasilkan tidak bisa diandalkan.
                    </li>
                    <li>
                        Nilai konsistensi dihitung menggunakan nilai <code>λ max</code>,{' '}
                        <code>CI</code> (Consistency Index), dan <code>CR</code> (Consistency
                        Ratio).
                    </li>
                    <li>
                        Jika <code>CR &lt; 0.1</code> maka keputusan dianggap konsisten.
                    </li>
                </ul>
            </span>
            <span>
                Anda dapat menghitung bobot pada halaman <strong>Nilai Perbandingan</strong> dan
                melakukan
                <strong> cek konsistensi </strong> menggunakan tombol di atas.
            </span>
        </div>
    );
}

export default Keterangan;

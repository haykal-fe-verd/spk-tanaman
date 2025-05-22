import React from 'react';

function Keterangan() {
    return (
        <p className="text-muted-foreground text-sm text-justify">
            <strong>Keterangan:</strong>
            <br />
            <strong>Sub Kriteria</strong> merupakan alternatif pilihan dari masing-masing kriteria.
            Setiap sub kriteria diberi nilai <strong>preferensi</strong> dalam rentang 0–1 sebagai
            dasar perhitungan metode <strong>TOPSIS</strong>.
            <br />
            <br />
            Nilai ini mencerminkan seberapa baik sub kriteria tersebut dalam memenuhi tujuan
            keputusan. Semakin besar nilai, maka sub kriteria dianggap lebih{' '}
            <strong>diutamakan</strong> (benefit). Nilai ini dapat ditentukan berdasarkan:
            <ul className="list-disc list-inside">
                <li>Preferensi pakar atau pengalaman lapangan</li>
                <li>Data kuantitatif yang diubah ke skala preferensi</li>
            </ul>
            <br />
            Contoh:
            <ul className="list-disc list-inside">
                <li>
                    <strong>Jenis Tanah:</strong> Tanah Lempung (1.0), Tanah Pasir (0.6)
                </li>
                <li>
                    <strong>Musim:</strong> Musim Hujan (1.0), Musim Kemarau (0.5)
                </li>
            </ul>
        </p>
    );
}

export default Keterangan;

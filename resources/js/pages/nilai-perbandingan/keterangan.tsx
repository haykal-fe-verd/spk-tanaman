import React from 'react';

function Keterangan() {
    return (
        <div className="text-sm text-muted-foreground ">
            <strong>Keterangan:</strong>
            <br />
            <span>
                Nilai perbandingan menunjukkan tingkat kepentingan relatif antara dua kriteria.
                Nilai 1 berarti kedua kriteria sama penting. Nilai lebih dari 1 menunjukkan bahwa
                kriteria baris lebih penting daripada kriteria kolom, sedangkan nilai kurang dari 1
                menunjukkan sebaliknya.
            </span>
            <br />
            <ul className="list-disc list-inside">
                <li>1 – Sama penting</li>
                <li>3 – Cukup penting</li>
                <li>5 – Lebih penting</li>
                <li>7 – Sangat penting</li>
                <li>9 – Mutlak lebih penting</li>
                <li>2, 4, 6, 8 – Nilai antara dua tingkat kepentingan</li>
            </ul>
            <br />
            <span>
                Nilai di bawah diagonal (otomatis) adalah kebalikan dari nilai di atas diagonal,
                misalnya jika A lebih penting dari B dengan nilai 3, maka B terhadap A bernilai 1/3.
            </span>
        </div>
    );
}

export default Keterangan;

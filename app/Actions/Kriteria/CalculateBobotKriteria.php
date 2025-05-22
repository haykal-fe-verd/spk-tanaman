<?php

namespace App\Actions\Kriteria;

use App\Models\Kriteria;
use App\Models\NilaiPerbandingan;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;

class CalculateBobotKriteria
{
    public function handle(): RedirectResponse
    {
        // Ambil semua kriteria
        $kriteria = Kriteria::all();
        $n = $kriteria->count();

        // Buat mapping ID ke index dan sebaliknya
        $idToIndex = $kriteria->pluck('id')->flip()->toArray();
        $indexToId = $kriteria->pluck('id')->toArray();

        // Inisialisasi matriks kosong NxN
        $matrix = array_fill(0, $n, array_fill(0, $n, 1));

        // Ambil semua nilai perbandingan dari database
        $perbandingan = NilaiPerbandingan::all();

        // Isi matriks perbandingan
        foreach ($perbandingan as $item) {
            $i = $idToIndex[$item->id_kriteria_1];
            $j = $idToIndex[$item->id_kriteria_2];

            $matrix[$i][$j] = $item->nilai;
            $matrix[$j][$i] = 1 / $item->nilai;
        }

        // Hitung jumlah kolom
        $colSums = array_fill(0, $n, 0);
        for ($j = 0; $j < $n; $j++) {
            for ($i = 0; $i < $n; $i++) {
                $colSums[$j] += $matrix[$i][$j];
            }
        }

        // Normalisasi dan hitung rata-rata baris (bobot)
        $normalized = [];
        $bobot = array_fill(0, $n, 0);

        for ($i = 0; $i < $n; $i++) {
            for ($j = 0; $j < $n; $j++) {
                $normalized[$i][$j] = $matrix[$i][$j] / $colSums[$j];
                $bobot[$i] += $normalized[$i][$j];
            }
            $bobot[$i] /= $n; // rata-rata baris
        }

        // Simpan bobot ke database
        DB::transaction(function () use ($indexToId, $bobot) {
            foreach ($indexToId as $i => $id) {
                Kriteria::where('id', $id)->update(['bobot' => round($bobot[$i], 4)]);
            }
        });

        return redirect()->back()->with('success', 'Bobot kriteria berhasil dihitung.');
    }
}

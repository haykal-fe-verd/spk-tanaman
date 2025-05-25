<?php

namespace App\Helpers;

use App\Models\Kriteria;
use App\Models\RiwayatTanam;
use App\Models\Tanaman;

class TopsisHelper
{
    public static function run(string $idLahan): array
    {
        // 1. Ambil riwayat tanam terbaru
        $riwayat = RiwayatTanam::where('id_lahan', $idLahan)
            ->latest()
            ->with(['kriteriaRiwayatTanam'])
            ->first();

        if (!$riwayat) {
            return [];
        }

        // 2. Mapping input user
        $input = $riwayat->kriteriaRiwayatTanam->pluck('id_sub_kriteria', 'id_kriteria')->toArray();

        // 3. Ambil semua tanaman dan bobot
        $tanamanList = Tanaman::with('syaratTanam')->get();
        $bobot = Kriteria::pluck('bobot', 'id')->toArray();

        // 4. Matriks keputusan
        $matriks = [];
        foreach ($tanamanList as $tanaman) {
            foreach ($input as $idKriteria => $idSubInput) {
                $valTanaman = $tanaman->syaratTanam
                    ->first(fn($item) => $item->id_kriteria === $idKriteria && $item->id_sub_kriteria === $idSubInput)?->nilai ?? 0;

                $matriks[$tanaman->id][$idKriteria] = $valTanaman;
            }
        }

        // 5. Normalisasi
        $normalisasi = [];
        foreach ($input as $idKriteria => $_) {
            $sumSquare = 0;
            foreach ($matriks as $alt) {
                $sumSquare += pow($alt[$idKriteria] ?? 0, 2);
            }
            $sqrt = sqrt($sumSquare);

            foreach ($matriks as $idTanaman => $alt) {
                $normalisasi[$idTanaman][$idKriteria] = ($alt[$idKriteria] ?? 0) / ($sqrt ?: 1);
            }
        }

        // 6. Matriks terbobot
        $terbobot = [];
        foreach ($normalisasi as $idTanaman => $alt) {
            foreach ($alt as $idKriteria => $nilai) {
                $terbobot[$idTanaman][$idKriteria] = $nilai * ($bobot[$idKriteria] ?? 0);
            }
        }

        // 7. Solusi ideal
        $idealPos = $idealNeg = [];
        foreach ($input as $idKriteria => $_) {
            $kolom = array_column($terbobot, $idKriteria);
            $idealPos[$idKriteria] = max($kolom);
            $idealNeg[$idKriteria] = min($kolom);
        }

        // 8. Preferensi dan hasil
        $hasil = [];
        foreach ($terbobot as $idTanaman => $alt) {
            $dPlus = $dMin = 0;
            foreach ($alt as $idKriteria => $val) {
                $dPlus += pow($val - $idealPos[$idKriteria], 2);
                $dMin += pow($val - $idealNeg[$idKriteria], 2);
            }

            $dPlus = sqrt($dPlus);
            $dMin = sqrt($dMin);
            $preferensi = ($dPlus + $dMin) > 0 ? $dMin / ($dPlus + $dMin) : 0;

            $tanaman = $tanamanList->firstWhere('id', $idTanaman);

            $hasil[] = [
                'id' => $idTanaman,
                'nama' => $tanaman?->nama ?? '-',
                'score' => round($preferensi, 4),
                'keterangan' => $preferensi >= 0.5 ? 'Cocok' : 'Tidak Cocok',
            ];
        }

        // 9. Urutkan dari score tertinggi
        usort($hasil, fn($a, $b) => $b['score'] <=> $a['score']);

        return $hasil;
    }
}

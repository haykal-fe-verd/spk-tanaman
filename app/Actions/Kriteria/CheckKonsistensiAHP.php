<?php

namespace App\Actions\Kriteria;

use App\Models\Kriteria;
use App\Models\NilaiPerbandingan;

class CheckKonsistensiAHP
{
    public function handle(): array
    {
        $kriteria = Kriteria::all();
        $n = $kriteria->count();

        if ($n < 2) {
            return [
                'status' => false,
                'message' => 'Jumlah kriteria tidak cukup untuk analisis konsistensi.',
            ];
        }

        $idToIndex = $kriteria->pluck('id')->flip()->toArray();
        $indexToId = $kriteria->pluck('id')->toArray();

        $matrix = array_fill(0, $n, array_fill(0, $n, 1));

        $perbandingan = NilaiPerbandingan::all();

        foreach ($perbandingan as $item) {
            $i = $idToIndex[$item->id_kriteria_1];
            $j = $idToIndex[$item->id_kriteria_2];
            $matrix[$i][$j] = $item->nilai;
            $matrix[$j][$i] = 1 / $item->nilai;
        }

        $colSums = array_fill(0, $n, 0);
        for ($j = 0; $j < $n; $j++) {
            for ($i = 0; $i < $n; $i++) {
                $colSums[$j] += $matrix[$i][$j];
            }
        }

        $normalized = [];
        $bobot = array_fill(0, $n, 0);

        for ($i = 0; $i < $n; $i++) {
            for ($j = 0; $j < $n; $j++) {
                $normalized[$i][$j] = $matrix[$i][$j] / $colSums[$j];
                $bobot[$i] += $normalized[$i][$j];
            }
            $bobot[$i] /= $n;
        }

        $lambdaMax = 0;
        for ($i = 0; $i < $n; $i++) {
            $rowSum = 0;
            for ($j = 0; $j < $n; $j++) {
                $rowSum += $matrix[$i][$j] * $bobot[$j];
            }
            $lambdaMax += $rowSum / $bobot[$i];
        }
        $lambdaMax /= $n;

        $ci = ($lambdaMax - $n) / ($n - 1);
        $ir = $this->getIR($n);
        $cr = $ir > 0 ? $ci / $ir : 0;

        return [
            'status' => true,
            'n' => $n,
            'lambda_max' => round($lambdaMax, 4),
            'ci' => round($ci, 4),
            'cr' => round($cr, 4),
            'konsisten' => $cr < 0.1,
        ];
    }

    private function getIR(int $n): float
    {
        $irTable = [
            1 => 0.00,
            2 => 0.00,
            3 => 0.58,
            4 => 0.90,
            5 => 1.12,
            6 => 1.24,
            7 => 1.32,
            8 => 1.41,
            9 => 1.45,
            10 => 1.49,
        ];

        return $irTable[$n] ?? 1.50; // fallback
    }
}

<?php

namespace Database\Seeders;

use App\Models\Kriteria;
use App\Models\SubKriteria;
use App\Models\SyaratTanam;
use App\Models\Tanaman;
use Illuminate\Database\Seeder;

class SyaratTanamSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tanaman = Tanaman::all();
        $kriteria = Kriteria::all();
        $subKriteria = SubKriteria::all();

        $nilaiSyaratTanam = [
            'Padi' => [
                1 => [0.8, 0.6, 0.6, 0.4],
                2 => [1.0, 0.4],
                3 => [0.4, 0.8, 0.6, 0.6, 0.6, 0.6, 0.4],
                4 => [1.0, 0.4, 0.2],
                5 => [0.6, 0.4, 0.2],
            ],
            'Jagung' => [
                1 => [0.6, 0.8, 0.6, 0.4],
                2 => [0.6, 1.0],
                3 => [0.6, 0.4, 0.6, 0.6, 0.6, 0.8, 0.8],
                4 => [0.4, 1.0, 0.6],
                5 => [0.8, 0.6, 0.4],
            ],
            'Tembakau' => [
                1 => [0.6, 0.8, 0.6, 0.6],
                2 => [0.6, 1.0],
                3 => [0.4, 0.8, 0.4, 0.6, 0.6, 0.6, 0.8],
                4 => [0.4, 0.6, 0.6],
                5 => [0.8, 0.6, 0.4],
            ],
            'Cabai Besar' => [
                1 => [0.8, 0.8, 0.6, 0.4],
                2 => [0.6, 0.8],
                3 => [0.4, 0.8, 0.6, 0.4, 0.4, 0.4, 0.8],
                4 => [0.4, 0.8, 0.6],
                5 => [0.8, 0.6, 0.6],
            ],
            'Cabai Rawit' => [
                1 => [0.8, 0.8, 0.6, 0.4],
                2 => [0.6, 0.8],
                3 => [0.4, 0.8, 0.6, 0.4, 0.4, 0.4, 0.8],
                4 => [0.4, 0.8, 0.6],
                5 => [0.8, 0.6, 0.6],
            ],
            'Tomat' => [
                1 => [0.8, 0.8, 0.6, 0.4],
                2 => [0.6, 1.0],
                3 => [0.4, 0.8, 0.6, 0.6, 0.6, 0.2, 0.8],
                4 => [0.4, 0.8, 0.6],
                5 => [0.8, 0.6, 0.6],
            ],
            'Bawang Merah' => [
                1 => [0.8, 0.8, 0.6, 0.4],
                2 => [0.6, 0.8],
                3 => [0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.4],
                4 => [0.4, 0.8, 0.6],
                5 => [0.8, 0.6, 0.6],
            ],
        ];

        foreach ($tanaman as $t) {
            foreach ($kriteria as $kIndex => $k) {
                $sub_kriteria = SubKriteria::where('id_kriteria', $k->id)->get();

                foreach ($sub_kriteria as $index => $sub) {
                    $namaTanaman = $t->nama;
                    $nilai = $nilaiSyaratTanam[$namaTanaman][$kIndex + 1][$index] ?? 0;

                    SyaratTanam::create([
                        'id_tanaman' => $t->id,
                        'id_kriteria' => $k->id,
                        'id_sub_kriteria' => $sub->id,
                        'nilai' => $nilai,
                    ]);
                }
            }
        }
    }
}

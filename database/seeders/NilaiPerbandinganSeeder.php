<?php

namespace Database\Seeders;

use App\Models\Kriteria;
use App\Models\NilaiPerbandingan;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class NilaiPerbandinganSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $kriteria = Kriteria::all();

        foreach ($kriteria as $i => $k1) {
            foreach ($kriteria as $j => $k2) {
                if ($i >= $j) continue; // hindari duplikat dan perbandingan diri sendiri

                NilaiPerbandingan::create([
                    'id_kriteria_1' => $k1->id,
                    'id_kriteria_2' => $k2->id,
                    'nilai' => rand(1, 9), // random nilai skala AHP
                ]);
            }
        }
    }
}

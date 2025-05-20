<?php

namespace Database\Seeders;

use App\Models\Kriteria;
use App\Models\KriteriaLahan;
use App\Models\Lahan;
use App\Models\SubKriteria;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class KriteriaLahanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $lahan = Lahan::all();
        $kriteria = Kriteria::all();

        foreach ($lahan as $l) {
            foreach ($kriteria as $k) {
                $sub = SubKriteria::where('id_kriteria', $k->id)->inRandomOrder()->first();

                if ($sub) {
                    KriteriaLahan::create([
                        'id_lahan' => $l->id,
                        'id_kriteria' => $k->id,
                        'id_sub_kriteria' => $sub->id
                    ]);
                }
            }
        }
    }
}

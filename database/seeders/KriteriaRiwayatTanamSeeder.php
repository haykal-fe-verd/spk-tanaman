<?php

namespace Database\Seeders;

use App\Models\Kriteria;
use App\Models\KriteriaRiwayatTanam;
use App\Models\RiwayatTanam;
use App\Models\SubKriteria;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class KriteriaRiwayatTanamSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $riwayat_tanam = RiwayatTanam::all();
        $kriteria = Kriteria::all();

        foreach ($riwayat_tanam as $r) {
            foreach ($kriteria as $k) {
                $sub = SubKriteria::where('id_kriteria', $k->id)->inRandomOrder()->first();

                KriteriaRiwayatTanam::create([
                    'id_riwayat_tanam' => $r->id,
                    'id_kriteria' => $k->id,
                    'id_sub_kriteria' => $sub->id
                ]);
            }
        }
    }
}

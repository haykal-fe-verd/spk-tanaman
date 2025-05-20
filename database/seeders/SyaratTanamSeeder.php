<?php

namespace Database\Seeders;

use App\Models\Kriteria;
use App\Models\SubKriteria;
use App\Models\SyaratTanam;
use App\Models\Tanaman;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SyaratTanamSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tanaman = Tanaman::all(); // 7 tanaman
        $kriteria = Kriteria::all(); // 5 kriteria

        foreach ($tanaman as $t) {
            foreach ($kriteria as $k) {
                // 19 sub kriteria [jenis_tanah = 4, musim = 2, riwayat_tanam = 7, kebutuhan_air = 3, drainase = 3]
                $sub_kriteria = SubKriteria::where('id_kriteria', $k->id)->get();

                foreach ($sub_kriteria as $sub) {
                    SyaratTanam::create([
                        'id_tanaman' => $t->id,
                        'id_kriteria' => $k->id,
                        'id_sub_kriteria' => $sub->id,
                        'nilai' => $sub->nilai
                    ]);
                }
            }
        }
    }
}

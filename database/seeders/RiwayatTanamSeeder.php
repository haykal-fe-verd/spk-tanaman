<?php

namespace Database\Seeders;

use App\Models\Lahan;
use App\Models\RiwayatTanam;
use App\Models\Tanaman;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RiwayatTanamSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $lahan = Lahan::all();
        $tanaman = Tanaman::all();

        foreach ($lahan as $l) {
            for ($i = 0; $i < 3; $i++) {
                $tanamanRandom = $tanaman->random();
                $tanggalTanam = now()->subMonths(rand(6, 24));
                $tanggalPanen = (clone $tanggalTanam)->addMonths(rand(2, 4));
                $tanggalIstirahat = (clone $tanggalPanen)->addWeeks(rand(2, 6));

                RiwayatTanam::create([
                    'id_lahan' => $l->id,
                    'id_tanaman' => $tanamanRandom->id,
                    'tanggal_tanam' => $tanggalTanam,
                    'tanggal_panen' => $tanggalPanen,
                    'tanggal_istirahat' => $tanggalIstirahat,
                ]);
            }
        }
    }
}

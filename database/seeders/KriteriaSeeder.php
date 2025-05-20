<?php

namespace Database\Seeders;

use App\Models\Kriteria;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class KriteriaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                'nama' => 'Jenis Tanah',
                'tipe' => 'benefit',
                'bobot' => null,
            ],
            [
                'nama' => 'Musim',
                'tipe' => 'benefit',
                'bobot' => null,
            ],
            [
                'nama' => 'Riwayat Tanam',
                'tipe' => 'benefit',
                'bobot' => null,
            ],
            [
                'nama' => 'Kebutuhan Air',
                'tipe' => 'benefit',
                'bobot' => null,
            ],
            [
                'nama' => 'Drainase',
                'tipe' => 'benefit',
                'bobot' => null,
            ],
        ];

        foreach ($data as $kriteria) {
            Kriteria::create($kriteria);
        }
    }
}

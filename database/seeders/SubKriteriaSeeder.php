<?php

namespace Database\Seeders;

use App\Models\Kriteria;
use App\Models\SubKriteria;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SubKriteriaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $kriteria = Kriteria::pluck('id', 'nama');

        $data = [
            // Jenis Tanah
            ['id_kriteria' => $kriteria['Jenis Tanah'], 'nama' => 'Tanah Liat',     'nilai' => 0.8],
            ['id_kriteria' => $kriteria['Jenis Tanah'], 'nama' => 'Tanah Pasir',    'nilai' => 0.6],
            ['id_kriteria' => $kriteria['Jenis Tanah'], 'nama' => 'Tanah Lempung',  'nilai' => 1.0],
            ['id_kriteria' => $kriteria['Jenis Tanah'], 'nama' => 'Tanah Gambut',   'nilai' => 0.4],

            // Musim
            ['id_kriteria' => $kriteria['Musim'], 'nama' => 'Musim Hujan',          'nilai' => 1.0],
            ['id_kriteria' => $kriteria['Musim'], 'nama' => 'Musim Kemarau',        'nilai' => 0.5],

            // Riwayat Tanam
            ['id_kriteria' => $kriteria['Riwayat Tanam'], 'nama' => 'Padi',         'nilai' => 1.0],
            ['id_kriteria' => $kriteria['Riwayat Tanam'], 'nama' => 'Jagung',       'nilai' => 0.8],
            ['id_kriteria' => $kriteria['Riwayat Tanam'], 'nama' => 'Tembakau',     'nilai' => 0.6],
            ['id_kriteria' => $kriteria['Riwayat Tanam'], 'nama' => 'Cabai Besar',  'nilai' => 0.7],
            ['id_kriteria' => $kriteria['Riwayat Tanam'], 'nama' => 'Cabai Rawit',  'nilai' => 0.9],
            ['id_kriteria' => $kriteria['Riwayat Tanam'], 'nama' => 'Tomat',        'nilai' => 0.8],
            ['id_kriteria' => $kriteria['Riwayat Tanam'], 'nama' => 'Bawang Merah', 'nilai' => 0.6],

            // Kebutuhan Air
            ['id_kriteria' => $kriteria['Kebutuhan Air'], 'nama' => 'Tinggi',       'nilai' => 1.0],
            ['id_kriteria' => $kriteria['Kebutuhan Air'], 'nama' => 'Sedang',       'nilai' => 0.6],
            ['id_kriteria' => $kriteria['Kebutuhan Air'], 'nama' => 'Rendah',       'nilai' => 0.3],

            // Drainase
            ['id_kriteria' => $kriteria['Drainase'], 'nama' => 'Cepat',             'nilai' => 1.0],
            ['id_kriteria' => $kriteria['Drainase'], 'nama' => 'Sedang',            'nilai' => 0.7],
            ['id_kriteria' => $kriteria['Drainase'], 'nama' => 'Lambat',            'nilai' => 0.4],
        ];


        foreach ($data as $subKriteria) {
            SubKriteria::create($subKriteria);
        }
    }
}

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
            ['id_kriteria' => $kriteria['Jenis Tanah'], 'nama' => 'Tanah Liat'],
            ['id_kriteria' => $kriteria['Jenis Tanah'], 'nama' => 'Tanah Pasir'],
            ['id_kriteria' => $kriteria['Jenis Tanah'], 'nama' => 'Tanah Lempung'],
            ['id_kriteria' => $kriteria['Jenis Tanah'], 'nama' => 'Tanah Gambut'],

            // Musim
            ['id_kriteria' => $kriteria['Musim'], 'nama' => 'Musim Hujan'],
            ['id_kriteria' => $kriteria['Musim'], 'nama' => 'Musim Kemarau'],

            // Riwayat Tanam
            ['id_kriteria' => $kriteria['Riwayat Tanam'], 'nama' => 'Padi'],
            ['id_kriteria' => $kriteria['Riwayat Tanam'], 'nama' => 'Jagung'],
            ['id_kriteria' => $kriteria['Riwayat Tanam'], 'nama' => 'Tembakau'],
            ['id_kriteria' => $kriteria['Riwayat Tanam'], 'nama' => 'Cabai Besar'],
            ['id_kriteria' => $kriteria['Riwayat Tanam'], 'nama' => 'Cabai Rawit'],
            ['id_kriteria' => $kriteria['Riwayat Tanam'], 'nama' => 'Tomat'],
            ['id_kriteria' => $kriteria['Riwayat Tanam'], 'nama' => 'Bawang Merah'],

            // Kebutuhan Air
            ['id_kriteria' => $kriteria['Kebutuhan Air'], 'nama' => 'Tinggi'],
            ['id_kriteria' => $kriteria['Kebutuhan Air'], 'nama' => 'Sedang'],
            ['id_kriteria' => $kriteria['Kebutuhan Air'], 'nama' => 'Rendah'],

            // Drainase
            ['id_kriteria' => $kriteria['Drainase'], 'nama' => 'Cepat'],
            ['id_kriteria' => $kriteria['Drainase'], 'nama' => 'Sedang'],
            ['id_kriteria' => $kriteria['Drainase'], 'nama' => 'Lambat'],
        ];


        foreach ($data as $subKriteria) {
            SubKriteria::create($subKriteria);
        }
    }
}

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
            ['id_kriteria' => $kriteria['Jenis Tanah'], 'nama' => 'Tanah Liat', 'nilai' => null],
            ['id_kriteria' => $kriteria['Jenis Tanah'], 'nama' => 'Tanah Pasir', 'nilai' => null],
            ['id_kriteria' => $kriteria['Jenis Tanah'], 'nama' => 'Tanah Lempung', 'nilai' => null],
            ['id_kriteria' => $kriteria['Jenis Tanah'], 'nama' => 'Tanah Gambut', 'nilai' => null],

            // Musim
            ['id_kriteria' => $kriteria['Musim'], 'nama' => 'Musim Hujan', 'nilai' => null],
            ['id_kriteria' => $kriteria['Musim'], 'nama' => 'Musim Kemarau', 'nilai' => null],

            // Riwayat Tanam
            ['id_kriteria' => $kriteria['Riwayat Tanam'], 'nama' => 'Padi', 'nilai' => null],
            ['id_kriteria' => $kriteria['Riwayat Tanam'], 'nama' => 'Jagung', 'nilai' => null],
            ['id_kriteria' => $kriteria['Riwayat Tanam'], 'nama' => 'Tembakau', 'nilai' => null],
            ['id_kriteria' => $kriteria['Riwayat Tanam'], 'nama' => 'Cabai Besar', 'nilai' => null],
            ['id_kriteria' => $kriteria['Riwayat Tanam'], 'nama' => 'Cabai Rawit', 'nilai' => null],
            ['id_kriteria' => $kriteria['Riwayat Tanam'], 'nama' => 'Tomat', 'nilai' => null],
            ['id_kriteria' => $kriteria['Riwayat Tanam'], 'nama' => 'Bawang Merah', 'nilai' => null],

            // Kebutuhan Air
            ['id_kriteria' => $kriteria['Kebutuhan Air'], 'nama' => 'Tinggi', 'nilai' => null],
            ['id_kriteria' => $kriteria['Kebutuhan Air'], 'nama' => 'Sedang', 'nilai' => null],
            ['id_kriteria' => $kriteria['Kebutuhan Air'], 'nama' => 'Rendah', 'nilai' => null],

            // Drainase
            ['id_kriteria' => $kriteria['Drainase'], 'nama' => 'Cepat', 'nilai' => null],
            ['id_kriteria' => $kriteria['Drainase'], 'nama' => 'Sedang', 'nilai' => null],
            ['id_kriteria' => $kriteria['Drainase'], 'nama' => 'Lambat', 'nilai' => null],
        ];

        foreach ($data as $subKriteria) {
            SubKriteria::create($subKriteria);
        }
    }
}

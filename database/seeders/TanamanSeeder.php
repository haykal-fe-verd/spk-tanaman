<?php

namespace Database\Seeders;

use App\Models\Tanaman;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TanamanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            ['nama' => 'Padi', 'deskripsi' => 'Tanaman utama di musim hujan. Membutuhkan air tinggi.'],
            ['nama' => 'Jagung', 'deskripsi' => 'Cocok di musim kemarau. Kebutuhan air sedang.'],
            ['nama' => 'Tembakau', 'deskripsi' => 'Cocok di musim kemarau, tidak tahan genangan.'],
            ['nama' => 'Cabai Besar', 'deskripsi' => 'Tumbuh baik di musim kemarau dan tanah lempung.'],
            ['nama' => 'Cabai Rawit', 'deskripsi' => 'Toleran terhadap kelembaban, tetapi tidak terlalu becek.'],
            ['nama' => 'Tomat', 'deskripsi' => 'Membutuhkan drainase yang baik dan sinar matahari cukup.'],
            ['nama' => 'Bawang Merah', 'deskripsi' => 'Memerlukan drainase cepat dan banyak sinar matahari.'],
        ];

        foreach ($data as $tanaman) {
            Tanaman::create($tanaman);
        }
    }
}

<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            TanamanSeeder::class,
            KriteriaSeeder::class,
            SubKriteriaSeeder::class,
            SyaratTanamSeeder::class,
            LahanSeeder::class,
            KriteriaLahanSeeder::class,
            RiwayatTanamSeeder::class,
            KriteriaRiwayatTanamSeeder::class,
            NilaiPerbandinganSeeder::class
        ]);
    }
}

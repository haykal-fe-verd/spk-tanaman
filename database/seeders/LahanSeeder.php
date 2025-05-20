<?php

namespace Database\Seeders;

use App\Models\Lahan;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LahanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $petani = User::where('role', 'user')->get();

        foreach ($petani as $key => $value) {
            Lahan::create([
                'id_user' => $value->id,
                'nama' => 'Lahan ' . $value->name,
                'luas' => rand(100, 500),
            ]);
        }
    }
}

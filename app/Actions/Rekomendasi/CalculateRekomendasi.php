<?php

namespace App\Actions\Rekomendasi;

use App\Helpers\TopsisHelper;
use App\Models\Lahan;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CalculateRekomendasi
{
    /**
     * Calculate the rekomendasi for the given lahan.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  string  $id
     * @return \Inertia\Response
     */
    public function handle(Request $request, string $id): Response
    {
        $lahan = Lahan::with([
            'riwayatTanam' => fn($q) => $q->latest()->limit(1),
            'riwayatTanam.kriteriaRiwayatTanam',
            'riwayatTanam.kriteriaRiwayatTanam.kriteria',
            'riwayatTanam.kriteriaRiwayatTanam.subKriteria',
        ])->findOrFail($id);

        $result = TopsisHelper::run($id);

        return Inertia::render('rekomendasi/hasil', compact('result', 'lahan'));
    }
}

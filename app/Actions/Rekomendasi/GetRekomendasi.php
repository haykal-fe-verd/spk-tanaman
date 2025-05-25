<?php

namespace App\Actions\Rekomendasi;

use App\Models\Kriteria;
use App\Models\Lahan;
use App\Models\Tanaman;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class GetRekomendasi
{
    /**
     * Show the rekomendasi page for the given lahan.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  string  $id
     * @return \Inertia\Response
     */
    public function handle(Request $request, string $id): Response
    {
        $lahan = Lahan::with([
            'kriteriaLahan.kriteria',
            'kriteriaLahan.subKriteria',
            'riwayatTanam' => fn($q) => $q->latest()->limit(3),
            'riwayatTanam.tanaman',
            'riwayatTanam.kriteriaRiwayatTanam.kriteria',
            'riwayatTanam.kriteriaRiwayatTanam.subKriteria',
        ])->findOrFail($id);

        $tanaman  = Tanaman::all();
        $kriteria = Kriteria::with('subKriteria')->get();

        return Inertia::render('rekomendasi/index', compact('lahan', 'tanaman', 'kriteria'));
    }
}

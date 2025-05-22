<?php

namespace App\Actions\NilaiPerbandingan;

use App\Models\Kriteria;
use App\Models\NilaiPerbandingan;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class GetNilaiPerbandingan
{
    /**
     * Handles the request to retrieve the list of perbandingan.
     *
     * @param Request $request
     * @return Response
     */
    public function handle(Request $request): Response
    {
        $kriteria = Kriteria::all();
        $perbandingan = NilaiPerbandingan::with(['kriteria1', 'kriteria2'])->get();

        return Inertia::render('nilai-perbandingan/index', compact('perbandingan', 'kriteria'));
    }
}

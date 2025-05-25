<?php

namespace App\Http\Controllers;

use App\Actions\Rekomendasi\CalculateRekomendasi;
use App\Actions\Rekomendasi\GetRekomendasi;
use App\Helpers\TopsisHelper;
use App\Models\Kriteria;
use App\Models\Lahan;
use App\Models\Tanaman;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class RekomendasiController extends Controller
{
    /**
     * Display the rekomendasi page for a specific lahan.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  string  $id  The ID of the lahan to retrieve the rekomendasi for.
     * @return \Inertia\Response
     */
    public function index(Request $request, string $id): Response
    {
        return (new GetRekomendasi())->handle($request, $id);
    }

    /**
     * Calculate the rekomendasi for a specific lahan.
     *
     * This method processes the calculation of rekomendasi for the given lahan
     * based on the provided request and lahan ID. It utilizes the CalculateRekomendasi
     * action to perform the calculation and returns the result.
     *
     * @param  \Illuminate\Http\Request  $request  The request object containing user input data.
     * @param  string  $id  The ID of the lahan for which the rekomendasi is being calculated.
     * @return \Illuminate\Http\RedirectResponse|\Inertia\Response
     */
    public function calculate(Request $request, string $id): RedirectResponse | Response
    {
        return (new CalculateRekomendasi())->handle($request, $id);
    }
}

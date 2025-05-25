<?php

namespace App\Actions\SyaratTanam;

use App\Models\Kriteria;
use App\Models\SyaratTanam;
use App\Models\Tanaman;
use App\Traits\HasSearchAndSort;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class GetSyaratTanam
{
    use  HasSearchAndSort;

    /**
     * Initialize the controller's properties.
     *
     * Set the allowed sorts to ['tanaman.nama', 'kriteria.nama', 'nilai', 'created_at', 'updated_at'],
     * the default sort by to 'created_at',
     * the default sort direction to 'desc',
     * and the default per page to 10.
     */
    public function __construct()
    {
        $this->allowedSorts = ['tanaman.nama', 'kriteria.nama', 'nilai', 'created_at', 'updated_at'];
        $this->defaultSortBy = 'created_at';
        $this->defaultSortDir = 'desc';
        $this->defaultPerPage = 10;
    }

    /**
     * Handle the incoming request to get a list of syarat tanam.
     *
     * This method applies search and sort operations on the SyaratTanam model
     * based on the request parameters. It paginates the results and returns
     * an Inertia response to render the 'syarat-tanam/index' page.
     *
     * @param Request $request
     * @return Response
     */

    public function handle(Request $request): Response
    {
        $query = SyaratTanam::with(['tanaman', 'kriteria', 'subkriteria']);

        $query = $this->applySearch($query, $request, ['tanaman.nama', 'nilai', 'kriteria.nama']);
        $query = $this->applySort($query, $request);
        $perPage = $this->resolvePerPage($request);
        $response = $query->paginate($perPage)->withQueryString();

        $tanaman = Tanaman::all();
        $kriteria = Kriteria::with('subKriteria')->get();

        return Inertia::render('syarat-tanam/index', compact('response', 'tanaman', 'kriteria'));
    }
}

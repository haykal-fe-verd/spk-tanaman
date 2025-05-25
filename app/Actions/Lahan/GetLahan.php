<?php

namespace App\Actions\Lahan;

use App\Models\Kriteria;
use App\Models\Lahan;
use App\Traits\HasSearchAndSort;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class GetLahan
{
    use  HasSearchAndSort;

    /**
     * Initialize the controller's properties.
     *
     * Set the allowed sorts to ['nama', 'created_at', 'updated_at'],
     * the default sort by to 'created_at',
     * the default sort direction to 'desc',
     * and the default per page to 10.
     */
    public function __construct()
    {
        $this->allowedSorts = ['nama', 'created_at', 'updated_at'];
        $this->defaultSortBy = 'created_at';
        $this->defaultSortDir = 'desc';
        $this->defaultPerPage = 6;
    }

    /**
     * Handle the incoming request to get a list of lahan.
     *
     * This method applies search and sort operations on the Lahan model
     * based on the request parameters. It paginates the results and returns
     * an Inertia response to render the 'lahan/index' page.
     *
     * @param Request $request
     * @return Response
     */

    public function handle(Request $request): Response
    {
        $query = Lahan::with([
            'kriteriaLahan.kriteria',
            'kriteriaLahan.subKriteria'

        ])->where('id_user', $request->user()->id);

        $query = $this->applySearch($query, $request, ['nama']);
        $query = $this->applySort($query, $request);
        $perPage = $this->resolvePerPage($request);
        $response = $query->paginate($perPage)->withQueryString();

        $kriteria = Kriteria::with('subKriteria')->get();

        return Inertia::render('lahan/index', compact('response', 'kriteria'));
    }
}

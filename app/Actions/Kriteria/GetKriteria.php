<?php

namespace App\Actions\Kriteria;

use App\Models\Kriteria;
use App\Traits\HasSearchAndSort;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class GetKriteria
{
    use  HasSearchAndSort;

    /**
     * Initialize the controller's properties.
     *
     * Set the allowed sorts to ['nama','tipe', 'bobot','created_at', 'updated_at'],
     * the default sort by to 'created_at',
     * the default sort direction to 'desc',
     * and the default per page to 10.
     */
    public function __construct()
    {
        $this->allowedSorts = ['nama', 'tipe', 'bobot', 'created_at', 'updated_at'];
        $this->defaultSortBy = 'created_at';
        $this->defaultSortDir = 'desc';
        $this->defaultPerPage = 10;
    }

    /**
     * Handle the incoming request to get a list of kriteria.
     *
     * This method applies search and sort operations on the Kriteria model
     * based on the request parameters. It paginates the results and returns
     * an Inertia response to render the 'kriteria/index' page.
     *
     * @param Request $request
     * @return Response
     */

    public function handle(Request $request): Response
    {
        $query = Kriteria::query();

        $query = $this->applySearch($query, $request, ['nama', 'tipe', 'bobot']);
        $query = $this->applySort($query, $request);
        $perPage = $this->resolvePerPage($request);
        $response = $query->paginate($perPage)->withQueryString();

        return Inertia::render('kriteria/index', compact('response'));
    }
}

<?php

namespace App\Actions\Tanaman;

use App\Models\Tanaman;
use App\Traits\HasSearchAndSort;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class GetTanaman
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
        $this->allowedSorts = ['nama', 'deskripsi', 'created_at', 'updated_at'];
        $this->defaultSortBy = 'created_at';
        $this->defaultSortDir = 'desc';
        $this->defaultPerPage = 10;
    }

    /**
     * Handle the incoming request to get a list of tanaman.
     *
     * This method applies search and sort operations on the Tanaman model
     * based on the request parameters. It paginates the results and returns
     * an Inertia response to render the 'tanaman/index' page.
     *
     * @param Request $request
     * @return Response
     */

    public function handle(Request $request): Response
    {
        $query = Tanaman::query();

        $query = $this->applySearch($query, $request, ['nama']);
        $query = $this->applySort($query, $request);
        $perPage = $this->resolvePerPage($request);
        $response = $query->paginate($perPage)->withQueryString();

        return Inertia::render('tanaman/index', compact('response'));
    }
}

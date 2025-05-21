<?php

namespace App\Http\Controllers;

use App\Actions\Kriteria\DestroyKriteria;
use App\Actions\Kriteria\DestroyMultipleKriteria;
use App\Actions\Kriteria\GetKriteria;
use App\Actions\Kriteria\StoreKriteria;
use App\Actions\Kriteria\UpdateKriteria;
use App\Http\Requests\Kriteria\StoreKriteriaRequest;
use App\Http\Requests\Kriteria\UpdateKriteriaRequest;
use App\Models\Kriteria;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Response;

class KriteriaController extends Controller
{
    /**
     * Show the list of kriteria.
     *
     * This method will filter the data based on the search query and the sort
     * query. It will then return the paginated response.
     *
     * @param Request $request
     * @return Response
     */
    public function index(Request $request): Response
    {
        return (new GetKriteria())->handle($request);
    }

    /**
     * Store a newly created kriteria in storage.
     *
     * Validates the request using the StoreKriteriaRequest rules.
     * Creates a new Kriteria instance with the validated data.
     * Redirects back to the index page with a success message.
     *
     * @param StoreKriteriaRequest $request
     * @return RedirectResponse
     */
    public function store(StoreKriteriaRequest $request): RedirectResponse
    {
        return (new StoreKriteria())->handle($request);
    }

    /**
     * Update the specified kriteria in storage.
     *
     * Validates the request using the UpdateKriteriaRequest rules.
     * Updates the specified Kriteria instance with the validated data.
     * Redirects back to the index page with a success message.
     *
     * @param UpdateKriteriaRequest $request
     * @param Kriteria $kriteria
     * @return RedirectResponse
     */
    public function update(UpdateKriteriaRequest $request, Kriteria $kriteria): RedirectResponse
    {
        return (new UpdateKriteria())->handle($request, $kriteria);
    }

    /**
     * Remove the specified kriteria from storage.
     *
     * Deletes the given Kriteria instance.
     * Redirects back to the previous page with a success message.
     *
     * @param Kriteria $kriteria
     * @return RedirectResponse
     */
    public function destroy(Kriteria $kriteria): RedirectResponse
    {
        return (new DestroyKriteria())->handle($kriteria);
    }

    /**
     * Remove multiple kriteria from storage.
     *
     * Deletes multiple Kriteria instances specified by the given ids.
     * Redirects back to the previous page with a success message.
     *
     * @param Request $request
     * @return RedirectResponse
     */
    public function destroy_multiple(Request $request): RedirectResponse
    {
        return (new DestroyMultipleKriteria())->handle($request);
    }
}

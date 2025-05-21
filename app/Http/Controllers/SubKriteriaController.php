<?php

namespace App\Http\Controllers;

use App\Actions\SubKriteria\DestroyMultipleSubKriteria;
use App\Actions\SubKriteria\DestroySubKriteria;
use App\Actions\SubKriteria\GetSubKriteria;
use App\Actions\SubKriteria\StoreSubKriteria;
use App\Actions\SubKriteria\UpdateSubKriteria;
use App\Http\Requests\SubKriteria\StoreSubKriteriaRequest;
use App\Http\Requests\SubKriteria\UpdateSubKriteriaRequest;
use App\Models\SubKriteria;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;

class SubKriteriaController extends Controller
{
    /**
     * Show the list of subkriteria.
     *
     * This method will filter the data based on the search query and the sort
     * query. It will then return the paginated response.
     *
     * @param Request $request
     * @return Response
     */
    public function index(Request $request): Response
    {
        return (new GetSubKriteria())->handle($request);
    }

    /**
     * Store a newly created subkriteria in storage.
     *
     * Validates the request using the StoreSubKriteriaRequest rules.
     * Creates a new SubKriteria instance with the validated data.
     * Redirects back to the index page with a success message.
     *
     * @param StoreSubKriteriaRequest $request
     * @return RedirectResponse
     */
    public function store(StoreSubKriteriaRequest $request): RedirectResponse
    {
        return (new StoreSubKriteria())->handle($request);
    }

    /**
     * Update the specified subkriteria in storage.
     *
     * Validates the request using the UpdateSubKriteriaRequest rules.
     * Updates the specified SubKriteria instance with the validated data.
     * Redirects back to the index page with a success message.
     *
     * @param UpdateSubKriteriaRequest $request
     * @param SubKriteria $subkriteria
     * @return RedirectResponse
     */
    public function update(UpdateSubKriteriaRequest $request, SubKriteria $subkriteria): RedirectResponse
    {
        return (new UpdateSubKriteria())->handle($request, $subkriteria);
    }

    /**
     * Remove the specified subkriteria from storage.
     *
     * Deletes the given SubKriteria instance.
     * Redirects back to the previous page with a success message.
     *
     * @param SubKriteria $subkriteria
     * @return RedirectResponse
     */
    public function destroy(SubKriteria $subkriteria): RedirectResponse
    {
        return (new DestroySubKriteria())->handle($subkriteria);
    }

    /**
     * Remove multiple subkriteria from storage.
     *
     * Deletes multiple SubKriteria instances specified by the given ids.
     * Redirects back to the previous page with a success message.
     *
     * @param Request $request
     * @return RedirectResponse
     */
    public function destroy_multiple(Request $request): RedirectResponse
    {
        return (new DestroyMultipleSubKriteria())->handle($request);
    }
}

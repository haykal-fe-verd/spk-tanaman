<?php

namespace App\Http\Controllers;

use App\Actions\SyaratTanam\DestroyMultipleSyaratTanam;
use App\Actions\SyaratTanam\DestroySyaratTanam;
use App\Actions\SyaratTanam\GetSyaratTanam;
use App\Actions\SyaratTanam\StoreSyaratTanam;
use App\Actions\SyaratTanam\UpdateSyaratTanam;
use App\Http\Requests\SyaratTanam\StoreSyaratTanamRequest;
use App\Http\Requests\SyaratTanam\UpdateSyaratTanamRequest;
use App\Models\SyaratTanam;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;

class SyaratTanamController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * Handles the incoming request to list syarat tanam records with optional
     * search and sort functionality applied.
     *
     * @param Request $request The incoming request instance
     * @return Response The Inertia response containing the syarat tanam data
     */
    public function index(Request $request): Response
    {
        return (new GetSyaratTanam())->handle($request);
    }

    /**
     * Store a newly created resource in storage.
     *
     * Validates the request using the StoreSyaratTanamRequest rules.
     * Creates a new SyaratTanam instance with the validated data.
     * Redirects back to the index page with a success message.
     *
     * @param StoreSyaratTanamRequest $request
     * @return RedirectResponse
     */
    public function store(StoreSyaratTanamRequest $request): RedirectResponse
    {
        return (new StoreSyaratTanam())->handle($request);
    }

    /**
     * Update the specified resource in storage.
     *
     * Validates the request using the UpdateSyaratTanamRequest rules.
     * Updates the specified SyaratTanam instance with the validated data.
     * Redirects back to the index page with a success message.
     *
     * @param UpdateSyaratTanamRequest $request
     * @param SyaratTanam $syarattanam
     * @return RedirectResponse
     */
    public function update(UpdateSyaratTanamRequest $request, SyaratTanam $syarattanam): RedirectResponse
    {
        return (new UpdateSyaratTanam())->handle($request, $syarattanam);
    }

    /**
     * Remove the specified syarat tanam from storage.
     *
     * Deletes the given SyaratTanam instance.
     * Redirects back to the previous page with a success message.
     *
     * @param SyaratTanam $syarattanam The syarat tanam instance to be deleted
     * @return RedirectResponse
     */

    public function destroy(SyaratTanam $syarattanam): RedirectResponse
    {
        return (new DestroySyaratTanam())->handle($syarattanam);
    }

    /**
     * Remove multiple syarat tanam from storage.
     *
     * Deletes multiple SyaratTanam instances specified by the given ids.
     * Redirects back to the previous page with a success message.
     *
     * @param Request $request
     * @return RedirectResponse
     */
    public function destroy_multiple(Request $request): RedirectResponse
    {
        return (new DestroyMultipleSyaratTanam())->handle($request);
    }
}

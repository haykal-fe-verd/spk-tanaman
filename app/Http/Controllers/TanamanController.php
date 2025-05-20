<?php

namespace App\Http\Controllers;

use App\Actions\Tanaman\DestroyMultipleTanaman;
use App\Actions\Tanaman\DestroyTanaman;
use App\Actions\Tanaman\GetTanaman;
use App\Actions\Tanaman\StoreTanaman;
use App\Actions\Tanaman\UpdateTanaman;
use App\Http\Requests\Tanaman\StoreTanamanRequest;
use App\Http\Requests\Tanaman\UpdateTanamanRequest;
use App\Models\Tanaman;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;

class TanamanController extends Controller
{
    /**
     * Show the list of tanaman.
     *
     * This method will filter the data based on the search query and the sort
     * query. It will then return the paginated response.
     *
     * @param Request $request
     * @return Response
     */
    public function index(Request $request): Response
    {
        return (new GetTanaman())->handle($request);
    }

    /**
     * Store a newly created tanaman in storage.
     *
     * Validates the request using the StoreTanamanRequest rules.
     * Creates a new Tanaman instance with the validated data.
     * Redirects back to the index page with a success message.
     *
     * @param StoreTanamanRequest $request
     * @return RedirectResponse
     */
    public function store(StoreTanamanRequest $request): RedirectResponse
    {
        return (new StoreTanaman())->handle($request);
    }

    /**
     * Update the specified tanaman in storage.
     *
     * Validates the request using the UpdateTanamanRequest rules.
     * Updates the specified Tanaman instance with the validated data.
     * Redirects back to the index page with a success message.
     *
     * @param UpdateTanamanRequest $request
     * @param Tanaman $tanaman
     * @return RedirectResponse
     */
    public function update(UpdateTanamanRequest $request, Tanaman $tanaman): RedirectResponse
    {
        return (new UpdateTanaman())->handle($request, $tanaman);
    }

    /**
     * Remove the specified tanaman from storage.
     *
     * Deletes the given Tanaman instance.
     * Redirects back to the previous page with a success message.
     *
     * @param Tanaman $tanaman
     * @return RedirectResponse
     */

    public function destroy(Tanaman $tanaman): RedirectResponse
    {
        return (new DestroyTanaman())->handle($tanaman);
    }

    public function destroy_multiple(Request $request): RedirectResponse
    {
        return (new DestroyMultipleTanaman())->handle($request);
    }
}

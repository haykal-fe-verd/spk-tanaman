<?php

namespace App\Http\Controllers;

use App\Actions\RiwayatTanam\DestroyRiwayatTanam;
use App\Actions\RiwayatTanam\StoreRiwayatTanam;
use App\Actions\RiwayatTanam\UpdateRiwayatTanam;
use App\Http\Requests\RiwayatTanam\StoreRiwayatTanamRequest;
use App\Http\Requests\RiwayatTanam\UpdateRiwayatTanamRequest;
use App\Models\RiwayatTanam;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class RiwayatTanamController extends Controller
{
    /**
     * Store a newly created riwayat tanam in storage.
     *
     * Validates the request using the StoreRiwayatTanamRequest rules.
     * Creates a new RiwayatTanam instance with the validated data.
     * Redirects back to the index page with a success message.
     *
     * @param StoreRiwayatTanamRequest $request
     * @return RedirectResponse
     */
    public function store(StoreRiwayatTanamRequest $request): RedirectResponse
    {
        return (new StoreRiwayatTanam())->handle($request);
    }

    /**
     * Update the specified riwayat tanam in storage.
     *
     * Validates the request using the UpdateRiwayatTanamRequest rules.
     * Updates the specified RiwayatTanam instance with the validated data.
     * Redirects back to the index page with a success message.
     *
     * @param UpdateRiwayatTanamRequest $request
     * @param RiwayatTanam $riwayattanam
     * @return RedirectResponse
     */
    public function update(UpdateRiwayatTanamRequest $request, RiwayatTanam $riwayattanam): RedirectResponse
    {
        return (new UpdateRiwayatTanam())->handle($request, $riwayattanam);
    }

    /**
     * Remove the specified riwayat tanam from storage.
     *
     * Deletes the given RiwayatTanam instance.
     * Redirects back to the previous page with a success message.
     *
     * @param RiwayatTanam $riwayattanam
     * @return RedirectResponse
     */
    public function destroy(RiwayatTanam $riwayattanam): RedirectResponse
    {
        return (new DestroyRiwayatTanam())->handle($riwayattanam);
    }
}

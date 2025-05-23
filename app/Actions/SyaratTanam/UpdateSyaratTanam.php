<?php

namespace App\Actions\SyaratTanam;

use App\Http\Requests\SyaratTanam\UpdateSyaratTanamRequest;
use App\Models\SyaratTanam;
use Illuminate\Http\RedirectResponse;

class UpdateSyaratTanam
{
    /**
     * Handle an incoming request to update a syarat tanam.
     *
     * Validates the request using the UpdateSyaratTanamRequest rules.
     * Updates the specified SyaratTanam instance with the validated data.
     * Redirects back to the index page with a success message.
     *
     * @param UpdateSyaratTanamRequest $request
     * @param Tanaman $tanaman
     * @return RedirectResponse
     */
    public function handle(UpdateSyaratTanamRequest $request,  SyaratTanam $syarattanam): RedirectResponse
    {
        $syarattanam->update($request->validated());

        return back()->with('success', 'Syarat tanam berhasil diperbarui');
    }
}

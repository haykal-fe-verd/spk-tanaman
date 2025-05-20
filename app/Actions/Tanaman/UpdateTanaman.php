<?php

namespace App\Actions\Tanaman;

use App\Http\Requests\Tanaman\UpdateTanamanRequest;
use App\Models\Tanaman;
use Illuminate\Http\RedirectResponse;

class UpdateTanaman
{
    /**
     * Handle an incoming request to update a tanaman.
     *
     * Validates the request using the UpdateTanamanRequest rules.
     * Updates the specified Tanaman instance with the validated data.
     * Redirects back to the index page with a success message.
     *
     * @param UpdateTanamanRequest $request
     * @param Tanaman $tanaman
     * @return RedirectResponse
     */
    public function handle(UpdateTanamanRequest $request, Tanaman $tanaman): RedirectResponse
    {
        $tanaman->update($request->validated());

        return back()->with('success', 'Tanaman berhasil diperbarui');
    }
}

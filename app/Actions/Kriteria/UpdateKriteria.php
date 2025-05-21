<?php

namespace App\Actions\Kriteria;

use App\Http\Requests\Kriteria\UpdateKriteriaRequest;
use App\Models\Kriteria;
use Illuminate\Http\RedirectResponse;

class UpdateKriteria
{
    /**
     * Handle an incoming request to update a kriteria.
     *
     * Validates the request using the UpdateKriteriaRequest rules.
     * Updates the specified Kriteria instance with the validated data.
     * Redirects back to the index page with a success message.
     *
     * @param UpdateKriteriaRequest $request
     * @param Kriteria $kriteria
     * @return RedirectResponse
     */
    public function handle(UpdateKriteriaRequest $request, Kriteria $kriteria): RedirectResponse
    {
        $kriteria->update($request->validated());

        return back()->with('success', 'Kriteria berhasil diperbarui');
    }
}

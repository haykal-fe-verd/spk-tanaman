<?php

namespace App\Actions\SubKriteria;

use App\Http\Requests\SubKriteria\UpdateSubKriteriaRequest;
use App\Models\SubKriteria;
use Illuminate\Http\RedirectResponse;

class UpdateSubKriteria
{
    /**
     * Handle an incoming request to update a subkriteria.
     *
     * Validates the request using the UpdateSubKriteriaRequest rules.
     * Updates the specified SubKriteria instance with the validated data.
     * Redirects back to the index page with a success message.
     *
     * @param UpdateSubKriteriaRequest $request
     * @param  SubKriteria $subkriteria
     * @return RedirectResponse
     */
    public function handle(UpdateSubKriteriaRequest $request, SubKriteria $subkriteria): RedirectResponse
    {
        $subkriteria->update($request->validated());

        return back()->with('success', 'Sub Kriteria berhasil diperbarui');
    }
}

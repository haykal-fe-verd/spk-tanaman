<?php

namespace App\Actions\SubKriteria;

use App\Http\Requests\SubKriteria\StoreSubKriteriaRequest;
use App\Models\SubKriteria;
use Illuminate\Http\RedirectResponse;

class StoreSubKriteria
{
    /**
     * Handle the incoming request to store a new subkriteria.
     *
     * Validates the request data using the StoreSubKriteriaRequest rules,
     * creates a new SubKriteria instance with the validated data, and
     * redirects back with a success message upon completion.
     *
     * @param StoreSubKriteriaRequest $request The incoming request instance.
     * @return RedirectResponse The response after storing the new subkriteria.
     */
    public function handle(StoreSubKriteriaRequest $request): RedirectResponse
    {
        SubKriteria::create($request->validated());

        return back()->with('success', 'Sub Kriteria berhasil ditambahkan');
    }
}

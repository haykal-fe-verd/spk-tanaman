<?php

namespace App\Actions\Kriteria;

use App\Http\Requests\Kriteria\StoreKriteriaRequest;
use App\Models\Kriteria;
use Illuminate\Http\RedirectResponse;

class StoreKriteria
{
    /**
     * Handle the incoming request to store a new kriteria.
     *
     * Validates the request data using the StoreKriteriaRequest rules,
     * creates a new Kriteria instance with the validated data, and
     * redirects back with a success message upon completion.
     *
     * @param StoreKriteriaRequest $request The incoming request instance.
     * @return RedirectResponse The response after storing the new kriteria.
     */
    public function handle(StoreKriteriaRequest $request): RedirectResponse
    {
        Kriteria::create($request->validated());

        return back()->with('success', 'Kriteria berhasil ditambahkan');
    }
}

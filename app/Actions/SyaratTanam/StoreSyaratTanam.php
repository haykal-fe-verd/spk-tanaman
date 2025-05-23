<?php

namespace App\Actions\SyaratTanam;

use App\Http\Requests\SyaratTanam\StoreSyaratTanamRequest;
use App\Models\SyaratTanam;
use Illuminate\Http\RedirectResponse;

class StoreSyaratTanam
{
    /**
     * Handle the incoming request to store a new syarat tanam.
     *
     * Validates the request data using the StoreTanamanRequest rules,
     * creates a new SyaratTanam instance with the validated data, and
     * redirects back with a success message upon completion.
     *
     * @param StoreSyaratTanamRequest $request The incoming request instance.
     * @return RedirectResponse The response after storing the new syarat tanam.
     */

    public function handle(StoreSyaratTanamRequest $request): RedirectResponse
    {
        SyaratTanam::create($request->validated());

        return back()->with('success', 'Syarat tanam berhasil ditambahkan');
    }
}

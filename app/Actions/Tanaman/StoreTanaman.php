<?php

namespace App\Actions\Tanaman;

use App\Http\Requests\Tanaman\StoreTanamanRequest;
use App\Models\Tanaman;
use Illuminate\Http\RedirectResponse;

class StoreTanaman
{
    /**
     * Handle the incoming request to store a new tanaman.
     *
     * Validates the request data using the StoreTanamanRequest rules,
     * creates a new Tanaman instance with the validated data, and
     * redirects back with a success message upon completion.
     *
     * @param StoreTanamanRequest $request The incoming request instance.
     * @return RedirectResponse The response after storing the new tanaman.
     */

    public function handle(StoreTanamanRequest $request): RedirectResponse
    {
        Tanaman::create($request->validated());

        return back()->with('success', 'Tanaman berhasil ditambahkan');
    }
}

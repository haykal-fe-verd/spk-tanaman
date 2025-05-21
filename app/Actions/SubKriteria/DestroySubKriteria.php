<?php

namespace App\Actions\SubKriteria;

use App\Models\SubKriteria;
use Illuminate\Http\RedirectResponse;

class DestroySubKriteria
{
    /**
     * Delete a subkriteria
     *
     * @param SubKriteria $subkriteria the subkriteria that will be deleted
     * @return RedirectResponse back to the previous page with success message
     */
    public function handle(SubKriteria $subkriteria): RedirectResponse
    {
        $subkriteria->delete();

        return back()->with('success', 'Sub Kriteria berhasil dihapus');
    }
}

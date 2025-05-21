<?php

namespace App\Actions\Kriteria;

use App\Models\Kriteria;
use Illuminate\Http\RedirectResponse;

class DestroyKriteria
{
    /**
     * Delete a kriteria
     *
     * @param Kriteria $kriteria the kriteria that will be deleted
     * @return RedirectResponse back to the previous page with success message
     */
    public function handle(Kriteria $kriteria): RedirectResponse
    {
        $kriteria->delete();

        return back()->with('success', 'Kriteria berhasil dihapus');
    }
}

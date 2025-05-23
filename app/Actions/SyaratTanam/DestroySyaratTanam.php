<?php

namespace App\Actions\SyaratTanam;

use App\Models\SyaratTanam;
use Illuminate\Http\RedirectResponse;

class DestroySyaratTanam
{
    /**
     * Delete a syarat tanam
     *
     * @param SyaratTanam $syarattanam the syarat tanam that will be deleted
     * @return RedirectResponse back to the previous page with success message
     */
    public function handle(SyaratTanam $syarattanam): RedirectResponse
    {
        $syarattanam->delete();

        return back()->with('success', 'Syarat Tanam berhasil dihapus');
    }
}

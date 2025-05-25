<?php

namespace App\Actions\RiwayatTanam;

use App\Models\RiwayatTanam;
use Illuminate\Http\RedirectResponse;

class DestroyRiwayatTanam
{
    /**
     * Delete a riwayat tanam
     *
     * @param RiwayatTanam $riwayattanam the riwayat tanam that will be deleted
     * @return RedirectResponse back to the previous page with success message
     */
    public function handle(RiwayatTanam $riwayattanam): RedirectResponse
    {
        $riwayattanam->delete();

        return back()->with('success', 'Riwayat tanam berhasil dihapus');
    }
}

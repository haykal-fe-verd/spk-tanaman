<?php

namespace App\Actions\Tanaman;

use App\Models\Tanaman;
use Illuminate\Http\RedirectResponse;

class DestroyTanaman
{
    /**
     * Delete a tanaman
     *
     * @param Tanaman $tanaman the tanaman that will be deleted
     * @return RedirectResponse back to the previous page with success message
     */
    public function handle(Tanaman $tanaman): RedirectResponse
    {
        $tanaman->delete();

        return back()->with('success', 'Tanaman berhasil dihapus');
    }
}

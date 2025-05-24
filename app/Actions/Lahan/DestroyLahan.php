<?php

namespace App\Actions\Lahan;

use App\Models\Lahan;
use Illuminate\Http\RedirectResponse;

class DestroyLahan
{
    /**
     * Delete a lahan
     *
     * @param Lahan $lahan the lahan that will be deleted
     * @return RedirectResponse back to the previous page with success message
     */
    public function handle(Lahan $lahan): RedirectResponse
    {
        $lahan->delete();

        return back()->with('success', 'Lahan berhasil dihapus');
    }
}

<?php

namespace App\Actions\SubKriteria;

use App\Models\SubKriteria;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DestroyMultipleSubKriteria
{
    /**
     * Delete multiple subkriteria by ids.
     *
     * If the request input 'ids' is not an array or empty, return back with error message.
     * Otherwise, begin a database transaction, delete the subkriteria with the given ids,
     * commit the transaction, and return back with success message.
     * If any errors occur, rollback the transaction, and return back with error message.
     *
     * @param Request $request
     * @return RedirectResponse
     */
    public function handle(Request $request): RedirectResponse
    {
        $ids = $request->input('ids');

        if (!is_array($ids) || empty($ids)) {
            return back()->with('error', 'Tidak ada data yang dipilih untuk dihapus.');
        }

        try {
            DB::beginTransaction();

            SubKriteria::whereIn('id', $ids)->delete();

            DB::commit();
            return back()->with('success', 'Data berhasil dihapus.');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->with('error', 'Gagal menghapus data.');
        }
    }
}

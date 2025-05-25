<?php

namespace App\Actions\RiwayatTanam;

use App\Http\Requests\RiwayatTanam\UpdateRiwayatTanamRequest;
use App\Models\KriteriaRiwayatTanam;
use App\Models\RiwayatTanam;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;

class UpdateRiwayatTanam
{
    /**
     * Handle an incoming request to update a riwayat tanam.
     *
     * Validates the request using the UpdateRiwayatTanamRequest rules.
     * Updates the specified RiwayatTanam instance with the validated data.
     * Redirects back to the index page with a success message.
     *
     * @param UpdateRiwayatTanamRequest $request
     * @param RiwayatTanam $riwayattanam
     * @return RedirectResponse
     */
    public function handle(UpdateRiwayatTanamRequest $request, RiwayatTanam $riwayattanam): RedirectResponse
    {
        try {
            DB::beginTransaction();

            $riwayattanam->update([
                'id_lahan' => $request->input('id_lahan'),
                'id_tanaman' => $request->input('id_tanaman'),
                'tanggal_tanam' => $request->input('tanggal_tanam'),
                'tanggal_panen' => $request->input('tanggal_panen'),
                'tanggal_istirahat' => $request->input('tanggal_istirahat'),
            ]);

            KriteriaRiwayatTanam::where('id_riwayat_tanam', $riwayattanam->id)->delete();
            $kriteriaInput = $request->input('kriteria', []);

            foreach ($kriteriaInput as $item) {
                KriteriaRiwayatTanam::create([
                    'id_riwayat_tanam' => $riwayattanam->id,
                    'id_kriteria' => $item['id_kriteria'],
                    'id_sub_kriteria' => $item['id_sub_kriteria'],
                ]);
            }

            DB::commit();
            return back()->with('success', 'Riwayat tanam berhasil diperbarui.');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->with('error', 'Gagal memperbarui riwayat tanam.');
        }
    }
}

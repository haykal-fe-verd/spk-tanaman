<?php

namespace App\Actions\Lahan;

use App\Http\Requests\Lahan\UpdateLahanRequest;
use App\Models\KriteriaLahan;
use App\Models\Lahan;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;

class UpdateLahan
{
    /**
     * Handle the update of an existing lahan.
     *
     * @param UpdateLahanRequest $request
     * @param Lahan $lahan
     * @return RedirectResponse
     */
    public function handle(UpdateLahanRequest $request, Lahan $lahan): RedirectResponse
    {
        try {
            DB::beginTransaction();

            $lahan->update([
                'nama' => $request->input('nama'),
                'lokasi' => $request->input('lokasi'),
                'luas' => $request->input('luas'),
            ]);

            KriteriaLahan::where('id_lahan', $lahan->id)->delete();

            $kriteriaInput = $request->input('kriteria', []);
            foreach ($kriteriaInput as $item) {
                KriteriaLahan::create([
                    'id_lahan' => $lahan->id,
                    'id_kriteria' => $item['id_kriteria'],
                    'id_sub_kriteria' => $item['id_sub_kriteria'],
                ]);
            }

            DB::commit();
            return back()->with('success', 'Lahan berhasil diperbarui.');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->with('error', 'Lahan gagal diperbarui.');
        }
    }
}

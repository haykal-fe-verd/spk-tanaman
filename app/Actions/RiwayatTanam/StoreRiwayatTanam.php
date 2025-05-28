<?php

namespace App\Actions\RiwayatTanam;

use App\Http\Requests\RiwayatTanam\StoreRiwayatTanamRequest;
use App\Models\KriteriaRiwayatTanam;
use App\Models\RiwayatTanam;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class StoreRiwayatTanam
{
    /**
     * Handle the incoming request to store a new riwayat tanam.
     *
     * Validates the request data using the StoreRiwayatTanamRequest rules,
     * creates a new RiwayatTanam instance with the validated data, and
     * redirects back with a success message upon completion.
     *
     * @param StoreRiwayatTanamRequest $request The incoming request instance.
     * @return RedirectResponse The response after storing the new riwayat tanam.
     */

    public function handle(StoreRiwayatTanamRequest $request): RedirectResponse
    {
        try {
            DB::beginTransaction();

            $riwayat = RiwayatTanam::create([
                'id_lahan' => $request->input('id_lahan'),
                'id_tanaman' => $request->input('id_tanaman'),
                'tanggal_tanam' => Carbon::parse($request->input('tanggal_tanam'))->format('Y-m-d'),
                'tanggal_panen' => Carbon::parse($request->input('tanggal_panen'))->format('Y-m-d'),
                'tanggal_istirahat' => Carbon::parse($request->input('tanggal_istirahat'))->format('Y-m-d'),
            ]);

            $kriteriaInput = $request->input('kriteria', []);

            foreach ($kriteriaInput as $item) {
                KriteriaRiwayatTanam::create([
                    'id_riwayat_tanam' => $riwayat->id,
                    'id_kriteria' => $item['id_kriteria'],
                    'id_sub_kriteria' => $item['id_sub_kriteria'],
                ]);
            }


            DB::commit();
            return back()->with('success', 'Riwayat tanam berhasil ditambahkan.');
        } catch (\Exception $e) {
            DB::rollBack();

            return back()->with('error', 'Riwayat tanam gagal ditambahkan.');
        }
    }
}

<?php

namespace App\Actions\Lahan;

use App\Http\Requests\Lahan\StoreLahanRequest;
use App\Models\KriteriaLahan;
use App\Models\Lahan;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;

class StoreLahan
{
    /**
     * Handle the incoming request to store a new lahan.
     *
     * Validates the request data using the StoreLahanRequest rules,
     * creates a new Lahan instance with the validated data, and
     * redirects back with a success message upon completion.
     *
     * @param StoreLahanRequest $request The incoming request instance.
     * @return RedirectResponse The response after storing the new lahan.
     */

    public function handle(StoreLahanRequest $request): RedirectResponse
    {
        try {
            DB::beginTransaction();

            $lahan = Lahan::create([
                'id_user' => $request->user()->id,
                'nama' => $request->input('nama'),
                'lokasi' => $request->input('lokasi'),
                'luas' => $request->input('luas'),
            ]);

            $kriteriaInput = $request->input('kriteria', []);

            foreach ($kriteriaInput as $item) {
                KriteriaLahan::create([
                    'id_lahan' => $lahan->id,
                    'id_kriteria' => $item['id_kriteria'],
                    'id_sub_kriteria' => $item['id_sub_kriteria'],
                ]);
            }

            DB::commit();
            return back()->with('success', 'Lahan berhasil ditambahkan.');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->with('error', 'Lahan gagal ditambahkan.');
        }
    }
}

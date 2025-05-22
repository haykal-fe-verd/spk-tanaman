<?php

namespace App\Actions\NilaiPerbandingan;

use App\Http\Requests\NilaiPerbandingan\StoreNilaiPerbandinganRequest;
use App\Models\NilaiPerbandingan;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;

class StoreNilaiPerbandingan
{
    /**
     * Handle the incoming request to store a new nilai perbandingan.
     *
     * Validates the request data using the StoreNilaiPerbandinganRequest rules,
     * creates a new NilaiPerbandingan instance with the validated data, and
     * redirects back with a success message upon completion.
     *
     * @param StoreNilaiPerbandinganRequest $request The incoming request instance.
     * @return RedirectResponse The response after storing the new nilai perbandingan.
     */
    public function handle(StoreNilaiPerbandinganRequest $request): RedirectResponse
    {
        $data = $request->validated()['perbandingan'];

        try {
            DB::beginTransaction();

            NilaiPerbandingan::truncate();

            foreach ($data as $item) {
                NilaiPerbandingan::create([
                    'id_kriteria_1' => $item['id_kriteria_1'],
                    'id_kriteria_2' => $item['id_kriteria_2'],
                    'nilai'         => $item['nilai'],
                ]);
            }

            DB::commit();

            return back()->with('success', 'Nilai perbandingan berhasil disimpan.');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->with('error', 'Terjadi kesalahan saat menyimpan nilai perbandingan.');
        }
    }
}

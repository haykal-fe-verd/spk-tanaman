<?php

namespace App\Http\Controllers;

use App\Actions\Lahan\DestroyLahan;
use App\Actions\Lahan\GetLahan;
use App\Actions\Lahan\StoreLahan;
use App\Actions\Lahan\UpdateLahan;
use App\Http\Requests\Lahan\StoreLahanRequest;
use App\Http\Requests\Lahan\UpdateLahanRequest;
use App\Models\Lahan;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class LahanController extends Controller
{
    /**
     * Menampilkan halaman data lahan.
     *
     * @param Request $request
     * @return Response
     */
    public function index(Request $request): Response
    {
        return (new GetLahan())->handle($request);
    }

    /**
     * Menyimpan data lahan yang baru.
     *
     * @param StoreLahanRequest $request
     * @return RedirectResponse
     */
    public function store(StoreLahanRequest $request): RedirectResponse
    {
        return (new StoreLahan())->handle($request);
    }

    /**
     * Mengupdate data lahan yang sudah ada.
     *
     * @param UpdateLahanRequest $request
     * @param Lahan $lahan
     * @return RedirectResponse
     */
    public function update(UpdateLahanRequest $request, Lahan $lahan): RedirectResponse
    {
        return (new UpdateLahan())->handle($request, $lahan);
    }

    /**
     * Menghapus data lahan yang sudah ada.
     *
     * @param Lahan $lahan data lahan yang akan dihapus
     * @return RedirectResponse redirect ke halaman sebelumnya dengan pesan sukses
     */
    public function destroy(Lahan $lahan): RedirectResponse
    {
        return (new DestroyLahan())->handle($lahan);
    }
}

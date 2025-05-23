<?php

namespace App\Http\Controllers;

use App\Actions\SyaratTanam\DestroyMultipleSyaratTanam;
use App\Actions\SyaratTanam\DestroySyaratTanam;
use App\Actions\SyaratTanam\GetSyaratTanam;
use App\Actions\SyaratTanam\StoreSyaratTanam;
use App\Actions\SyaratTanam\UpdateSyaratTanam;
use App\Http\Requests\SyaratTanam\StoreSyaratTanamRequest;
use App\Http\Requests\SyaratTanam\UpdateSyaratTanamRequest;
use App\Models\SyaratTanam;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;

class SyaratTanamController extends Controller
{
    public function index(Request $request): Response
    {
        return (new GetSyaratTanam())->handle($request);
    }

    public function store(StoreSyaratTanamRequest $request): RedirectResponse
    {
        return (new StoreSyaratTanam())->handle($request);
    }

    public function update(UpdateSyaratTanamRequest $request, SyaratTanam $syarattanam): RedirectResponse
    {
        return (new UpdateSyaratTanam())->handle($request, $syarattanam);
    }

    public function destroy(SyaratTanam $syarattanam): RedirectResponse
    {
        return (new DestroySyaratTanam())->handle($syarattanam);
    }

    public function destroy_multiple(Request $request): RedirectResponse
    {
        return (new DestroyMultipleSyaratTanam())->handle($request);
    }
}

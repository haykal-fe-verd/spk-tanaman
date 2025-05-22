<?php

namespace App\Http\Controllers;

use App\Actions\NilaiPerbandingan\GetNilaiPerbandingan;
use App\Actions\NilaiPerbandingan\StoreNilaiPerbandingan;
use App\Http\Requests\NilaiPerbandingan\StoreNilaiPerbandinganRequest;
use Illuminate\Http\Request;

class NilaiPerbandinganController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Inertia\Response
     */
    public function index(Request $request)
    {
        return (new GetNilaiPerbandingan())->handle($request);
    }

    /**
     * Store a newly created resource in storage.
     *
     * Validates the request using the StoreNilaiPerbandinganRequest rules.
     * Creates a new NilaiPerbandingan instance with the validated data.
     * Redirects back to the index page with a success message.
     *
     * @param StoreNilaiPerbandinganRequest $request
     * @return RedirectResponse
     */
    public function store(StoreNilaiPerbandinganRequest $request)
    {
        return (new StoreNilaiPerbandingan())->handle($request);
    }
}

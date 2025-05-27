<?php

namespace App\Http\Controllers;

use App\Actions\Dashboard\Dashboard;
use Inertia\Response;
use Illuminate\Http\Request;


class DashboardController extends Controller
{
    /**
     * Display the dashboard for the authenticated user.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Inertia\Response
     */
    public function index(Request $request): Response
    {
        return (new Dashboard())->handle($request);
    }
}

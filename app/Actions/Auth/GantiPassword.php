<?php

namespace App\Actions\Auth;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class GantiPassword
{
    public function execute(Request $request): Response
    {
        $role = $request->user()->role;

        if ($role === 'admin') {
            return Inertia::render('auth/ganti-password/admin');
        }

        return Inertia::render('auth/ganti-password/user');
    }
}

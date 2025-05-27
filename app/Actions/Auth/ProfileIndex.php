<?php

namespace App\Actions\Auth;

use App\Helpers\Helpers;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Contracts\Auth\MustVerifyEmail;

class ProfileIndex
{
    /**
     * Get the authenticated user profile.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Inertia\Response
     */
    public function execute(Request $request): Response
    {
        $helper = new Helpers();

        $status = session('status');
        $mustVerifyEmail = $request->user() instanceof MustVerifyEmail;

        if ($helper->is_admin()) {
            return Inertia::render('auth/profile/admin', compact('mustVerifyEmail', 'status'));
        } else {
            return Inertia::render('auth/profile/user', compact('mustVerifyEmail', 'status'));
        }
    }
}

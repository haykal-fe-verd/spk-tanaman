<?php

namespace App\Actions\Auth;

use Illuminate\Http\Request;

class LoginAction
{
    public function execute(Request $request): void
    {
        $request->authenticate();
        $request->session()->regenerate();
    }
}

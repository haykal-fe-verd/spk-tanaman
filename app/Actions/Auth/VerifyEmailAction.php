<?php

namespace App\Actions\Auth;

use Illuminate\Auth\Events\Verified;
use Illuminate\Foundation\Auth\EmailVerificationRequest;

class VerifyEmailAction
{
    public function execute(EmailVerificationRequest $request): bool
    {
        if ($request->user()->hasVerifiedEmail()) {
            return true;
        }

        if ($request->user()->markEmailAsVerified()) {
            event(new Verified($request->user()));
        }

        return true;
    }
}

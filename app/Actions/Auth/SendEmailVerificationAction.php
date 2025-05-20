<?php

namespace App\Actions\Auth;

use App\Models\User;

class SendEmailVerificationAction
{
    public function execute(User $user): void
    {
        if (!$user->hasVerifiedEmail()) {
            $user->sendEmailVerificationNotification();
        }
    }
}

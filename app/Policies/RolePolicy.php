<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\Response;

class RolePolicy
{

    /**
     * Determine if the given user has an admin role.
     *
     * @param User $user
     * @return bool
     */

    public function isAdmin(User $user): bool
    {
        return $user->role === 'admin';
    }


    /**
     * Determine if the given user has an user role.
     *
     * @param User $user
     * @return bool
     */
    public function isUser(User $user): bool
    {
        return $user->role === 'user';
    }
}

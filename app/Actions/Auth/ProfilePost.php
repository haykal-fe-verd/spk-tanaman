<?php

namespace App\Actions\Auth;

use App\Helpers\Helpers;
use App\Http\Requests\Auth\ProfileUpdateRequest;
use App\Services\FileUploadService;
use App\Traits\ImageUpload;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;

class ProfilePost
{
    use ImageUpload;

    /**
     * Updates the authenticated user's profile information.
     *
     * @param ProfileUpdateRequest $request
     * @return RedirectResponse
     */
    public function execute(ProfileUpdateRequest $request): RedirectResponse
    {
        $user = $request->user();

        if ($request->hasFile('avatar')) {
            $user->avatar = $this->upload($request, 'avatar', 'avatars', $user->avatar);
        }

        $user->fill($request->validated());

        if ($user->isDirty('email')) {
            $user->email_verified_at = null;
        }

        $user->save();

        return Redirect::route('profile.index')->with('status', 'Profile berhasil diperbaharui.');
    }
}

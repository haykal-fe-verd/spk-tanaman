<?php

namespace App\Http\Controllers;

use App\Actions\Auth\{
    LoginAction,
    LogoutAction,
    RegisterAction,
    ConfirmPasswordAction,
    UpdatePasswordAction,
    ForgotPasswordAction,
    GantiPassword,
    ProfileDestroy,
    ProfileIndex,
    ProfilePost,
    ResetPasswordAction,
    VerifyEmailAction,
    SendEmailVerificationAction
};
use App\Http\Requests\Auth\{
    LoginRequest,
    RegisterRequest,
    UpdatePasswordRequest,
    ForgotPasswordRequest,
    ProfileUpdateRequest,
    ResetPasswordRequest
};
use App\Models\User;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Validation\ValidationException;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;


class AuthController extends Controller
{
    //! login
    /**
     * Renders the login page.
     *
     * @return Response
     */
    public function login_index(): Response
    {
        $canResetPassword = Route::has('password.request');
        $status = session('status');

        return Inertia::render('auth/login', compact('canResetPassword', 'status'));
    }

    /**
     * Handles an incoming authentication request.
     *
     * @param LoginRequest $request
     * @return RedirectResponse
     */
    public function login_store(LoginRequest $request, LoginAction $login): RedirectResponse
    {
        $login->execute($request);

        return redirect()->intended(route('dashboard', absolute: false));
    }

    /**
     * Logs the user out of the application.
     *
     * @param Request $request
     * @return RedirectResponse
     */
    public function login_destroy(Request $request, LogoutAction $logout): RedirectResponse
    {
        $logout->execute($request);

        return redirect('/');
    }

    //! register
    /**
     * Show the application registration form.
     *
     * @return Response
     */
    public function register_index(): Response
    {
        return Inertia::render('auth/register');
    }

    /**
     * Handles an incoming registration request.
     *
     * @param RegisterRequest $request
     * @return RedirectResponse
     */
    public function register_store(RegisterRequest $request, RegisterAction $register): RedirectResponse
    {
        $register->execute($request->validated());

        return redirect(route('dashboard', absolute: false));
    }

    //! confirm password
    /**
     * Display the password confirmation view.
     *
     * @return Response
     */

    public function password_confirm_index(): Response
    {
        return Inertia::render('auth/confirm-password');
    }

    /**
     * Handle an incoming password confirmation request.
     *
     * @param Request $request
     * @return RedirectResponse
     *
     * @throws ValidationException
     */
    public function password_confirm_store(Request $request, ConfirmPasswordAction $confirm): RedirectResponse
    {
        $confirm->execute($request);

        return redirect()->intended(route('dashboard', absolute: false));
    }

    //! forgot password
    /**
     * Renders the forgot password page.
     *
     * @return Response
     */
    public function forgot_password_index(): Response
    {
        $status = session('status');

        return Inertia::render('auth/forgot-password', compact('status'));
    }

    /**
     * Handle a request to send a password reset link to the user's email.
     *
     * @param ForgotPasswordRequest $request
     * @return RedirectResponse
     *
     * @throws ValidationException if the email is invalid or the reset link cannot be sent
     */

    public function forgot_password_store(ForgotPasswordRequest $request, ForgotPasswordAction $forgot): RedirectResponse
    {
        $status = $forgot->execute($request->validated('email'));

        return back()->with('status', __($status));
    }

    //! reset password
    /**
     * Display the password reset view.
     *
     * @param Request $request
     * @return Response
     */
    public function reset_password_index(Request $request): Response
    {
        $email = $request->email;
        $token = $request->route('token');

        return Inertia::render('auth/reset-password', compact('email', 'token'));
    }

    /**
     * Handle an incoming new password request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function reset_password_store(ResetPasswordRequest $request, ResetPasswordAction $reset): RedirectResponse
    {
        $status = $reset->execute($request->validated());

        return redirect()->route('login')->with('status', __($status));
    }

    //! email verification
    /**
     * Show the email verification notice.
     *
     * @param Request $request
     * @return RedirectResponse|Response
     */
    public function email_verify_index(Request $request): RedirectResponse|Response
    {
        $status = session('status');

        return $request->user()->hasVerifiedEmail()
            ? redirect()->intended(route('dashboard', absolute: false))
            : Inertia::render('auth/verify-email', compact('status'));
    }

    /**
     * Handle the email verification process.
     *
     * This method checks if the user's email is already verified. If not,
     * it attempts to mark the email as verified and dispatches a Verified event.
     * The user is then redirected to the dashboard with a verification query parameter.
     *
     * @param EmailVerificationRequest $request
     * @return RedirectResponse
     */

    public function email_verify_store(EmailVerificationRequest $request, VerifyEmailAction $verify): RedirectResponse
    {
        $verify->execute($request);

        return redirect()->intended(route('dashboard', absolute: false) . '?verified=1');
    }

    /**
     * Resend the email verification notification.
     *
     * If the user has already verified their email address, we will redirect them
     * to the dashboard with a success message, letting them know that the
     * verification link has already been sent. Otherwise, we will send the
     * verification link again.
     *
     * @param Request $request
     * @return RedirectResponse
     */
    public function email_verify_notification(Request $request, SendEmailVerificationAction $send): RedirectResponse
    {
        if ($request->user()->hasVerifiedEmail()) {
            return redirect()->intended(route('dashboard', absolute: false));
        }

        $send->execute($request->user());

        return back()->with('status', 'verification-link-sent');
    }

    //! update password
    /**
     * Handle an incoming request to update the user's password.
     *
     * @param UpdatePasswordRequest $request
     * @return RedirectResponse
     */
    public function password_update_store(UpdatePasswordRequest $request, UpdatePasswordAction $update): RedirectResponse
    {
        $update->execute($request->user(), $request->validated('password'));

        return back()->with('success', 'Password berhasil diperbarui');
    }

    //! ganti password
    /**
     * Render the password update page.
     *
     * This method renders the password update page where the user can enter
     * their current password, new password, and confirm their new password.
     * It will also display any validation errors as a result of the user's
     * input.
     *
     * @param Request $request
     * @return Response
     */
    public function password_update_index(Request $request): Response
    {
        return (new GantiPassword())->execute($request);
    }

    //! profile
    /**
     * Display the authenticated user's profile.
     *
     * This method will determine which profile to display based on the user's
     * role. If the user is an admin, it will display the admin profile. If the
     * user is not an admin, it will display the user profile.
     *
     * @param Request $request
     * @return Response
     */
    public function profile_index(Request $request): Response
    {
        return (new ProfileIndex())->execute($request);
    }

    /**
     * Updates the authenticated user's profile information.
     *
     * This method will update the user's profile information with the provided
     * input. It will also update the user's email if the user is providing a
     * new email address.
     *
     * @param ProfileUpdateRequest $request
     * @return RedirectResponse
     */
    public function profile_post(ProfileUpdateRequest $request, ProfilePost $profilePost): RedirectResponse
    {
        return $profilePost->execute($request);
    }

    /**
     * Handle an incoming request to delete the user's account.
     *
     * This method will delete the user's account and log the user out of the
     * application. It will also invalidate the user's session and regenerate
     * the CSRF token.
     *
     * @param Request $request
     * @return RedirectResponse
     */
    public function profile_destroy(Request $request): RedirectResponse
    {
        return (new ProfileDestroy())->execute($request);
    }
}

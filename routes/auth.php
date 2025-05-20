<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

//! guest route
Route::middleware('guest')->group(function () {
    // login
    Route::get('login', [AuthController::class, 'login_index'])
        ->name('login');
    Route::post('login', [AuthController::class, 'login_store']);

    // register
    Route::get('register', [AuthController::class, 'register_index'])
        ->name('register');
    Route::post('register', [AuthController::class, 'register_store']);

    // forgot password
    Route::get('forgot-password', [AuthController::class, 'forgot_password_index'])
        ->name('password.request');
    Route::post('forgot-password', [AuthController::class, 'forgot_password_store'])
        ->name('password.email');

    // reset password
    Route::get('reset-password/{token}', [AuthController::class, 'reset_password_index'])
        ->name('password.reset');
    Route::post('reset-password', [AuthController::class, 'reset_password_store'])
        ->name('password.store');
});

//! auth route
Route::middleware('auth')->group(function () {
    // logout
    Route::post('logout', [AuthController::class, 'login_destroy'])
        ->name('logout');

    // email verification
    Route::get('verify-email',  [AuthController::class, 'email_verify_index'])
        ->name('verification.notice');
    Route::get('verify-email/{id}/{hash}', [AuthController::class, 'email_verify_store'])
        ->middleware(['signed', 'throttle:6,1'])
        ->name('verification.verify');
    Route::post('email/verification-notification',  [AuthController::class, 'email_verify_notification'])
        ->middleware('throttle:6,1')
        ->name('verification.send');

    // confirm password
    Route::get('confirm-password', [AuthController::class, 'password_confirm_index'])
        ->name('password.confirm');
    Route::post('confirm-password', [AuthController::class, 'password_confirm_store']);

    // update password
    Route::put('password', [AuthController::class, 'password_update_store'])->name('password.update');
});

<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;

Route::middleware('guest')->group(function () {
    // home
    Route::get('/', [HomeController::class, 'index'])->name('home');
    Route::post('/', [HomeController::class, 'store'])->name('home.store');
});

Route::middleware(['auth', 'verified'])->group(function () {
    // dashboard
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // profile
    Route::get('/profile', [AuthController::class, 'profile_index'])->name('profile.index');
    Route::post('/profile', [AuthController::class, 'profile_post'])->name('profile.post');
    Route::delete('/profile', [AuthController::class, 'profile_destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
require __DIR__ . '/admin.php';
require __DIR__ . '/user.php';

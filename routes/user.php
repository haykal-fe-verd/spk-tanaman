<?php

use App\Http\Controllers\LahanController;
use Illuminate\Support\Facades\Route;

//! only user
Route::middleware(['auth', 'verified', 'can:user'])->group(function () {
    // lahan
    Route::get('/lahan', [LahanController::class, 'index'])->name('lahan.index');
    Route::post('/lahan', [LahanController::class, 'store'])->name('lahan.store');
    Route::put('/lahan/{lahan}', [LahanController::class, 'update'])->name('lahan.update');
    Route::delete('/lahan/{lahan}', [LahanController::class, 'destroy'])->name('lahan.destroy');
});

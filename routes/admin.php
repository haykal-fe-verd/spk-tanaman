<?php

use App\Http\Controllers\TanamanController;
use Illuminate\Support\Facades\Route;

//! only admin
Route::middleware(['auth', 'verified', 'can:admin'])->group(function () {
    // tanaman
    Route::get('/tanaman', [TanamanController::class, 'index'])->name('tanaman.index');
    Route::post('/tanaman', [TanamanController::class, 'store'])->name('tanaman.store');
    Route::put('/tanaman/{tanaman}', [TanamanController::class, 'update'])->name('tanaman.update');
    Route::delete('/tanaman/{tanaman}', [TanamanController::class, 'destroy'])->name('tanaman.destroy');
    Route::post('/tanaman/multiple', [TanamanController::class, 'destroy_multiple'])->name('tanaman.destroy.multiple');
});

<?php

use App\Http\Controllers\LahanController;
use App\Http\Controllers\RekomendasiController;
use App\Http\Controllers\RiwayatTanamController;
use Illuminate\Support\Facades\Route;

//! only user
Route::middleware(['auth', 'verified', 'can:user'])->group(function () {
    // lahan
    Route::get('/lahan', [LahanController::class, 'index'])->name('lahan.index');
    Route::post('/lahan', [LahanController::class, 'store'])->name('lahan.store');
    Route::put('/lahan/{lahan}', [LahanController::class, 'update'])->name('lahan.update');
    Route::delete('/lahan/{lahan}', [LahanController::class, 'destroy'])->name('lahan.destroy');

    // riwayat tanam
    Route::post('/riwayattanam', [RiwayatTanamController::class, 'store'])->name('riwayat.tanam.store');
    Route::put('/riwayattanam/{riwayattanam}', [RiwayatTanamController::class, 'update'])->name('riwayat.tanam.update');
    Route::delete('/riwayattanam/{riwayattanam}', [RiwayatTanamController::class, 'destroy'])->name('riwayat.tanam.destroy');

    // rekomendasi
    Route::get('/rekomendasi/{id}', [RekomendasiController::class, 'index'])->name('rekomendasi.index');
    Route::post('/rekomendasi/{id}', [RekomendasiController::class, 'calculate'])->name('rekomendasi.calculate');
});

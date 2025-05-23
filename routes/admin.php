<?php

use App\Http\Controllers\KriteriaController;
use App\Http\Controllers\NilaiPerbandinganController;
use App\Http\Controllers\SubKriteriaController;
use App\Http\Controllers\SyaratTanamController;
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

    // kriteria
    Route::get('/kriteria', [KriteriaController::class, 'index'])->name('kriteria.index');
    Route::post('/kriteria', [KriteriaController::class, 'store'])->name('kriteria.store');
    Route::put('/kriteria/{kriteria}', [KriteriaController::class, 'update'])->name('kriteria.update');
    Route::delete('/kriteria/{kriteria}', [KriteriaController::class, 'destroy'])->name('kriteria.destroy');
    Route::post('/kriteria/multiple', [KriteriaController::class, 'destroy_multiple'])->name('kriteria.destroy.multiple');
    Route::post('/kriteria/calculate', [KriteriaController::class, 'calculate_ahp'])->name('kriteria.calculate');
    Route::post('/kriteria/check-konsistensi', [KriteriaController::class, 'check_konsistensi'])->name('kriteria.check.konsistensi');

    // subkriteria
    Route::get('/subkriteria', [SubKriteriaController::class, 'index'])->name('subkriteria.index');
    Route::post('/subkriteria', [SubKriteriaController::class, 'store'])->name('subkriteria.store');
    Route::put('/subkriteria/{subkriteria}', [SubKriteriaController::class, 'update'])->name('subkriteria.update');
    Route::delete('/subkriteria/{subkriteria}', [SubKriteriaController::class, 'destroy'])->name('subkriteria.destroy');
    Route::post('/subkriteria/multiple', [SubKriteriaController::class, 'destroy_multiple'])->name('subkriteria.destroy.multiple');

    // nilai perbandingan
    Route::get('/nilai-perbandingan', [NilaiPerbandinganController::class, 'index'])->name('perbandingan.index');
    Route::post('/nilai-perbandingan', [NilaiPerbandinganController::class, 'store'])->name('perbandingan.store');

    // syarat tanam
    Route::get('/syarat-tanam', [SyaratTanamController::class, 'index'])->name('syarattanam.index');
    Route::post('/syarat-tanam', [SyaratTanamController::class, 'store'])->name('syarattanam.store');
    Route::put('/syarat-tanam/{syarattanam}', [SyaratTanamController::class, 'update'])->name('syarattanam.update');
    Route::delete('/syarat-tanam/{syarattanam}', [SyaratTanamController::class, 'destroy'])->name('syarattanam.destroy');
    Route::post('/syarat-tanam/multiple', [SyaratTanamController::class, 'destroy_multiple'])->name('syarattanam.destroy.multiple');
});

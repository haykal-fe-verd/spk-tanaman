<?php

use Illuminate\Support\Facades\Route;

//! only user
Route::middleware(['auth', 'verified', 'can:user'])->group(function () {
    //
});

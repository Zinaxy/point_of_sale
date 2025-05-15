<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ShopController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\CategoryController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'dashboard'])->name('dashboard');

    Route::resource('shop', ShopController::class);
    Route::resource('product', ProductController::class);
    Route::resource('category', CategoryController::class);
    Route::post('/orders', [OrderController::class, 'store']);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

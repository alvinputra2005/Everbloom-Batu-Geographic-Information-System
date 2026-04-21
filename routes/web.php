<?php

use App\Http\Controllers\CalendarController;
use App\Http\Controllers\DestinationController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\RecommendationController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [HomeController::class, 'index'])->name('home');

Route::get('/destinations', [RecommendationController::class, 'index'])->name('destinations');

Route::redirect('/recommendations', '/destinations', 301);

Route::redirect('/destination', '/destinations/kusuma-agro', 301);

Route::get('/destinations/{slug}', [DestinationController::class, 'show'])->name('destinations.show');

Route::get('/calendar', [CalendarController::class, 'index'])->name('calendar');

Route::get('/tentang', function () {
    return Inertia::render('About/AboutPage');
})->name('about');

Route::middleware(['auth'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home/HomePage');
})->name('home');

Route::get('/calendar', function () {
    return Inertia::render('Calendar/HarvestCalendarPage');
})->name('calendar');

Route::get('/destinations', function (Request $request) {
    $category = $request->query('category');

    return Inertia::render('Recommendations/RecommendationPage', [
        'initialCategory' => in_array($category, ['all', 'buah', 'bunga'], true) ? $category : 'all',
    ]);
})->name('recommendations');

Route::get('/destinations/{slug}', function (string $slug) {
    return Inertia::render('Destination/DestinationDetailPage', [
        'slug' => $slug,
    ]);
})->name('destinations.show');

Route::middleware(['auth'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

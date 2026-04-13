<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home/HomePage');
})->name('home');

Route::get('/destinations', function () {
    return Inertia::render('Recommendations/RecommendationResultPage');
})->name('destinations');

Route::redirect('/recommendations', '/destinations', 301);

Route::get('/destination', function () {
    return Inertia::render('Destination/DestinationDetailPage');
})->name('destination.show');

Route::get('/calendar', function () {
    return Inertia::render('Calendar/HarvestCalendarPage');
})->name('calendar');

Route::middleware(['auth'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

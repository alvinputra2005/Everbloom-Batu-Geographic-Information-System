<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

$destinationSlugs = [
    'kusuma-agro',
    'petik-apel-kebun-8',
    'agrowisata-petik-jeruk',
    'agrorakyat-apple-packing',
    'lumbung-strawberry',
    'taman-bunga-selecta',
    'batu-love-garden',
    'kebun-hortensia',
    'wisata-kebun-bunga-coban-talun',
    'ladang-bunga-matahari',
    'kebun-apel-bumiaji',
    'pusat-bunga-sidomulyo',
];

Route::get('/', function () {
    return Inertia::render('Home/HomePage');
})->name('home');

Route::get('/destinations', function (Request $request) {
    $category = $request->query('category');
    $date = $request->query('date');

    if (! in_array($category, ['buah', 'bunga'], true)) {
        $category = null;
    }

    if (! is_string($date) || ! strtotime($date)) {
        $date = null;
    }

    return Inertia::render('Recommendations/RecommendationResultPage', [
        'filters' => [
            'category' => $category,
            'date' => $date,
        ],
    ]);
})->name('destinations');

Route::redirect('/recommendations', '/destinations', 301);

Route::redirect('/destination', '/destinations/kusuma-agro', 301);

Route::get('/destinations/{slug}', function (string $slug) use ($destinationSlugs) {
    abort_unless(in_array($slug, $destinationSlugs, true), 404);

    return Inertia::render('Destination/DestinationDetailPage', [
        'slug' => $slug,
    ]);
})->name('destinations.show');

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

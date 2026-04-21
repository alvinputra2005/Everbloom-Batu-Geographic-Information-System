<?php

use App\Models\Category;
use App\Models\Destination;
use App\Support\AgrotourismCatalog;
use Database\Seeders\DestinationSeeder;
use Illuminate\Support\Facades\DB;

it('loads home and recommendation destinations from the database', function () {
    $this->seed(DestinationSeeder::class);

    $catalog = app(AgrotourismCatalog::class);

    $homeDestinations = $catalog->homeDestinations();
    $recommendations = $catalog->recommendationPagePayload(null, null)['destinations'];

    expect($homeDestinations)
        ->toHaveCount(10)
        ->and($homeDestinations[0]['slug'])->toBe('kusuma-agro')
        ->and($homeDestinations[0]['image'])->toContain('images/Kusuma-agro-valid.jpg')
        ->and($recommendations)->toHaveCount(8)
        ->and($recommendations[0]['name'])->toBe('Kebun Apel Bumiaji')
        ->and($recommendations[0]['priceValue'])->toBe(25000);
});

it('builds featured home categories without reloading the same destination catalog', function () {
    $this->seed(DestinationSeeder::class);

    DB::flushQueryLog();
    DB::enableQueryLog();

    app(AgrotourismCatalog::class)->homeDestinations();

    $homeQueryCount = count(DB::getQueryLog());

    DB::flushQueryLog();

    app(AgrotourismCatalog::class)->featuredHomeDestinationsByCategory();

    $featuredQueryCount = count(DB::getQueryLog());

    DB::disableQueryLog();

    expect($featuredQueryCount)->toBe($homeQueryCount);
});

it('builds destination detail data from the seeded destination record', function () {
    $this->seed(DestinationSeeder::class);

    $destination = app(AgrotourismCatalog::class)->destinationDetailBySlug('taman-bunga-selecta');

    expect($destination)
        ->not->toBeNull()
        ->and($destination['title'])->toBe('Taman Bunga Selecta')
        ->and($destination['ticketPrice'])->toBe('Rp 15.000')
        ->and($destination['coordinates']['lat'])->toBe(-7.8175)
        ->and($destination['statusLabel'])->toBe('Tersedia');
});

it('seeds normalized destination relations', function () {
    $this->seed(DestinationSeeder::class);

    $destination = Destination::query()
        ->with(['category', 'visitInfo', 'media', 'pricing', 'display', 'landmarks', 'seasonMonths'])
        ->where('slug', 'kusuma-agro')
        ->firstOrFail();

    expect(Category::query()->count())
        ->toBe(2)
        ->and($destination->category?->key)->toBe('buah')
        ->and($destination->visitInfo?->location)->toBe('Sisir, Batu')
        ->and($destination->media?->image_path)->toBe('images/Kusuma-agro-valid.jpg')
        ->and($destination->pricing?->ticket_price_value)->toBe(80000)
        ->and($destination->display?->home_sort_order)->toBe(1)
        ->and($destination->landmarks)->toHaveCount(2)
        ->and($destination->seasonMonths)->toHaveCount(4);
});

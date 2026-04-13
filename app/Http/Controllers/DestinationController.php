<?php

namespace App\Http\Controllers;

use App\Support\AgrotourismCatalog;
use Inertia\Inertia;
use Inertia\Response;

class DestinationController extends Controller
{
    public function __construct(protected AgrotourismCatalog $catalog)
    {
    }

    public function show(string $slug): Response
    {
        $destination = $this->catalog->destinationDetailBySlug($slug);

        abort_if($destination === null, 404);

        return Inertia::render('Destination/DestinationDetailPage', [
            'destination' => $destination,
        ]);
    }
}

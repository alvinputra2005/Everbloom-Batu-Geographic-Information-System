<?php

namespace App\Http\Controllers;

use App\Support\AgrotourismCatalog;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function __construct(protected AgrotourismCatalog $catalog)
    {
    }

    public function index(): Response
    {
        return Inertia::render('Home/HomePage', [
            'filters' => $this->catalog->filters(),
            'featuredDestinationsByCategory' => $this->catalog->featuredHomeDestinationsByCategory(),
        ]);
    }
}

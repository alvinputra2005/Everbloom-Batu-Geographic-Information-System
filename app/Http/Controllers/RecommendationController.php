<?php

namespace App\Http\Controllers;

use App\Support\AgrotourismCatalog;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class RecommendationController extends Controller
{
    public function __construct(protected AgrotourismCatalog $catalog)
    {
    }

    public function index(Request $request): Response
    {
        return Inertia::render('Recommendations/RecommendationResultPage', $this->catalog->recommendationPagePayload(
            $request->query('category'),
            $request->query('date'),
        ));
    }
}

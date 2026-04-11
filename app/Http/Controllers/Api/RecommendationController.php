<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;

class RecommendationController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json([
            'message' => 'Recommendation endpoint is ready.',
        ]);
    }
}

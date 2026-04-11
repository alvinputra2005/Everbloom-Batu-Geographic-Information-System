<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;

class DestinationController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json([
            'message' => 'Destination endpoint is ready.',
        ]);
    }
}

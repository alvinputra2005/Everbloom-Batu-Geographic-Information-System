<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;

class CalendarController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json([
            'message' => 'Calendar endpoint is ready.',
        ]);
    }
}

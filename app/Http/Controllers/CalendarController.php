<?php

namespace App\Http\Controllers;

use App\Support\AgrotourismCatalog;
use Inertia\Inertia;
use Inertia\Response;

class CalendarController extends Controller
{
    public function __construct(protected AgrotourismCatalog $catalog)
    {
    }

    public function index(): Response
    {
        return Inertia::render('Calendar/HarvestCalendarPage', $this->catalog->calendarPagePayload());
    }
}

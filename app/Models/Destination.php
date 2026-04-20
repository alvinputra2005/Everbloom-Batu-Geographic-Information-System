<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Destination extends Model
{
    use HasFactory;

    /**
     * @var list<string>
     */
    protected $guarded = [];

    /**
     * @return BelongsTo<Category, $this>
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * @return HasOne<DestinationVisitInfo, $this>
     */
    public function visitInfo(): HasOne
    {
        return $this->hasOne(DestinationVisitInfo::class);
    }

    /**
     * @return HasOne<DestinationMedia, $this>
     */
    public function media(): HasOne
    {
        return $this->hasOne(DestinationMedia::class);
    }

    /**
     * @return HasOne<DestinationPricing, $this>
     */
    public function pricing(): HasOne
    {
        return $this->hasOne(DestinationPricing::class);
    }

    /**
     * @return HasOne<DestinationDisplay, $this>
     */
    public function display(): HasOne
    {
        return $this->hasOne(DestinationDisplay::class);
    }

    /**
     * @return HasMany<DestinationLandmark, $this>
     */
    public function landmarks(): HasMany
    {
        return $this->hasMany(DestinationLandmark::class);
    }

    /**
     * @return HasMany<DestinationSeasonMonth, $this>
     */
    public function seasonMonths(): HasMany
    {
        return $this->hasMany(DestinationSeasonMonth::class);
    }
}

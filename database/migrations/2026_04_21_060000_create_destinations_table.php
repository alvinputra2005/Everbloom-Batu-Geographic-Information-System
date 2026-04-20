<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('destinations', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('title');
            $table->text('image');
            $table->string('location');
            $table->double('latitude');
            $table->double('longitude');
            $table->string('tags');
            $table->string('status', 32);
            $table->string('category', 16);
            $table->text('description')->nullable();
            $table->string('opening_time', 5);
            $table->string('closing_time', 5);
            $table->unsignedSmallInteger('home_sort_order')->nullable();
            $table->unsignedSmallInteger('recommendation_sort_order')->nullable();
            $table->string('ticket_price_label');
            $table->unsignedInteger('ticket_price_value')->default(0);
            $table->string('recommendation_price_label')->nullable();
            $table->unsignedInteger('recommendation_price_value')->nullable();
            $table->json('landmarks')->nullable();
            $table->json('season_months')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('destinations');
    }
};

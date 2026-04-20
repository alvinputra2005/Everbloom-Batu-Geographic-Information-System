<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        $this->createCategoriesTable();
        $this->createDestinationRelationTables();
        $this->ensureCategoryIdColumn();
        $this->backfillLegacyDestinationData();
        $this->dropLegacyDestinationColumns();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (! Schema::hasTable('destinations')) {
            return;
        }

        Schema::table('destinations', function (Blueprint $table) {
            if (! Schema::hasColumn('destinations', 'category')) {
                $table->string('category', 16)->nullable();
            }

            if (! Schema::hasColumn('destinations', 'image')) {
                $table->text('image')->nullable();
            }

            if (! Schema::hasColumn('destinations', 'location')) {
                $table->string('location')->nullable();
            }

            if (! Schema::hasColumn('destinations', 'latitude')) {
                $table->double('latitude')->nullable();
            }

            if (! Schema::hasColumn('destinations', 'longitude')) {
                $table->double('longitude')->nullable();
            }

            if (! Schema::hasColumn('destinations', 'opening_time')) {
                $table->string('opening_time', 5)->nullable();
            }

            if (! Schema::hasColumn('destinations', 'closing_time')) {
                $table->string('closing_time', 5)->nullable();
            }

            if (! Schema::hasColumn('destinations', 'home_sort_order')) {
                $table->unsignedSmallInteger('home_sort_order')->nullable();
            }

            if (! Schema::hasColumn('destinations', 'recommendation_sort_order')) {
                $table->unsignedSmallInteger('recommendation_sort_order')->nullable();
            }

            if (! Schema::hasColumn('destinations', 'ticket_price_label')) {
                $table->string('ticket_price_label')->nullable();
            }

            if (! Schema::hasColumn('destinations', 'ticket_price_value')) {
                $table->unsignedInteger('ticket_price_value')->nullable();
            }

            if (! Schema::hasColumn('destinations', 'recommendation_price_label')) {
                $table->string('recommendation_price_label')->nullable();
            }

            if (! Schema::hasColumn('destinations', 'recommendation_price_value')) {
                $table->unsignedInteger('recommendation_price_value')->nullable();
            }

            if (! Schema::hasColumn('destinations', 'landmarks')) {
                $table->json('landmarks')->nullable();
            }

            if (! Schema::hasColumn('destinations', 'season_months')) {
                $table->json('season_months')->nullable();
            }
        });

        if (Schema::hasColumn('destinations', 'category_id')) {
            Schema::table('destinations', function (Blueprint $table) {
                $table->dropConstrainedForeignId('category_id');
            });
        }

        Schema::dropIfExists('destination_season_months');
        Schema::dropIfExists('destination_landmarks');
        Schema::dropIfExists('destination_displays');
        Schema::dropIfExists('destination_pricings');
        Schema::dropIfExists('destination_media');
        Schema::dropIfExists('destination_visit_infos');
        Schema::dropIfExists('categories');
    }

    private function createCategoriesTable(): void
    {
        if (Schema::hasTable('categories')) {
            return;
        }

        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->string('key', 32)->unique();
            $table->string('label');
            $table->timestamps();
        });
    }

    private function createDestinationRelationTables(): void
    {
        if (! Schema::hasTable('destination_visit_infos')) {
            Schema::create('destination_visit_infos', function (Blueprint $table) {
                $table->id();
                $table->foreignId('destination_id')->unique()->constrained()->cascadeOnDelete();
                $table->string('location');
                $table->double('latitude');
                $table->double('longitude');
                $table->string('opening_time', 5);
                $table->string('closing_time', 5);
                $table->timestamps();
            });
        }

        if (! Schema::hasTable('destination_media')) {
            Schema::create('destination_media', function (Blueprint $table) {
                $table->id();
                $table->foreignId('destination_id')->unique()->constrained()->cascadeOnDelete();
                $table->text('image_path');
                $table->timestamps();
            });
        }

        if (! Schema::hasTable('destination_pricings')) {
            Schema::create('destination_pricings', function (Blueprint $table) {
                $table->id();
                $table->foreignId('destination_id')->unique()->constrained()->cascadeOnDelete();
                $table->string('ticket_price_label');
                $table->unsignedInteger('ticket_price_value')->default(0);
                $table->string('recommendation_price_label')->nullable();
                $table->unsignedInteger('recommendation_price_value')->nullable();
                $table->timestamps();
            });
        }

        if (! Schema::hasTable('destination_displays')) {
            Schema::create('destination_displays', function (Blueprint $table) {
                $table->id();
                $table->foreignId('destination_id')->unique()->constrained()->cascadeOnDelete();
                $table->unsignedSmallInteger('home_sort_order')->nullable();
                $table->unsignedSmallInteger('recommendation_sort_order')->nullable();
                $table->timestamps();
            });
        }

        if (! Schema::hasTable('destination_landmarks')) {
            Schema::create('destination_landmarks', function (Blueprint $table) {
                $table->id();
                $table->foreignId('destination_id')->constrained()->cascadeOnDelete();
                $table->string('landmark_key');
                $table->unsignedTinyInteger('sort_order')->default(0);
                $table->timestamps();

                $table->unique(['destination_id', 'landmark_key']);
            });
        }

        if (! Schema::hasTable('destination_season_months')) {
            Schema::create('destination_season_months', function (Blueprint $table) {
                $table->id();
                $table->foreignId('destination_id')->constrained()->cascadeOnDelete();
                $table->unsignedTinyInteger('month');
                $table->unsignedTinyInteger('sort_order')->default(0);
                $table->timestamps();

                $table->unique(['destination_id', 'month']);
            });
        }
    }

    private function ensureCategoryIdColumn(): void
    {
        if (Schema::hasColumn('destinations', 'category_id')) {
            return;
        }

        Schema::table('destinations', function (Blueprint $table) {
            $table->foreignId('category_id')->nullable()->after('slug')->constrained('categories');
        });
    }

    private function backfillLegacyDestinationData(): void
    {
        if (! Schema::hasColumn('destinations', 'category')) {
            return;
        }

        $timestamp = now();
        $categoryLabelMap = [
            'buah' => 'Wisata Buah',
            'bunga' => 'Wisata Bunga',
        ];

        $categoryKeys = DB::table('destinations')
            ->whereNotNull('category')
            ->distinct()
            ->pluck('category')
            ->filter()
            ->values();

        foreach ($categoryKeys as $categoryKey) {
            DB::table('categories')->updateOrInsert(
                ['key' => $categoryKey],
                [
                    'label' => $categoryLabelMap[$categoryKey] ?? ucfirst((string) $categoryKey),
                    'updated_at' => $timestamp,
                    'created_at' => $timestamp,
                ],
            );
        }

        $categoryIds = DB::table('categories')->pluck('id', 'key');
        $destinations = DB::table('destinations')->get();

        foreach ($destinations as $destination) {
            $categoryId = $categoryIds[$destination->category] ?? null;

            if ($categoryId !== null) {
                DB::table('destinations')
                    ->where('id', $destination->id)
                    ->update(['category_id' => $categoryId]);
            }

            DB::table('destination_visit_infos')->updateOrInsert(
                ['destination_id' => $destination->id],
                [
                    'location' => $destination->location,
                    'latitude' => $destination->latitude,
                    'longitude' => $destination->longitude,
                    'opening_time' => $destination->opening_time,
                    'closing_time' => $destination->closing_time,
                    'updated_at' => $timestamp,
                    'created_at' => $timestamp,
                ],
            );

            DB::table('destination_media')->updateOrInsert(
                ['destination_id' => $destination->id],
                [
                    'image_path' => $destination->image,
                    'updated_at' => $timestamp,
                    'created_at' => $timestamp,
                ],
            );

            DB::table('destination_pricings')->updateOrInsert(
                ['destination_id' => $destination->id],
                [
                    'ticket_price_label' => $destination->ticket_price_label,
                    'ticket_price_value' => $destination->ticket_price_value ?? 0,
                    'recommendation_price_label' => $destination->recommendation_price_label,
                    'recommendation_price_value' => $destination->recommendation_price_value,
                    'updated_at' => $timestamp,
                    'created_at' => $timestamp,
                ],
            );

            DB::table('destination_displays')->updateOrInsert(
                ['destination_id' => $destination->id],
                [
                    'home_sort_order' => $destination->home_sort_order,
                    'recommendation_sort_order' => $destination->recommendation_sort_order,
                    'updated_at' => $timestamp,
                    'created_at' => $timestamp,
                ],
            );

            DB::table('destination_landmarks')->where('destination_id', $destination->id)->delete();
            foreach ($this->decodeJsonList($destination->landmarks) as $index => $landmarkKey) {
                DB::table('destination_landmarks')->insert([
                    'destination_id' => $destination->id,
                    'landmark_key' => $landmarkKey,
                    'sort_order' => $index,
                    'created_at' => $timestamp,
                    'updated_at' => $timestamp,
                ]);
            }

            DB::table('destination_season_months')->where('destination_id', $destination->id)->delete();
            foreach ($this->decodeJsonList($destination->season_months) as $index => $month) {
                DB::table('destination_season_months')->insert([
                    'destination_id' => $destination->id,
                    'month' => (int) $month,
                    'sort_order' => $index,
                    'created_at' => $timestamp,
                    'updated_at' => $timestamp,
                ]);
            }
        }
    }

    private function dropLegacyDestinationColumns(): void
    {
        $columns = array_values(array_filter([
            Schema::hasColumn('destinations', 'image') ? 'image' : null,
            Schema::hasColumn('destinations', 'location') ? 'location' : null,
            Schema::hasColumn('destinations', 'latitude') ? 'latitude' : null,
            Schema::hasColumn('destinations', 'longitude') ? 'longitude' : null,
            Schema::hasColumn('destinations', 'opening_time') ? 'opening_time' : null,
            Schema::hasColumn('destinations', 'closing_time') ? 'closing_time' : null,
            Schema::hasColumn('destinations', 'home_sort_order') ? 'home_sort_order' : null,
            Schema::hasColumn('destinations', 'recommendation_sort_order') ? 'recommendation_sort_order' : null,
            Schema::hasColumn('destinations', 'ticket_price_label') ? 'ticket_price_label' : null,
            Schema::hasColumn('destinations', 'ticket_price_value') ? 'ticket_price_value' : null,
            Schema::hasColumn('destinations', 'recommendation_price_label') ? 'recommendation_price_label' : null,
            Schema::hasColumn('destinations', 'recommendation_price_value') ? 'recommendation_price_value' : null,
            Schema::hasColumn('destinations', 'landmarks') ? 'landmarks' : null,
            Schema::hasColumn('destinations', 'season_months') ? 'season_months' : null,
            Schema::hasColumn('destinations', 'category') ? 'category' : null,
        ]));

        if ($columns === []) {
            return;
        }

        Schema::table('destinations', function (Blueprint $table) use ($columns) {
            $table->dropColumn($columns);
        });
    }

    /**
     * @return list<mixed>
     */
    private function decodeJsonList(mixed $value): array
    {
        if (is_array($value)) {
            return array_values($value);
        }

        if (! is_string($value) || trim($value) === '') {
            return [];
        }

        $decoded = json_decode($value, true);

        return is_array($decoded) ? array_values($decoded) : [];
    }
};

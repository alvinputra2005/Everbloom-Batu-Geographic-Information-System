<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        if (! Schema::hasTable('destinations')) {
            return;
        }

        $driver = DB::getDriverName();

        if ($driver === 'pgsql') {
            DB::statement('ALTER TABLE destinations ALTER COLUMN image TYPE TEXT');

            return;
        }

        if ($driver === 'mysql') {
            DB::statement('ALTER TABLE destinations MODIFY image TEXT NOT NULL');
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (! Schema::hasTable('destinations')) {
            return;
        }

        $driver = DB::getDriverName();

        if ($driver === 'pgsql') {
            DB::statement('ALTER TABLE destinations ALTER COLUMN image TYPE VARCHAR(255)');

            return;
        }

        if ($driver === 'mysql') {
            DB::statement('ALTER TABLE destinations MODIFY image VARCHAR(255) NOT NULL');
        }
    }
};

<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $timestamp = now();

        Category::query()->upsert(
            [
                [
                    'key' => 'buah',
                    'label' => 'Wisata Buah',
                    'created_at' => $timestamp,
                    'updated_at' => $timestamp,
                ],
                [
                    'key' => 'bunga',
                    'label' => 'Wisata Bunga',
                    'created_at' => $timestamp,
                    'updated_at' => $timestamp,
                ],
            ],
            ['key'],
            ['label', 'updated_at'],
        );
    }
}

<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Destination;
use Illuminate\Database\Seeder;

class DestinationSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(CategorySeeder::class);

        $categories = Category::query()->pluck('id', 'key');

        $destinations = [
            [
                'category' => 'buah',
                'slug' => 'kusuma-agro',
                'title' => 'Kusuma Agro',
                'tags' => 'Panen Apel & Jeruk',
                'status' => 'Peak Status',
                'description' => 'Wisata petik buah dengan panorama perbukitan dan area kebun yang luas.',
                'media' => [
                    'image_path' => 'images/Kusuma-agro-valid.jpg',
                ],
                'visit_info' => [
                    'location' => 'Sisir, Batu',
                    'latitude' => -7.8824957,
                    'longitude' => 112.5148648,
                    'opening_time' => '08:00',
                    'closing_time' => '17:00',
                ],
                'pricing' => [
                    'ticket_price_label' => 'Rp 80.000',
                    'ticket_price_value' => 80000,
                    'recommendation_price_label' => 'Rp 35.000',
                    'recommendation_price_value' => 35000,
                ],
                'display' => [
                    'home_sort_order' => 1,
                    'recommendation_sort_order' => 3,
                ],
                'landmarks' => ['jatim-park-1', 'museum-angkut'],
                'season_months' => [0, 1, 10, 11],
            ],
            [
                'category' => 'buah',
                'slug' => 'petik-apel-kebun-8',
                'title' => 'Petik Apel Kebun 8',
                'tags' => 'Apel Manalagi',
                'status' => 'Peak Status',
                'description' => 'Destinasi petik apel yang populer untuk menikmati buah segar langsung dari pohonnya.',
                'media' => [
                    'image_path' => 'images/Petik-Apel-Kebun-8-Kota-Batu.jpeg',
                ],
                'visit_info' => [
                    'location' => 'Bumiaji, Batu',
                    'latitude' => -7.7817893,
                    'longitude' => 112.5281206,
                    'opening_time' => '08:30',
                    'closing_time' => '17:00',
                ],
                'pricing' => [
                    'ticket_price_label' => 'Rp 35.000',
                    'ticket_price_value' => 35000,
                    'recommendation_price_label' => 'Rp 20.000',
                    'recommendation_price_value' => 20000,
                ],
                'display' => [
                    'home_sort_order' => 2,
                    'recommendation_sort_order' => 4,
                ],
                'landmarks' => ['jatim-park-2', 'jatim-park-1'],
                'season_months' => [7, 8, 9],
            ],
            [
                'category' => 'buah',
                'slug' => 'agrowisata-petik-jeruk',
                'title' => 'Agrowisata Petik Jeruk',
                'tags' => 'Jeruk Keprok Batu',
                'status' => 'Available',
                'description' => 'Kebun jeruk yang cocok untuk keluarga dengan suasana segar khas dataran tinggi.',
                'media' => [
                    'image_path' => 'images/Agrowisata-Petik-Jeruk.webp',
                ],
                'visit_info' => [
                    'location' => 'Bumiaji, Batu',
                    'latitude' => -7.8390730,
                    'longitude' => 112.5282943,
                    'opening_time' => '08:00',
                    'closing_time' => '17:00',
                ],
                'pricing' => [
                    'ticket_price_label' => 'Rp 20.000',
                    'ticket_price_value' => 20000,
                    'recommendation_price_label' => 'Rp 35.000',
                    'recommendation_price_value' => 35000,
                ],
                'display' => [
                    'home_sort_order' => 3,
                    'recommendation_sort_order' => 5,
                ],
                'landmarks' => ['jatim-park-1', 'museum-angkut'],
                'season_months' => [5, 6, 7],
            ],
            [
                'category' => 'buah',
                'slug' => 'agrorakyat-apple-packing',
                'title' => 'Agrorakyat Apple Packing',
                'tags' => 'Edukasi Apel Batu',
                'status' => 'Available',
                'description' => 'Perpaduan wisata edukasi dan produk apel lokal yang menarik untuk kunjungan singkat.',
                'media' => [
                    'image_path' => 'images/Agrorakyat-Apple-Packing Tourism.jpeg',
                ],
                'visit_info' => [
                    'location' => 'Punten, Batu',
                    'latitude' => -7.8528842,
                    'longitude' => 112.5271493,
                    'opening_time' => '09:00',
                    'closing_time' => '17:00',
                ],
                'pricing' => [
                    'ticket_price_label' => 'Rp 25.000',
                    'ticket_price_value' => 25000,
                    'recommendation_price_label' => 'Rp 20.000',
                    'recommendation_price_value' => 20000,
                ],
                'display' => [
                    'home_sort_order' => 4,
                    'recommendation_sort_order' => 6,
                ],
                'landmarks' => ['alun-alun-batu', 'jatim-park-2'],
                'season_months' => [3, 4, 5, 6],
            ],
            [
                'category' => 'buah',
                'slug' => 'lumbung-strawberry',
                'title' => 'Lumbung Strawberry',
                'tags' => 'Stroberi Rumah Kaca',
                'status' => 'Off-Season',
                'description' => 'Rumah kaca stroberi dengan pengalaman panen langsung dan suasana yang nyaman.',
                'media' => [
                    'image_path' => 'images/Lumbung-strawberry.webp',
                ],
                'visit_info' => [
                    'location' => 'Pandanrejo, Batu',
                    'latitude' => -7.8688734,
                    'longitude' => 112.5417603,
                    'opening_time' => '09:00',
                    'closing_time' => '17:00',
                ],
                'pricing' => [
                    'ticket_price_label' => 'Rp 30.000',
                    'ticket_price_value' => 30000,
                    'recommendation_price_label' => 'Rp 35.000',
                    'recommendation_price_value' => 35000,
                ],
                'display' => [
                    'home_sort_order' => 5,
                    'recommendation_sort_order' => 7,
                ],
                'landmarks' => ['museum-angkut', 'alun-alun-batu'],
                'season_months' => [0, 1, 10, 11],
            ],
            [
                'category' => 'bunga',
                'slug' => 'taman-bunga-selecta',
                'title' => 'Taman Bunga Selecta',
                'tags' => 'Krisan & Hortensia',
                'status' => 'Available',
                'description' => 'Taman bunga ikonik dengan hamparan warna yang luas dan udara pegunungan yang sejuk.',
                'media' => [
                    'image_path' => 'images/Selecta-Garden.jpg',
                ],
                'visit_info' => [
                    'location' => 'Tulungrejo, Batu',
                    'latitude' => -7.8175000,
                    'longitude' => 112.5258000,
                    'opening_time' => '07:00',
                    'closing_time' => '18:00',
                ],
                'pricing' => [
                    'ticket_price_label' => 'Rp 15.000',
                    'ticket_price_value' => 15000,
                    'recommendation_price_label' => 'Gratis',
                    'recommendation_price_value' => 0,
                ],
                'display' => [
                    'home_sort_order' => 6,
                    'recommendation_sort_order' => 8,
                ],
                'landmarks' => ['jatim-park-2', 'jatim-park-1'],
                'season_months' => [7, 8, 9],
            ],
            [
                'category' => 'bunga',
                'slug' => 'batu-love-garden',
                'title' => 'Batu Love Garden',
                'tags' => 'Taman Florikultura',
                'status' => 'Available',
                'description' => 'Ruang wisata bunga modern dengan spot foto tematik dan koleksi tanaman hias.',
                'media' => [
                    'image_path' => 'images/Batu-Love-Garden.jpg',
                ],
                'visit_info' => [
                    'location' => 'Oro-Oro Ombo, Batu',
                    'latitude' => -7.8634413,
                    'longitude' => 112.5428768,
                    'opening_time' => '08:30',
                    'closing_time' => '18:00',
                ],
                'pricing' => [
                    'ticket_price_label' => 'Rp 25.000',
                    'ticket_price_value' => 25000,
                    'recommendation_price_label' => null,
                    'recommendation_price_value' => null,
                ],
                'display' => [
                    'home_sort_order' => 7,
                    'recommendation_sort_order' => null,
                ],
                'landmarks' => [],
                'season_months' => [],
            ],
            [
                'category' => 'bunga',
                'slug' => 'kebun-hortensia',
                'title' => 'Kebun Hortensia',
                'tags' => 'Hortensia Dataran Tinggi',
                'status' => 'Peak Status',
                'description' => 'Hamparan hortensia di area sejuk yang cocok untuk wisata santai dan fotografi.',
                'media' => [
                    'image_path' => 'images/Kebun-Hortensia.jpg',
                ],
                'visit_info' => [
                    'location' => 'Tulungrejo, Batu',
                    'latitude' => -7.7952314,
                    'longitude' => 112.5229570,
                    'opening_time' => '08:00',
                    'closing_time' => '18:00',
                ],
                'pricing' => [
                    'ticket_price_label' => 'Rp 10.000',
                    'ticket_price_value' => 10000,
                    'recommendation_price_label' => null,
                    'recommendation_price_value' => null,
                ],
                'display' => [
                    'home_sort_order' => 8,
                    'recommendation_sort_order' => null,
                ],
                'landmarks' => [],
                'season_months' => [],
            ],
            [
                'category' => 'bunga',
                'slug' => 'wisata-kebun-bunga-coban-talun',
                'title' => 'Kebun Bunga Coban Talun',
                'tags' => 'Jalur Taman',
                'status' => 'Available',
                'description' => 'Area kebun bunga yang berpadu dengan lanskap alam dan jalur wisata keluarga.',
                'media' => [
                    'image_path' => 'images/Wisata-kebun-bunga-coban-talun.jpg',
                ],
                'visit_info' => [
                    'location' => 'Gunungsari, Batu',
                    'latitude' => -7.8009290,
                    'longitude' => 112.5166310,
                    'opening_time' => '08:00',
                    'closing_time' => '18:00',
                ],
                'pricing' => [
                    'ticket_price_label' => 'Rp 15.000',
                    'ticket_price_value' => 15000,
                    'recommendation_price_label' => null,
                    'recommendation_price_value' => null,
                ],
                'display' => [
                    'home_sort_order' => 9,
                    'recommendation_sort_order' => null,
                ],
                'landmarks' => [],
                'season_months' => [],
            ],
            [
                'category' => 'bunga',
                'slug' => 'ladang-bunga-matahari',
                'title' => 'Ladang Bunga Matahari',
                'tags' => 'Hamparan Bunga Matahari',
                'status' => 'Peak Status',
                'description' => 'Ladang bunga matahari dengan karakter visual kuat untuk kunjungan dan swafoto.',
                'media' => [
                    'image_path' => 'images/Ladang-Bunga-Matahari.avif',
                ],
                'visit_info' => [
                    'location' => 'Bumiaji, Batu',
                    'latitude' => -7.8673111,
                    'longitude' => 112.5525139,
                    'opening_time' => '08:00',
                    'closing_time' => '18:00',
                ],
                'pricing' => [
                    'ticket_price_label' => 'Rp 12.000',
                    'ticket_price_value' => 12000,
                    'recommendation_price_label' => null,
                    'recommendation_price_value' => null,
                ],
                'display' => [
                    'home_sort_order' => 10,
                    'recommendation_sort_order' => null,
                ],
                'landmarks' => [],
                'season_months' => [],
            ],
            [
                'category' => 'buah',
                'slug' => 'kebun-apel-bumiaji',
                'title' => 'Kebun Apel Bumiaji',
                'tags' => 'Apel Manalagi',
                'status' => 'Peak Status',
                'description' => 'Kebun apel dataran tinggi dengan jalur petik yang nyaman untuk kunjungan keluarga dan rombongan kecil.',
                'media' => [
                    'image_path' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuBYL8C7GZgt7_YFv2LND0HcLEQ4a-a-FS8LczSFtOBTYMDfymTs2f5fchtP473OFhtUaTJj53GUUHSZUYljHHS63W6WNlhCEwjzCGA8DU3B1iolIAzDU0d-Fu1knm9O6l1ItM7LWw96VmSr444O4IWFP2qUPv_jWnawWQMKf5IJe3d6fjBYcD4H79r5mRTTg6_oGY8YXwV33CXb7UtP7xuii-gCwgLcjKanA-_Y8vo5OVXV-e3rEviXS92R8fMUCCeSktw2gdZwRWh_',
                ],
                'visit_info' => [
                    'location' => 'Bumiaji, Batu',
                    'latitude' => -7.8089300,
                    'longitude' => 112.5330100,
                    'opening_time' => '08:00',
                    'closing_time' => '17:00',
                ],
                'pricing' => [
                    'ticket_price_label' => 'Rp 25.000',
                    'ticket_price_value' => 25000,
                    'recommendation_price_label' => 'Rp 25.000',
                    'recommendation_price_value' => 25000,
                ],
                'display' => [
                    'home_sort_order' => null,
                    'recommendation_sort_order' => 1,
                ],
                'landmarks' => ['jatim-park-1', 'museum-angkut'],
                'season_months' => [5, 6, 7],
            ],
            [
                'category' => 'bunga',
                'slug' => 'pusat-bunga-sidomulyo',
                'title' => 'Pusat Bunga Sidomulyo',
                'tags' => 'Mawar & Anggrek',
                'status' => 'Available',
                'description' => 'Sentra florikultura Batu dengan deretan kios bunga, area edukasi, dan suasana kampung wisata yang aktif sepanjang hari.',
                'media' => [
                    'image_path' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuCNP3ODtQnx9VdfnZcEq-TWyn4LKqo0irgW4vrRwFB7MPjNSEzWWj2mDRL0j_0NMAGPRIrq4dRw4Qr3iOjwpjZH3r55RjQuJwxqJurlVemFxbQCfqblgEADnBCgOJ-p-0o7mA0DCRMbWqJDR-_SAkG3hnMosIpU4PITx-XnIQxVIdz2noxfyqWmL1Qv2RJbtRJ0jfJdBGKfM6lqJ3VPTmCynup9d_zi6HEL6RBR5gPGO9fXd-NCBU1k8NpGcbIjBukNSXfTEdxrM0V6',
                ],
                'visit_info' => [
                    'location' => 'Sidomulyo, Batu',
                    'latitude' => -7.8792100,
                    'longitude' => 112.5196200,
                    'opening_time' => '07:00',
                    'closing_time' => '18:00',
                ],
                'pricing' => [
                    'ticket_price_label' => 'Gratis',
                    'ticket_price_value' => 0,
                    'recommendation_price_label' => 'Gratis',
                    'recommendation_price_value' => 0,
                ],
                'display' => [
                    'home_sort_order' => null,
                    'recommendation_sort_order' => 2,
                ],
                'landmarks' => ['alun-alun-batu', 'jatim-park-2'],
                'season_months' => [3, 4, 5, 6],
            ],
        ];

        foreach ($destinations as $destinationData) {
            $destination = Destination::query()->updateOrCreate(
                ['slug' => $destinationData['slug']],
                [
                    'category_id' => $categories[$destinationData['category']],
                    'title' => $destinationData['title'],
                    'tags' => $destinationData['tags'],
                    'status' => $destinationData['status'],
                    'description' => $destinationData['description'],
                ],
            );

            $destination->media()->updateOrCreate([], $destinationData['media']);
            $destination->visitInfo()->updateOrCreate([], $destinationData['visit_info']);
            $destination->pricing()->updateOrCreate([], $destinationData['pricing']);
            $destination->display()->updateOrCreate([], $destinationData['display']);

            $destination->landmarks()->delete();
            foreach ($destinationData['landmarks'] as $index => $landmarkKey) {
                $destination->landmarks()->create([
                    'landmark_key' => $landmarkKey,
                    'sort_order' => $index,
                ]);
            }

            $destination->seasonMonths()->delete();
            foreach ($destinationData['season_months'] as $index => $month) {
                $destination->seasonMonths()->create([
                    'month' => $month,
                    'sort_order' => $index,
                ]);
            }
        }
    }
}

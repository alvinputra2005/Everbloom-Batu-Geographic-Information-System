<?php

namespace App\Support;

use App\Models\Destination;
use Illuminate\Database\Eloquent\Builder;

class AgrotourismCatalog
{
    protected ?array $homeDestinationsCache = null;

    public function filters(): array
    {
        return [
            ['key' => 'all', 'label' => 'Semua'],
            ['key' => 'buah', 'label' => 'Wisata Buah'],
            ['key' => 'bunga', 'label' => 'Wisata Bunga'],
        ];
    }

    public function homeDestinations(): array
    {
        return $this->homeDestinationsCache ??= $this->destinationQuery()
            ->whereHas('display', fn (Builder $query) => $query->whereNotNull('home_sort_order'))
            ->get()
            ->sortBy(fn (Destination $destination) => $destination->display?->home_sort_order ?? PHP_INT_MAX)
            ->values()
            ->map(fn (Destination $destination) => $this->mapHomeDestination($destination))
            ->all();
    }

    public function featuredHomeDestinationsByCategory(): array
    {
        $destinations = $this->homeDestinations();

        return [
            'all' => $this->featuredHomeDestinations($destinations, 'all'),
            'buah' => $this->featuredHomeDestinations($destinations, 'buah'),
            'bunga' => $this->featuredHomeDestinations($destinations, 'bunga'),
        ];
    }

    public function recommendationPagePayload(?string $category, ?string $date): array
    {
        return [
            'filters' => [
                'category' => $this->normalizeCategory($category),
                'date' => $this->normalizeDate($date),
            ],
            'categories' => $this->filters(),
            'destinations' => $this->recommendationDestinations(),
            'landmarks' => $this->landmarks(),
            'heroContentBase' => $this->recommendationHeroContent(),
            'nearbyInsight' => $this->nearbyInsight(),
        ];
    }

    public function destinationDetailBySlug(string $slug): ?array
    {
        $destination = $this->destinationQuery()
            ->where('slug', $slug)
            ->first();

        return $destination ? $this->buildDestinationDetail($this->mapStoredDestination($destination)) : null;
    }

    public function calendarPagePayload(): array
    {
        return [
            'insightMonths' => $this->calendarInsightMonths(),
            'commodities' => $this->calendarCommodities(),
        ];
    }

    protected function featuredHomeDestinations(array $destinations, string $category): array
    {
        if ($category === 'buah' || $category === 'bunga') {
            return array_values(array_filter($destinations, fn (array $destination) => $destination['category'] === $category));
        }

        $fruit = array_slice(array_values(array_filter($destinations, fn (array $destination) => $destination['category'] === 'buah')), 0, 3);
        $flower = array_slice(array_values(array_filter($destinations, fn (array $destination) => $destination['category'] === 'bunga')), 0, 3);

        return [...$fruit, ...$flower];
    }

    protected function recommendationDestinations(): array
    {
        return $this->destinationQuery()
            ->whereHas('display', fn (Builder $query) => $query->whereNotNull('recommendation_sort_order'))
            ->get()
            ->sortBy(fn (Destination $destination) => $destination->display?->recommendation_sort_order ?? PHP_INT_MAX)
            ->values()
            ->map(fn (Destination $destination) => $this->mapRecommendationDestination($destination))
            ->all();
    }

    protected function recommendationHeroContent(): array
    {
        return [
            'monthLabel' => 'April 2026',
            'categoryLabel' => 'Wisata Buah & Bunga',
            'title' => 'Musim Panen Sedang Berlangsung',
            'description' => 'April adalah waktu yang nyaman untuk menikmati kebun buah dan taman bunga di Batu. Udara pegunungan yang sejuk membuat aktivitas jelajah, petik buah, dan berburu foto terasa lebih menyenangkan. Berdasarkan pilihanmu, kami menyiapkan destinasi terbaik untuk periode ini.',
            'insightLabel' => 'Sorotan',
            'insightText' => 'Intensitas mekarnya bunga di lereng utara Batu sedang tinggi minggu ini. Cocok untuk kunjungan santai dan fotografi.',
            'image' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuBYL8C7GZgt7_YFv2LND0HcLEQ4a-a-FS8LczSFtOBTYMDfymTs2f5fchtP473OFhtUaTJj53GUUHSZUYljHHS63W6WNlhCEwjzCGA8DU3B1iolIAzDU0d-Fu1knm9O6l1ItM7LWw96VmSr444O4IWFP2qUPv_jWnawWQMKf5IJe3d6fjBYcD4H79r5mRTTg6_oGY8YXwV33CXb7UtP7xuii-gCwgLcjKanA-_Y8vo5OVXV-e3rEviXS92R8fMUCCeSktw2gdZwRWh_',
            'imageAlt' => 'Kebun di Batu',
        ];
    }

    protected function landmarks(): array
    {
        return [
            ['id' => 'jatim-park-1', 'name' => 'Jatim Park 1'],
            ['id' => 'museum-angkut', 'name' => 'Museum Angkut'],
            ['id' => 'alun-alun-batu', 'name' => 'Alun-Alun Batu'],
            ['id' => 'jatim-park-2', 'name' => 'Jatim Park 2'],
        ];
    }

    protected function nearbyInsight(): array
    {
        $nearbyCount = max(Destination::query()->count(), 12);

        return [
            'title' => 'Jelajahi Sekitar',
            'description' => sprintf('Masih ada %d destinasi agrowisata lain dalam radius 5 km dari pilihanmu saat ini.', $nearbyCount),
            'countLabel' => sprintf('%d Titik Terdekat', $nearbyCount),
            'image' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuBz5jIy4_Pr-jbJIWOqS3_9I7eEqui0YaHjoB6BcWFtkpcSdvUWoIouDySB6prS1FqHrfNwUtDVyTtIxBGacwSC9FEgfNhGrfY2GOvLwTZ4dPCw-8BcqWOL65aLrqFVZcxal7HZfmPegeqqS7NeJ59qrLMtQIGFKAu13_ZFYBY0XJWjUkEHn5M4oUtpgyJsu02h1ei2Mnna1lztua92v70tCB4MjSvzcGMdtGy6MnJoEG-nV_68LuvojhHskn_2veo2U2aot4me4TVs',
            'imageAlt' => 'Peta Batu',
            'href' => '#map',
        ];
    }

    protected function buildDestinationDetail(array $destination): array
    {
        $audienceByCategory = [
            'buah' => 'Keluarga',
            'bunga' => 'Keluarga',
        ];

        $facilitiesByCategory = [
            'buah' => [
                ['icon' => 'car', 'label' => 'Parkir Luas'],
                ['icon' => 'utensils', 'label' => 'Kedai Kebun'],
                ['icon' => 'waves', 'label' => 'Toilet Bersih'],
                ['icon' => 'tent', 'label' => 'Musholla'],
                ['icon' => 'wifi', 'label' => 'Area Istirahat'],
            ],
            'bunga' => [
                ['icon' => 'car', 'label' => 'Parkir Wisata'],
                ['icon' => 'utensils', 'label' => 'Kios Kuliner'],
                ['icon' => 'waves', 'label' => 'Toilet Bersih'],
                ['icon' => 'tent', 'label' => 'Gazebo Taman'],
                ['icon' => 'wifi', 'label' => 'Spot Foto'],
            ],
        ];

        $peakMonthsByCategory = [
            'buah' => [
                ['label' => 'Jan', 'height' => 36, 'tone' => 'surface'],
                ['label' => 'Feb', 'height' => 52, 'tone' => 'secondary'],
                ['label' => 'Mar', 'height' => 78, 'tone' => 'primary'],
                ['label' => 'Apr', 'height' => 96, 'tone' => 'primary', 'active' => true],
                ['label' => 'Mei', 'height' => 84, 'tone' => 'primary'],
                ['label' => 'Jun', 'height' => 60, 'tone' => 'secondary'],
            ],
            'bunga' => [
                ['label' => 'Jan', 'height' => 48, 'tone' => 'secondary'],
                ['label' => 'Feb', 'height' => 68, 'tone' => 'primary'],
                ['label' => 'Mar', 'height' => 92, 'tone' => 'primary', 'active' => true],
                ['label' => 'Apr', 'height' => 86, 'tone' => 'primary'],
                ['label' => 'Mei', 'height' => 62, 'tone' => 'secondary'],
                ['label' => 'Jun', 'height' => 40, 'tone' => 'surface'],
            ],
        ];

        $reviewMetricsByStatus = [
            'Peak Status' => [
                ['label' => 'Kebersihan', 'score' => 4.9, 'width' => '95%'],
                ['label' => 'Pelayanan', 'score' => 4.7, 'width' => '88%'],
                ['label' => 'Fasilitas', 'score' => 4.8, 'width' => '92%'],
            ],
            'Available' => [
                ['label' => 'Kebersihan', 'score' => 4.7, 'width' => '90%'],
                ['label' => 'Pelayanan', 'score' => 4.6, 'width' => '86%'],
                ['label' => 'Fasilitas', 'score' => 4.6, 'width' => '86%'],
            ],
            'Off-Season' => [
                ['label' => 'Kebersihan', 'score' => 4.5, 'width' => '84%'],
                ['label' => 'Pelayanan', 'score' => 4.4, 'width' => '82%'],
                ['label' => 'Fasilitas', 'score' => 4.4, 'width' => '81%'],
            ],
        ];

        $statusToneByLabel = [
            'Peak Status' => 'peak',
            'Available' => 'available',
            'Off-Season' => 'off-season',
        ];

        $statusLabelByKey = [
            'Peak Status' => 'Puncak Musim',
            'Available' => 'Tersedia',
            'Off-Season' => 'Luar Musim',
        ];

        $categoryLabelByKey = [
            'buah' => 'Wisata Buah',
            'bunga' => 'Wisata Bunga',
        ];

        $ticketPrice = $destination['ticketPrice'];

        return [
            'slug' => $destination['slug'],
            'title' => $destination['title'],
            'image' => $destination['image'],
            'imageAlt' => $destination['title'].' di '.$destination['location'],
            'location' => $destination['location'],
            'locationLabel' => $destination['location'].', Jawa Timur',
            'categoryLabel' => $categoryLabelByKey[$destination['category']],
            'statusLabel' => $statusLabelByKey[$destination['status']],
            'statusTone' => $statusToneByLabel[$destination['status']],
            'rating' => $this->buildRating($destination),
            'reviewsLabel' => $this->buildReviewLabel($destination),
            'ticketPrice' => $ticketPrice,
            'bookingLabel' => $ticketPrice === 'Gratis' ? 'Kunjungi Sekarang' : 'Pesan Tiket Sekarang',
            'description' => $this->buildDetailDescription($destination),
            'stats' => [
                ['icon' => 'ticket', 'label' => 'HTM Mulai', 'value' => $ticketPrice],
                ['icon' => 'clock', 'label' => 'Jam Buka', 'value' => $this->buildOpenHours($destination)],
                ['icon' => 'sprout', 'label' => 'Komoditas', 'value' => $this->buildCommoditySummary($destination)],
                ['icon' => 'users', 'label' => 'Cocok Untuk', 'value' => $audienceByCategory[$destination['category']]],
            ],
            'facilities' => $facilitiesByCategory[$destination['category']],
            'address' => 'Kawasan '.$destination['location'].', Kota Batu, Jawa Timur',
            'mapImage' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuCbFijUZIYovifvURwZX7hKRui6wPLDzrif1-EpIupJ8F4_qXKl2a27sfuaV3suyulOk6MMVUpJL0uUmM58y1AgJ8eZyT1ZPy-b8hu4t-NgRetXnJBXIBs15FJQFLU3ls6ASRqvEYs-ENrdmygJDqxI4UubdnLeET2oiYc2JiBu3BcaYPUbtVGJ4JUiNAvZbnlAInCejCnZ0enEk-4bhQ9aXHj5i0lM420-vgmoYSDTQOTki9Q0Mm4dAq7O7C7M-cmkjno7FS1xWeTI',
            'mapImageAlt' => 'Peta area '.$destination['title'],
            'coordinates' => $destination['coordinates'],
            'mapHref' => $this->openStreetMapHref($destination['coordinates']['lat'], $destination['coordinates']['lng']),
            'navigationHref' => $this->googleMapsDirectionsHref($destination['coordinates']['lat'], $destination['coordinates']['lng']),
            'reviewMetrics' => $reviewMetricsByStatus[$destination['status']],
            'featuredReview' => $this->buildFeaturedReview($destination),
            'seasonal' => [
                'updatedAt' => 'April 2026',
                'highlightLabel' => 'Musim '.$destination['tags'],
                'weatherDescription' => $destination['category'] === 'buah'
                    ? 'Langit cenderung cerah dengan suhu 18C - 24C, ideal untuk aktivitas petik dan berjalan di area kebun.'
                    : 'Cuaca sejuk dengan cahaya pagi yang lembut membuat warna bunga terlihat lebih kontras untuk eksplorasi dan foto.',
                'produceDescription' => $destination['category'] === 'buah'
                    ? $destination['tags'].' menjadi daya tarik utama pada periode ini dengan kualitas panen yang stabil.'
                    : $destination['tags'].' tampil paling menarik pada periode ini dengan warna bunga yang lebih merata dan area taman yang aktif.',
                'peakMonths' => $peakMonthsByCategory[$destination['category']],
            ],
        ];
    }

    protected function buildOpenHours(array $destination): string
    {
        return $destination['openingTime'].' - '.$destination['closingTime'];
    }

    protected function buildCommoditySummary(array $destination): string
    {
        return $destination['category'] === 'buah' ? $destination['tags'] : 'Area '.$destination['tags'];
    }

    protected function buildDetailDescription(array $destination): string
    {
        $fallback = $destination['category'] === 'buah'
            ? 'Destinasi agrowisata petik buah dengan udara sejuk dan panorama perbukitan khas Kota Batu.'
            : 'Destinasi wisata bunga dengan suasana taman terbuka, warna yang kuat, dan pengalaman jalan santai.';

        $followUp = $destination['category'] === 'buah'
            ? 'Pengunjung bisa menikmati pengalaman petik langsung, jalur kebun yang tertata, dan area santai untuk keluarga.'
            : 'Area ini cocok untuk kunjungan santai, fotografi, dan menikmati lanskap bunga yang berubah sesuai musim kunjungan.';

        return ($destination['description'] ?? $fallback).' '.$followUp;
    }

    protected function buildRating(array $destination): string
    {
        if ($destination['status'] === 'Peak Status') {
            return '4.8';
        }

        if ($destination['status'] === 'Available') {
            return '4.6';
        }

        return '4.4';
    }

    protected function buildReviewLabel(array $destination): string
    {
        if ($destination['category'] === 'buah') {
            return $destination['status'] === 'Peak Status' ? '(2,4 ribu ulasan)' : '(1,7 ribu ulasan)';
        }

        return $destination['status'] === 'Peak Status' ? '(2,1 ribu ulasan)' : '(1,5 ribu ulasan)';
    }

    protected function buildFeaturedReview(array $destination): array
    {
        $reviewName = $destination['category'] === 'buah' ? 'Budi Santoso' : 'Dewi Larasati';
        $reviewQuote = $destination['category'] === 'buah'
            ? $destination['tags'].' terasa segar dan pengalaman petiknya tertata rapi. Cocok untuk datang pagi hari.'
            : 'Area '.$destination['tags'].' sangat fotogenik dan alur kunjungannya nyaman untuk keluarga.';

        return [
            'name' => $reviewName,
            'quote' => $reviewQuote,
            'rating' => 5,
            'avatar' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuDY0IWBG1GqDQQ9gtcMxFLm-xuz3nD3SKWVJpK_dzCRVVs5RVMrEtBy-tWysxEketbDlqCZMDHTA59t07H-kd_xU4wYZV0CgEEqDwfLxwfQcvfoafuZGg9Y2txr4mtRmagwZVU3_jsxiE1VQCIU_VfW68br6wkbyLGM8qc_86NxnlfmA7rjiSLDqyV-2Ml-vIvr5IMPw1oiSYskGmU25VRHSio_yWxiFELLd0f69n8-2yiGwU8mudpInN8Cq806ZWtZaHr_CGoGUszN',
        ];
    }

    protected function mapRecommendationStatus(string $status): string
    {
        return match ($status) {
            'Peak Status' => 'PEAK',
            'Available' => 'AVAILABLE',
            default => 'OFF-SEASON',
        };
    }

    protected function normalizeCategory(?string $category): ?string
    {
        return in_array($category, ['buah', 'bunga'], true) ? $category : null;
    }

    protected function normalizeDate(?string $date): ?string
    {
        return is_string($date) && strtotime($date) ? $date : null;
    }

    protected function calendarInsightMonths(): array
    {
        return [
            ['id' => 0, 'label' => 'Januari', 'shortLabel' => 'Jan', 'title' => 'Januari cocok untuk kebun yang tetap aktif saat musim hujan', 'description' => 'Awal tahun biasanya punya curah hujan tinggi di kawasan Batu. Aktivitas buah tetap ada, tetapi kebun bunga yang tahan udara lembap biasanya terlihat lebih segar.', 'rainfall' => 'Tinggi (musim hujan aktif)', 'temperature' => '18 - 23 C', 'humidity' => '83%', 'harvestIntensity' => 58, 'bloomIntensity' => 72],
            ['id' => 1, 'label' => 'Februari', 'shortLabel' => 'Feb', 'title' => 'Februari masih basah, cocok untuk kunjungan yang lebih santai', 'description' => 'Kelembapan masih tinggi dan beberapa komoditas buah tetap tersedia. Periode ini bagus untuk wisata yang tidak terlalu padat dengan suasana kebun yang masih hijau.', 'rainfall' => 'Sedang ke tinggi', 'temperature' => '18 - 24 C', 'humidity' => '82%', 'harvestIntensity' => 60, 'bloomIntensity' => 74],
            ['id' => 2, 'label' => 'Maret', 'shortLabel' => 'Mar', 'title' => 'Maret menjadi masa transisi menuju kondisi kebun yang lebih stabil', 'description' => 'Curah hujan mulai turun perlahan. Beberapa bunga mulai masuk fase tampil optimal, sementara kebun buah masih terjaga produktivitasnya untuk wisata petik.', 'rainfall' => 'Menengah', 'temperature' => '18 - 24 C', 'humidity' => '79%', 'harvestIntensity' => 64, 'bloomIntensity' => 76],
            ['id' => 3, 'label' => 'April', 'shortLabel' => 'Apr', 'title' => 'April sering jadi masa kebun terlihat segar dan nyaman dikunjungi', 'description' => 'Udara masih sejuk, hujan mulai berkurang, dan banyak area wisata terasa nyaman untuk eksplorasi. Masa ini cocok untuk kombinasi kunjungan buah dan bunga.', 'rainfall' => 'Menengah ke rendah', 'temperature' => '18 - 25 C', 'humidity' => '76%', 'harvestIntensity' => 68, 'bloomIntensity' => 80],
            ['id' => 4, 'label' => 'Mei', 'shortLabel' => 'Mei', 'title' => 'Mei mulai masuk periode yang lebih kering dan stabil', 'description' => 'Kondisi lapangan biasanya lebih bersahabat untuk perjalanan keluarga. Beberapa komoditas masuk masa aktif dengan kualitas visual kebun yang tetap menarik.', 'rainfall' => 'Rendah ke menengah', 'temperature' => '17 - 24 C', 'humidity' => '73%', 'harvestIntensity' => 74, 'bloomIntensity' => 79],
            ['id' => 5, 'label' => 'Juni', 'shortLabel' => 'Jun', 'title' => 'Juni adalah awal musim favorit untuk wisata agro Batu', 'description' => 'Udara cenderung lebih kering dan sejuk. Ini biasanya menjadi awal periode kuat untuk kunjungan buah serta beberapa taman bunga dengan kondisi taman yang rapi.', 'rainfall' => 'Rendah', 'temperature' => '17 - 23 C', 'humidity' => '70%', 'harvestIntensity' => 82, 'bloomIntensity' => 76],
            ['id' => 6, 'label' => 'Juli', 'shortLabel' => 'Jul', 'title' => 'Juli punya momentum kuat untuk panen dan wisata keluarga', 'description' => 'Musim kering di dataran tinggi Batu biasanya membuat akses kebun lebih nyaman. Beberapa komoditas buah dan bunga tampil baik untuk wisata, foto, dan aktivitas petik.', 'rainfall' => 'Rendah (musim kering)', 'temperature' => '16 - 23 C', 'humidity' => '68%', 'harvestIntensity' => 86, 'bloomIntensity' => 74],
            ['id' => 7, 'label' => 'Agustus', 'shortLabel' => 'Agu', 'title' => 'Agustus sering menjadi salah satu bulan paling ideal untuk berkunjung', 'description' => 'Hari cenderung cerah dengan kelembapan yang lebih terkontrol. Ini mendukung pengalaman wisata petik dan menjadikan lanskap kebun lebih nyaman untuk jelajah.', 'rainfall' => 'Rendah', 'temperature' => '17 - 24 C', 'humidity' => '67%', 'harvestIntensity' => 88, 'bloomIntensity' => 72],
            ['id' => 8, 'label' => 'September', 'shortLabel' => 'Sep', 'title' => 'September menjaga ritme panen sambil mulai menyiapkan transisi akhir tahun', 'description' => 'Banyak kebun masih aktif dan cuaca relatif nyaman. Bulan ini cocok untuk wisatawan yang ingin pengalaman lebih tenang sebelum akhir tahun makin ramai.', 'rainfall' => 'Rendah ke menengah', 'temperature' => '18 - 25 C', 'humidity' => '69%', 'harvestIntensity' => 84, 'bloomIntensity' => 75],
            ['id' => 9, 'label' => 'Oktober', 'shortLabel' => 'Okt', 'title' => 'Oktober sering terasa paling seimbang untuk buah dan bunga', 'description' => 'Transisi menuju hujan ringan membuat sebagian lahan tetap nyaman, sementara beberapa komoditas bunga mulai terlihat lebih hidup. Bulan ini pas untuk kunjungan campuran.', 'rainfall' => 'Menengah', 'temperature' => '18 - 25 C', 'humidity' => '73%', 'harvestIntensity' => 80, 'bloomIntensity' => 82],
            ['id' => 10, 'label' => 'November', 'shortLabel' => 'Nov', 'title' => 'November membawa kebun ke fase lembap dengan bunga yang mulai menonjol', 'description' => 'Hujan mulai lebih sering turun. Beberapa bunga merespons kondisi lembap dengan baik, sementara wisata buah tetap ada tetapi lebih dipengaruhi cuaca harian.', 'rainfall' => 'Menengah ke tinggi', 'temperature' => '18 - 24 C', 'humidity' => '79%', 'harvestIntensity' => 68, 'bloomIntensity' => 86],
            ['id' => 11, 'label' => 'Desember', 'shortLabel' => 'Des', 'title' => 'Desember cocok untuk pengunjung yang mencari suasana kebun yang segar', 'description' => 'Akhir tahun identik dengan hujan lebih rutin dan kelembapan tinggi. Lanskap bunga biasanya tampak subur, sementara aktivitas panen buah lebih selektif tergantung komoditas.', 'rainfall' => 'Tinggi', 'temperature' => '18 - 23 C', 'humidity' => '84%', 'harvestIntensity' => 56, 'bloomIntensity' => 88],
        ];
    }

    protected function calendarCommodities(): array
    {
        return [
            ['name' => 'Apel', 'category' => 'fruits', 'note' => 'Paling ramai saat kemarau sejuk.', 'ranges' => [['startMonth' => 0, 'startDay' => 1, 'endMonth' => 2, 'endDay' => 31, 'tone' => 'available'], ['startMonth' => 5, 'startDay' => 1, 'endMonth' => 10, 'endDay' => 30, 'tone' => 'available'], ['startMonth' => 6, 'startDay' => 10, 'endMonth' => 8, 'endDay' => 20, 'tone' => 'peak']]],
            ['name' => 'Jeruk', 'category' => 'fruits', 'note' => 'Umumnya aktif pada pertengahan tahun.', 'ranges' => [['startMonth' => 1, 'startDay' => 1, 'endMonth' => 4, 'endDay' => 30, 'tone' => 'available'], ['startMonth' => 7, 'startDay' => 1, 'endMonth' => 11, 'endDay' => 31, 'tone' => 'available'], ['startMonth' => 4, 'startDay' => 10, 'endMonth' => 6, 'endDay' => 31, 'tone' => 'peak']]],
            ['name' => 'Strawberry', 'category' => 'fruits', 'note' => 'Relatif tersedia panjang, terutama di greenhouse.', 'ranges' => [['startMonth' => 0, 'startDay' => 1, 'endMonth' => 11, 'endDay' => 31, 'tone' => 'available'], ['startMonth' => 5, 'startDay' => 15, 'endMonth' => 8, 'endDay' => 15, 'tone' => 'peak']]],
            ['name' => 'Jambu Kristal', 'category' => 'fruits', 'note' => 'Panennya relatif stabil sepanjang tahun.', 'ranges' => [['startMonth' => 0, 'startDay' => 1, 'endMonth' => 11, 'endDay' => 31, 'tone' => 'available']]],
            ['name' => 'Buah Naga', 'category' => 'fruits', 'note' => 'Cenderung kuat pada kemarau hingga awal hujan.', 'ranges' => [['startMonth' => 3, 'startDay' => 1, 'endMonth' => 9, 'endDay' => 31, 'tone' => 'available'], ['startMonth' => 6, 'startDay' => 1, 'endMonth' => 7, 'endDay' => 31, 'tone' => 'peak']]],
            ['name' => 'Krisan', 'category' => 'flowers', 'note' => 'Budidaya dataran tinggi bisa panen bertahap hampir sepanjang tahun.', 'ranges' => [['startMonth' => 0, 'startDay' => 1, 'endMonth' => 11, 'endDay' => 31, 'tone' => 'available'], ['startMonth' => 8, 'startDay' => 15, 'endMonth' => 11, 'endDay' => 15, 'tone' => 'peak']]],
            ['name' => 'Hortensia', 'category' => 'flowers', 'note' => 'Menarik saat area lembap dan suhu tetap sejuk.', 'ranges' => [['startMonth' => 2, 'startDay' => 1, 'endMonth' => 8, 'endDay' => 30, 'tone' => 'available'], ['startMonth' => 3, 'startDay' => 10, 'endMonth' => 6, 'endDay' => 31, 'tone' => 'peak']]],
            ['name' => 'Bunga Matahari', 'category' => 'flowers', 'note' => 'Lebih kuat saat cahaya matahari melimpah.', 'ranges' => [['startMonth' => 2, 'startDay' => 1, 'endMonth' => 8, 'endDay' => 15, 'tone' => 'available'], ['startMonth' => 3, 'startDay' => 1, 'endMonth' => 6, 'endDay' => 31, 'tone' => 'peak']]],
            ['name' => 'Aster', 'category' => 'flowers', 'note' => 'Cukup fleksibel di suhu Batu yang sejuk.', 'ranges' => [['startMonth' => 0, 'startDay' => 1, 'endMonth' => 11, 'endDay' => 31, 'tone' => 'available'], ['startMonth' => 6, 'startDay' => 1, 'endMonth' => 10, 'endDay' => 31, 'tone' => 'peak']]],
            ['name' => 'Dahlia', 'category' => 'flowers', 'note' => 'Tampil baik saat suhu sejuk dan tanah tidak terlalu becek.', 'ranges' => [['startMonth' => 1, 'startDay' => 1, 'endMonth' => 10, 'endDay' => 30, 'tone' => 'available'], ['startMonth' => 5, 'startDay' => 1, 'endMonth' => 8, 'endDay' => 30, 'tone' => 'peak']]],
        ];
    }

    protected function mapHomeDestination(Destination $destination): array
    {
        $mapped = $this->mapStoredDestination($destination);

        return [
            'slug' => $mapped['slug'],
            'image' => $mapped['image'],
            'title' => $mapped['title'],
            'location' => $mapped['location'],
            'coordinates' => $mapped['coordinates'],
            'tags' => $mapped['tags'],
            'status' => $mapped['status'],
            'time' => 'Buka '.$mapped['openingTime'],
            'category' => $mapped['category'],
            'description' => $mapped['description'],
        ];
    }

    protected function mapStoredDestination(Destination $destination): array
    {
        $visitInfo = $destination->visitInfo;
        $media = $destination->media;
        $pricing = $destination->pricing;

        return [
            'id' => (string) $destination->id,
            'slug' => $destination->slug,
            'image' => $this->resolveImagePath($media?->image_path ?? ''),
            'title' => $destination->title,
            'location' => $visitInfo?->location ?? '',
            'coordinates' => [
                'lat' => $visitInfo?->latitude ?? 0.0,
                'lng' => $visitInfo?->longitude ?? 0.0,
            ],
            'tags' => $destination->tags,
            'status' => $destination->status,
            'category' => $destination->category?->key ?? '',
            'description' => $destination->description,
            'openingTime' => $visitInfo?->opening_time ?? '08:00',
            'closingTime' => $visitInfo?->closing_time ?? '17:00',
            'ticketPrice' => $pricing?->ticket_price_label ?? 'Gratis',
            'ticketPriceValue' => $pricing?->ticket_price_value ?? 0,
            'recommendationPrice' => $pricing?->recommendation_price_label ?? $pricing?->ticket_price_label ?? 'Gratis',
            'recommendationPriceValue' => $pricing?->recommendation_price_value ?? $pricing?->ticket_price_value ?? 0,
            'landmarks' => $destination->landmarks
                ->sortBy('sort_order')
                ->pluck('landmark_key')
                ->values()
                ->all(),
            'seasonMonths' => $destination->seasonMonths
                ->sortBy('sort_order')
                ->pluck('month')
                ->map(fn (mixed $month): int => (int) $month)
                ->values()
                ->all(),
        ];
    }

    protected function mapRecommendationDestination(Destination $destination): array
    {
        $mapped = $this->mapStoredDestination($destination);

        return [
            'id' => $mapped['id'],
            'name' => $mapped['title'],
            'filterCategory' => $mapped['category'],
            'category' => $mapped['category'] === 'buah' ? 'Wisata Buah' : 'Wisata Bunga',
            'categoryIcon' => $mapped['category'] === 'buah' ? 'eco' : 'local_florist',
            'status' => $this->mapRecommendationStatus($mapped['status']),
            'price' => $mapped['recommendationPrice'],
            'priceValue' => $mapped['recommendationPriceValue'],
            'hours' => $mapped['openingTime'].' - '.$mapped['closingTime'],
            'specialty' => $mapped['tags'],
            'image' => $mapped['image'],
            'detailHref' => '/destinations/'.$mapped['slug'],
            'coordinates' => $mapped['coordinates'],
            'mapHref' => $this->openStreetMapHref($mapped['coordinates']['lat'], $mapped['coordinates']['lng']),
            'navigationHref' => $this->googleMapsDirectionsHref($mapped['coordinates']['lat'], $mapped['coordinates']['lng']),
            'landmarks' => $mapped['landmarks'],
            'seasonMonths' => $mapped['seasonMonths'],
        ];
    }

    protected function resolveImagePath(string $path): string
    {
        if ($path === '') {
            return '';
        }

        if (filter_var($path, FILTER_VALIDATE_URL)) {
            return $path;
        }

        $encodedPath = implode('/', array_map(
            static fn (string $segment): string => rawurlencode($segment),
            explode('/', ltrim($path, '/')),
        ));

        return asset($encodedPath);
    }

    protected function openStreetMapHref(float $latitude, float $longitude): string
    {
        return sprintf('https://www.openstreetmap.org/?mlat=%s&mlon=%s#map=16/%s/%s', $latitude, $longitude, $latitude, $longitude);
    }

    protected function googleMapsDirectionsHref(float $latitude, float $longitude): string
    {
        return sprintf('https://www.google.com/maps/dir/?api=1&destination=%s,%s&travelmode=driving', $latitude, $longitude);
    }

    protected function destinationQuery(): Builder
    {
        return Destination::query()->with([
            'category',
            'visitInfo',
            'media',
            'pricing',
            'display',
            'landmarks',
            'seasonMonths',
        ]);
    }
}

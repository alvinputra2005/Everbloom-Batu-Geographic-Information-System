import { destinations as homeDestinations } from '@/features/home/data';
import type { HomeDestination } from '@/features/home/types';

type DestinationStatIcon = 'ticket' | 'clock' | 'sprout' | 'users';
type DestinationFacilityIcon = 'car' | 'utensils' | 'waves' | 'tent' | 'wifi';
type DestinationStatusTone = 'peak' | 'available' | 'off-season';

interface DestinationStat {
    icon: DestinationStatIcon;
    label: string;
    value: string;
}

interface DestinationFacility {
    icon: DestinationFacilityIcon;
    label: string;
}

interface DestinationReviewMetric {
    label: string;
    score: number;
    width: string;
}

interface DestinationFeaturedReview {
    name: string;
    quote: string;
    rating: number;
    avatar: string;
}

interface DestinationPeakMonth {
    label: string;
    height: number;
    tone: 'primary' | 'secondary' | 'surface';
    active?: boolean;
}

interface DestinationSeasonalContent {
    updatedAt: string;
    highlightLabel: string;
    weatherDescription: string;
    produceDescription: string;
    peakMonths: DestinationPeakMonth[];
}

export interface DestinationDetail {
    slug: string;
    title: string;
    image: string;
    imageAlt: string;
    location: string;
    locationLabel: string;
    categoryLabel: string;
    statusLabel: string;
    statusTone: DestinationStatusTone;
    rating: string;
    reviewsLabel: string;
    ticketPrice: string;
    bookingLabel: string;
    description: string;
    stats: DestinationStat[];
    facilities: DestinationFacility[];
    address: string;
    mapImage: string;
    mapImageAlt: string;
    mapHref: string;
    navigationHref: string;
    reviewMetrics: DestinationReviewMetric[];
    featuredReview: DestinationFeaturedReview;
    seasonal: DestinationSeasonalContent;
}

const MAP_IMAGE =
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCbFijUZIYovifvURwZX7hKRui6wPLDzrif1-EpIupJ8F4_qXKl2a27sfuaV3suyulOk6MMVUpJL0uUmM58y1AgJ8eZyT1ZPy-b8hu4t-NgRetXnJBXIBs15FJQFLU3ls6ASRqvEYs-ENrdmygJDqxI4UubdnLeET2oiYc2JiBu3BcaYPUbtVGJ4JUiNAvZbnlAInCejCnZ0enEk-4bhQ9aXHj5i0lM420-vgmoYSDTQOTki9Q0Mm4dAq7O7C7M-cmkjno7FS1xWeTI';

const REVIEW_AVATAR =
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDY0IWBG1GqDQQ9gtcMxFLm-xuz3nD3SKWVJpK_dzCRVVs5RVMrEtBy-tWysxEketbDlqCZMDHTA59t07H-kd_xU4wYZV0CgEEqDwfLxwfQcvfoafuZGg9Y2txr4mtRmagwZVU3_jsxiE1VQCIU_VfW68br6wkbyLGM8qc_86NxnlfmA7rjiSLDqyV-2Ml-vIvr5IMPw1oiSYskGmU25VRHSio_yWxiFELLd0f69n8-2yiGwU8mudpInN8Cq806ZWtZaHr_CGoGUszN';

const supplementalDestinations: HomeDestination[] = [
    {
        slug: 'kebun-apel-bumiaji',
        title: 'Kebun Apel Bumiaji',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBYL8C7GZgt7_YFv2LND0HcLEQ4a-a-FS8LczSFtOBTYMDfymTs2f5fchtP473OFhtUaTJj53GUUHSZUYljHHS63W6WNlhCEwjzCGA8DU3B1iolIAzDU0d-Fu1knm9O6l1ItM7LWw96VmSr444O4IWFP2qUPv_jWnawWQMKf5IJe3d6fjBYcD4H79r5mRTTg6_oGY8YXwV33CXb7UtP7xuii-gCwgLcjKanA-_Y8vo5OVXV-e3rEviXS92R8fMUCCeSktw2gdZwRWh_',
        location: 'Bumiaji, Batu',
        tags: 'Manalagi Apple',
        status: 'Peak Status',
        time: 'Buka 08:00',
        category: 'buah',
        description: 'Kebun apel dataran tinggi dengan jalur petik yang nyaman untuk kunjungan keluarga dan rombongan kecil.',
    },
    {
        slug: 'pusat-bunga-sidomulyo',
        title: 'Pusat Bunga Sidomulyo',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCNP3ODtQnx9VdfnZcEq-TWyn4LKqo0irgW4vrRwFB7MPjNSEzWWj2mDRL0j_0NMAGPRIrq4dRw4Qr3iOjwpjZH3r55RjQuJwxqJurlVemFxbQCfqblgEADnBCgOJ-p-0o7mA0DCRMbWqJDR-_SAkG3hnMosIpU4PITx-XnIQxVIdz2noxfyqWmL1Qv2RJbtRJ0jfJdBGKfM6lqJ3VPTmCynup9d_zi6HEL6RBR5gPGO9fXd-NCBU1k8NpGcbIjBukNSXfTEdxrM0V6',
        location: 'Sidomulyo, Batu',
        tags: 'Roses & Orchids',
        status: 'Available',
        time: 'Buka 07:00',
        category: 'bunga',
        description: 'Sentra florikultura Batu dengan deretan kios bunga, area edukasi, dan suasana kampung wisata yang aktif sepanjang hari.',
    },
];

const ticketPriceBySlug: Record<string, string> = {
    'kusuma-agro': 'Rp 80.000',
    'petik-apel-kebun-8': 'Rp 35.000',
    'agrowisata-petik-jeruk': 'Rp 20.000',
    'agrorakyat-apple-packing': 'Rp 25.000',
    'lumbung-strawberry': 'Rp 30.000',
    'taman-bunga-selecta': 'Rp 15.000',
    'batu-love-garden': 'Rp 25.000',
    'kebun-hortensia': 'Rp 10.000',
    'wisata-kebun-bunga-coban-talun': 'Rp 15.000',
    'ladang-bunga-matahari': 'Rp 12.000',
    'kebun-apel-bumiaji': 'Rp 25.000',
    'pusat-bunga-sidomulyo': 'Free Entry',
};

const audienceByCategory = {
    buah: 'Keluarga & Rombongan',
    bunga: 'Keluarga & Fotografer',
} as const;

const facilitiesByCategory: Record<HomeDestination['category'], DestinationFacility[]> = {
    buah: [
        { icon: 'car', label: 'Parkir Luas' },
        { icon: 'utensils', label: 'Kedai Kebun' },
        { icon: 'waves', label: 'Toilet Bersih' },
        { icon: 'tent', label: 'Musholla' },
        { icon: 'wifi', label: 'Area Istirahat' },
    ],
    bunga: [
        { icon: 'car', label: 'Parkir Wisata' },
        { icon: 'utensils', label: 'Kios Kuliner' },
        { icon: 'waves', label: 'Toilet Bersih' },
        { icon: 'tent', label: 'Gazebo Taman' },
        { icon: 'wifi', label: 'Spot Foto' },
    ],
};

const peakMonthsByCategory: Record<HomeDestination['category'], DestinationPeakMonth[]> = {
    buah: [
        { label: 'Jan', height: 36, tone: 'surface' },
        { label: 'Feb', height: 52, tone: 'secondary' },
        { label: 'Mar', height: 78, tone: 'primary' },
        { label: 'Apr', height: 96, tone: 'primary', active: true },
        { label: 'Mei', height: 84, tone: 'primary' },
        { label: 'Jun', height: 60, tone: 'secondary' },
    ],
    bunga: [
        { label: 'Jan', height: 48, tone: 'secondary' },
        { label: 'Feb', height: 68, tone: 'primary' },
        { label: 'Mar', height: 92, tone: 'primary', active: true },
        { label: 'Apr', height: 86, tone: 'primary' },
        { label: 'Mei', height: 62, tone: 'secondary' },
        { label: 'Jun', height: 40, tone: 'surface' },
    ],
};

const reviewMetricsByStatus: Record<HomeDestination['status'], DestinationReviewMetric[]> = {
    'Peak Status': [
        { label: 'Kebersihan', score: 4.9, width: '95%' },
        { label: 'Pelayanan', score: 4.7, width: '88%' },
        { label: 'Fasilitas', score: 4.8, width: '92%' },
    ],
    Available: [
        { label: 'Kebersihan', score: 4.7, width: '90%' },
        { label: 'Pelayanan', score: 4.6, width: '86%' },
        { label: 'Fasilitas', score: 4.6, width: '86%' },
    ],
    'Off-Season': [
        { label: 'Kebersihan', score: 4.5, width: '84%' },
        { label: 'Pelayanan', score: 4.4, width: '82%' },
        { label: 'Fasilitas', score: 4.4, width: '81%' },
    ],
};

const statusToneByLabel: Record<HomeDestination['status'], DestinationStatusTone> = {
    'Peak Status': 'peak',
    Available: 'available',
    'Off-Season': 'off-season',
};

const categoryLabelByKey = {
    buah: 'Fruit & Harvest',
    bunga: 'Flower Village',
} as const;

const allDestinations = [...(homeDestinations as HomeDestination[]), ...supplementalDestinations];

function inferClosingHour(category: HomeDestination['category']) {
    return category === 'buah' ? '17:00' : '18:00';
}

function buildOpenHours(time: string, category: HomeDestination['category']) {
    const openingHour = time.replace('Buka ', '');
    return `${openingHour} - ${inferClosingHour(category)}`;
}

function buildCommoditySummary(destination: HomeDestination) {
    return destination.category === 'buah' ? destination.tags : `Area ${destination.tags}`;
}

function buildDescription(destination: HomeDestination) {
    const fallbackDescription =
        destination.category === 'buah'
            ? 'Destinasi agrowisata petik buah dengan udara sejuk dan panorama perbukitan khas Kota Batu.'
            : 'Destinasi wisata bunga dengan suasana taman terbuka, warna yang kuat, dan pengalaman jalan santai.';

    const summary = destination.description ?? fallbackDescription;
    const followUp =
        destination.category === 'buah'
            ? 'Pengunjung bisa menikmati pengalaman petik langsung, jalur kebun yang tertata, dan area santai untuk keluarga.'
            : 'Area ini cocok untuk kunjungan santai, fotografi, dan menikmati lanskap bunga yang berubah sesuai musim kunjungan.';

    return `${summary} ${followUp}`;
}

function buildLocationLabel(destination: HomeDestination) {
    return `${destination.location}, Jawa Timur`;
}

function buildRating(destination: HomeDestination) {
    if (destination.status === 'Peak Status') {
        return '4.8';
    }

    if (destination.status === 'Available') {
        return '4.6';
    }

    return '4.4';
}

function buildReviewLabel(destination: HomeDestination) {
    if (destination.category === 'buah') {
        return destination.status === 'Peak Status' ? '(2.4k reviews)' : '(1.7k reviews)';
    }

    return destination.status === 'Peak Status' ? '(2.1k reviews)' : '(1.5k reviews)';
}

function buildFeaturedReview(destination: HomeDestination): DestinationFeaturedReview {
    const reviewName = destination.category === 'buah' ? 'Budi Santoso' : 'Dewi Larasati';
    const reviewQuote =
        destination.category === 'buah'
            ? `${destination.tags} terasa segar dan pengalaman petiknya tertata rapi. Cocok untuk datang pagi hari.`
            : `Area ${destination.tags} sangat fotogenik dan alur kunjungannya nyaman untuk keluarga.`;

    return {
        name: reviewName,
        quote: reviewQuote,
        rating: 5,
        avatar: REVIEW_AVATAR,
    };
}

function buildSeasonal(destination: HomeDestination): DestinationSeasonalContent {
    return {
        updatedAt: 'April 2026',
        highlightLabel: `Musim ${destination.tags}`,
        weatherDescription:
            destination.category === 'buah'
                ? 'Langit cenderung cerah dengan suhu 18C - 24C, ideal untuk aktivitas petik dan berjalan di area kebun.'
                : 'Cuaca sejuk dengan cahaya pagi yang lembut membuat warna bunga terlihat lebih kontras untuk eksplorasi dan foto.',
        produceDescription:
            destination.category === 'buah'
                ? `${destination.tags} menjadi daya tarik utama pada periode ini dengan kualitas panen yang stabil.`
                : `${destination.tags} tampil paling menarik pada periode ini dengan warna bunga yang lebih merata dan area taman yang aktif.`,
        peakMonths: peakMonthsByCategory[destination.category],
    };
}

function buildAddress(destination: HomeDestination) {
    return `Kawasan ${destination.location}, Kota Batu, Jawa Timur`;
}

function buildDestinationDetail(destination: HomeDestination): DestinationDetail {
    const ticketPrice = ticketPriceBySlug[destination.slug] ?? (destination.category === 'buah' ? 'Rp 25.000' : 'Rp 15.000');

    return {
        slug: destination.slug,
        title: destination.title,
        image: destination.image,
        imageAlt: `${destination.title} di ${destination.location}`,
        location: destination.location,
        locationLabel: buildLocationLabel(destination),
        categoryLabel: categoryLabelByKey[destination.category],
        statusLabel: destination.status,
        statusTone: statusToneByLabel[destination.status],
        rating: buildRating(destination),
        reviewsLabel: buildReviewLabel(destination),
        ticketPrice,
        bookingLabel: ticketPrice === 'Free Entry' ? 'Kunjungi Sekarang' : 'Pesan Tiket Sekarang',
        description: buildDescription(destination),
        stats: [
            { icon: 'ticket', label: 'HTM Mulai', value: ticketPrice },
            { icon: 'clock', label: 'Jam Buka', value: buildOpenHours(destination.time, destination.category) },
            { icon: 'sprout', label: 'Komoditas', value: buildCommoditySummary(destination) },
            { icon: 'users', label: 'Cocok Untuk', value: audienceByCategory[destination.category] },
        ],
        facilities: facilitiesByCategory[destination.category],
        address: buildAddress(destination),
        mapImage: MAP_IMAGE,
        mapImageAlt: `Peta area ${destination.title}`,
        mapHref: '#map',
        navigationHref: '#map',
        reviewMetrics: reviewMetricsByStatus[destination.status],
        featuredReview: buildFeaturedReview(destination),
        seasonal: buildSeasonal(destination),
    };
}

const detailMap = Object.fromEntries(allDestinations.map((destination) => [destination.slug, buildDestinationDetail(destination)])) as Record<
    string,
    DestinationDetail
>;

export const destinationDetailSlugs = Object.keys(detailMap);

export function getDestinationDetailBySlug(slug: string) {
    return detailMap[slug] ?? null;
}

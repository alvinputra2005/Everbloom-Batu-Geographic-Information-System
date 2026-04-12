import agrorakyatApplePacking from '../../../images/Agrorakyat-Apple-Packing Tourism.jpeg';
import agrowisataPetikJeruk from '../../../images/Agrowisata-Petik-Jeruk.webp';
import batuLoveGarden from '../../../images/Batu-Love-Garden.jpg';
import kebunHortensia from '../../../images/Kebun-Hortensia.jpg';
import kusumaAgro from '../../../images/Kusuma-agro-valid.jpg';
import ladangBungaMatahari from '../../../images/Ladang-Bunga-Matahari.avif';
import lumbungStrawberry from '../../../images/Lumbung-strawberry.webp';
import petikApelKebun8 from '../../../images/Petik-Apel-Kebun-8-Kota-Batu.jpeg';
import selectaGarden from '../../../images/Selecta-Garden.jpg';
import cobanTalunFlowerGarden from '../../../images/Wisata-kebun-bunga-coban-talun.jpg';

export const destinationFilters = [
    { key: 'all', label: 'Semua' },
    { key: 'buah', label: 'Wisata Buah' },
    { key: 'bunga', label: 'Wisata Bunga' },
];

export const destinations = [
    {
        slug: 'kusuma-agro',
        image: kusumaAgro,
        title: 'Kusuma Agro',
        location: 'Sisir, Batu',
        tags: 'Panen Apel & Jeruk',
        status: 'Peak Status',
        time: 'Buka 08:00',
        category: 'buah',
        description: 'Wisata petik buah dengan panorama perbukitan dan area kebun yang luas.',
    },
    {
        slug: 'petik-apel-kebun-8',
        image: petikApelKebun8,
        title: 'Petik Apel Kebun 8',
        location: 'Bumiaji, Batu',
        tags: 'Apel Manalagi',
        status: 'Peak Status',
        time: 'Buka 08:30',
        category: 'buah',
        description: 'Destinasi petik apel yang populer untuk menikmati buah segar langsung dari pohonnya.',
    },
    {
        slug: 'agrowisata-petik-jeruk',
        image: agrowisataPetikJeruk,
        title: 'Agrowisata Petik Jeruk',
        location: 'Bumiaji, Batu',
        tags: 'Jeruk Keprok Batu',
        status: 'Available',
        time: 'Buka 08:00',
        category: 'buah',
        description: 'Kebun jeruk yang cocok untuk keluarga dengan suasana segar khas dataran tinggi.',
    },
    {
        slug: 'agrorakyat-apple-packing',
        image: agrorakyatApplePacking,
        title: 'Agrorakyat Apple Packing',
        location: 'Punten, Batu',
        tags: 'Edukasi Apel Batu',
        status: 'Available',
        time: 'Buka 09:00',
        category: 'buah',
        description: 'Perpaduan wisata edukasi dan produk apel lokal yang menarik untuk kunjungan singkat.',
    },
    {
        slug: 'lumbung-strawberry',
        image: lumbungStrawberry,
        title: 'Lumbung Strawberry',
        location: 'Pandanrejo, Batu',
        tags: 'Greenhouse Strawberry',
        status: 'Off-Season',
        time: 'Buka 09:00',
        category: 'buah',
        description: 'Greenhouse stroberi dengan pengalaman panen langsung dan suasana yang nyaman.',
    },
    {
        slug: 'taman-bunga-selecta',
        image: selectaGarden,
        title: 'Taman Bunga Selecta',
        location: 'Tulungrejo, Batu',
        tags: 'Krisan & Hydrangea',
        status: 'Available',
        time: 'Buka 07:00',
        category: 'bunga',
        description: 'Taman bunga ikonik dengan hamparan warna yang luas dan udara pegunungan yang sejuk.',
    },
    {
        slug: 'batu-love-garden',
        image: batuLoveGarden,
        title: 'Batu Love Garden',
        location: 'Oro-Oro Ombo, Batu',
        tags: 'Taman Florikultura',
        status: 'Available',
        time: 'Buka 08:30',
        category: 'bunga',
        description: 'Ruang wisata bunga modern dengan spot foto tematik dan koleksi tanaman hias.',
    },
    {
        slug: 'kebun-hortensia',
        image: kebunHortensia,
        title: 'Kebun Hortensia',
        location: 'Tulungrejo, Batu',
        tags: 'Hydrangea Highlands',
        status: 'Peak Status',
        time: 'Buka 08:00',
        category: 'bunga',
        description: 'Hamparan hortensia di area sejuk yang cocok untuk wisata santai dan fotografi.',
    },
    {
        slug: 'wisata-kebun-bunga-coban-talun',
        image: cobanTalunFlowerGarden,
        title: 'Kebun Bunga Coban Talun',
        location: 'Gunungsari, Batu',
        tags: 'Garden Trail',
        status: 'Available',
        time: 'Buka 08:00',
        category: 'bunga',
        description: 'Area kebun bunga yang berpadu dengan lanskap alam dan jalur wisata keluarga.',
    },
    {
        slug: 'ladang-bunga-matahari',
        image: ladangBungaMatahari,
        title: 'Ladang Bunga Matahari',
        location: 'Bumiaji, Batu',
        tags: 'Sunflower Field',
        status: 'Peak Status',
        time: 'Buka 08:00',
        category: 'bunga',
        description: 'Ladang bunga matahari dengan karakter visual kuat untuk kunjungan dan swafoto.',
    },
];

export function getDestinationsByCategory(category = 'all') {
    if (category === 'buah' || category === 'bunga') {
        return destinations.filter((destination) => destination.category === category);
    }

    return destinations;
}

export function getFeaturedDestinations(category = 'all') {
    if (category === 'buah' || category === 'bunga') {
        return getDestinationsByCategory(category);
    }

    const fruit = destinations.filter((destination) => destination.category === 'buah').slice(0, 3);
    const flower = destinations.filter((destination) => destination.category === 'bunga').slice(0, 3);

    return [...fruit, ...flower];
}

export function getDestinationBySlug(slug) {
    return destinations.find((destination) => destination.slug === slug);
}

export default destinations;

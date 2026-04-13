import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

import SectionContainer from '@/components/common/SectionContainer';
import { destinations as homeDestinations } from '@/features/home/data';
import RecommendationFilters from '@/features/recommendations/components/RecommendationFilters';
import RecommendationHero from '@/features/recommendations/components/RecommendationHero';
import RecommendationList from '@/features/recommendations/components/RecommendationList';
import RecommendationVisitDateFilter from '@/features/recommendations/components/RecommendationVisitDateFilter';
import type { LandmarkOption, NearbyInsight, RecommendationDestination, RecommendationHeroContent } from '@/features/recommendations/types';
import MainLayout from '@/layouts/MainLayout';

const HERO_CONTENT: RecommendationHeroContent = {
    monthLabel: 'July 2024',
    categoryLabel: 'Fruits & Flowers',
    title: 'The Harvest Season is Here',
    description:
        "Juli is great for sunflowers and citrus harvest. The dry mountain air in Batu provides perfect clarity for scenic orchard strolls. Based on your preferences, we've curated the best spots for this month.",
    insightLabel: 'Insight',
    insightText: 'High bloom intensity detected in northern Batu slopes today. Perfect for photography.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBYL8C7GZgt7_YFv2LND0HcLEQ4a-a-FS8LczSFtOBTYMDfymTs2f5fchtP473OFhtUaTJj53GUUHSZUYljHHS63W6WNlhCEwjzCGA8DU3B1iolIAzDU0d-Fu1knm9O6l1ItM7LWw96VmSr444O4IWFP2qUPv_jWnawWQMKf5IJe3d6fjBYcD4H79r5mRTTg6_oGY8YXwV33CXb7UtP7xuii-gCwgLcjKanA-_Y8vo5OVXV-e3rEviXS92R8fMUCCeSktw2gdZwRWh_',
    imageAlt: 'Batu Orchard',
};

const RECOMMENDED_DESTINATIONS: RecommendationDestination[] = [
    {
        id: '1',
        name: 'Kebun Apal Bumiaji',
        category: 'Fruit & Harvest',
        categoryIcon: 'eco',
        status: 'PEAK',
        price: 'Rp 25.000',
        priceValue: 25000,
        hours: '08:00 - 17:00',
        specialty: 'Manalagi Apple',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBYL8C7GZgt7_YFv2LND0HcLEQ4a-a-FS8LczSFtOBTYMDfymTs2f5fchtP473OFhtUaTJj53GUUHSZUYljHHS63W6WNlhCEwjzCGA8DU3B1iolIAzDU0d-Fu1knm9O6l1ItM7LWw96VmSr444O4IWFP2qUPv_jWnawWQMKf5IJe3d6fjBYcD4H79r5mRTTg6_oGY8YXwV33CXb7UtP7xuii-gCwgLcjKanA-_Y8vo5OVXV-e3rEviXS92R8fMUCCeSktw2gdZwRWh_',
        detailHref: '#',
        mapHref: '#map',
        landmarks: ['jatim-park-1', 'museum-angkut'],
        seasonMonths: [5, 6, 7],
    },
    {
        id: '2',
        name: 'Pusat Bunga Sidomulyo',
        category: 'Flower Village',
        categoryIcon: 'local_florist',
        status: 'AVAILABLE',
        price: 'Free Entry',
        priceValue: 0,
        hours: '07:00 - 18:00',
        specialty: 'Roses & Orchids',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCNP3ODtQnx9VdfnZcEq-TWyn4LKqo0irgW4vrRwFB7MPjNSEzWWj2mDRL0j_0NMAGPRIrq4dRw4Qr3iOjwpjZH3r55RjQuJwxqJurlVemFxbQCfqblgEADnBCgOJ-p-0o7mA0DCRMbWqJDR-_SAkG3hnMosIpU4PITx-XnIQxVIdz2noxfyqWmL1Qv2RJbtRJ0jfJdBGKfM6lqJ3VPTmCynup9d_zi6HEL6RBR5gPGO9fXd-NCBU1k8NpGcbIjBukNSXfTEdxrM0V6',
        detailHref: '#',
        mapHref: '#map',
        landmarks: ['alun-alun-batu', 'jatim-park-2'],
        seasonMonths: [3, 4, 5, 6],
    },
];

const LANDMARK_CYCLE = [
    ['jatim-park-1', 'museum-angkut'],
    ['alun-alun-batu', 'jatim-park-2'],
    ['museum-angkut', 'alun-alun-batu'],
    ['jatim-park-2', 'jatim-park-1'],
];

const SEASON_MONTH_CYCLE = [
    [5, 6, 7],
    [3, 4, 5, 6],
    [0, 1, 10, 11],
    [7, 8, 9],
];

const LANDMARKS: LandmarkOption[] = [
    { id: 'jatim-park-1', name: 'Jatim Park 1' },
    { id: 'museum-angkut', name: 'Museum Angkut' },
    { id: 'alun-alun-batu', name: 'Alun-Alun Batu' },
    { id: 'jatim-park-2', name: 'Jatim Park 2' },
];

const HOME_DESTINATION_RECOMMENDATIONS: RecommendationDestination[] = homeDestinations.slice(0, 6).map((destination, index) => ({
    id: `home-${destination.slug}`,
    name: destination.title,
    category: destination.category === 'buah' ? 'Fruit & Harvest' : 'Flower Village',
    categoryIcon: destination.category === 'buah' ? 'eco' : 'local_florist',
    status: destination.status === 'Peak Status' ? 'PEAK' : destination.status === 'Available' ? 'AVAILABLE' : 'OFF-SEASON',
    price: destination.category === 'buah' ? (index % 2 === 0 ? 'Rp 35.000' : 'Rp 20.000') : index % 2 === 0 ? 'Rp 15.000' : 'Free Entry',
    priceValue: destination.category === 'buah' ? (index % 2 === 0 ? 35000 : 20000) : index % 2 === 0 ? 15000 : 0,
    hours: destination.time.replace('Buka ', '') + ' - 17:00',
    specialty: destination.tags,
    image: destination.image,
    detailHref: '#',
    mapHref: '#map',
    landmarks: LANDMARK_CYCLE[index % LANDMARK_CYCLE.length],
    seasonMonths: SEASON_MONTH_CYCLE[index % SEASON_MONTH_CYCLE.length],
}));

const NEARBY_INSIGHT: NearbyInsight = {
    title: 'Explore Nearby',
    description: 'There are 12 more agro-destinations within a 5km radius from your current selection.',
    countLabel: '12 Nearby Spots',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBz5jIy4_Pr-jbJIWOqS3_9I7eEqui0YaHjoB6BcWFtkpcSdvUWoIouDySB6prS1FqHrfNwUtDVyTtIxBGacwSC9FEgfNhGrfY2GOvLwTZ4dPCw-8BcqWOL65aLrqFVZcxal7HZfmPegeqqS7NeJ59qrLMtQIGFKAu13_ZFYBY0XJWjUkEHn5M4oUtpgyJsu02h1ei2Mnna1lztua92v70tCB4MjSvzcGMdtGy6MnJoEG-nV_68LuvojhHskn_2veo2U2aot4me4TVs',
    imageAlt: 'Batu Map',
    href: '#map',
};

export default function RecommendationResultPage() {
    const allDestinations = [...RECOMMENDED_DESTINATIONS, ...HOME_DESTINATION_RECOMMENDATIONS];
    const minAvailablePrice = 0;
    const maxAvailablePrice = Math.max(...allDestinations.map((destination) => destination.priceValue));
    const [currentMinPrice, setCurrentMinPrice] = useState(minAvailablePrice);
    const [currentMaxPrice, setCurrentMaxPrice] = useState(maxAvailablePrice);
    const [selectedLandmarks, setSelectedLandmarks] = useState<string[]>([]);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [sortBy, setSortBy] = useState<'recommended' | 'price-low' | 'price-high' | 'name'>('recommended');

    const filteredDestinations = allDestinations
        .filter((destination) => {
            const matchesPrice = destination.priceValue >= currentMinPrice && destination.priceValue <= currentMaxPrice;
            const matchesLandmark = selectedLandmarks.length === 0 || destination.landmarks.some((landmark) => selectedLandmarks.includes(landmark));
            const matchesDate = selectedDate === null || destination.seasonMonths.includes(selectedDate.getMonth());

            return matchesPrice && matchesLandmark && matchesDate;
        })
        .sort((left, right) => {
            if (sortBy === 'price-low') {
                return left.priceValue - right.priceValue;
            }

            if (sortBy === 'price-high') {
                return right.priceValue - left.priceValue;
            }

            if (sortBy === 'name') {
                return left.name.localeCompare(right.name);
            }

            return 0;
        });

    const handleToggleLandmark = (landmarkId: string) => {
        setSelectedLandmarks((current) => (current.includes(landmarkId) ? current.filter((item) => item !== landmarkId) : [...current, landmarkId]));
    };

    const handleMinPriceChange = (value: number) => {
        const normalizedValue = Number.isNaN(value) ? minAvailablePrice : value;
        const clampedValue = Math.min(Math.max(normalizedValue, minAvailablePrice), currentMaxPrice);
        setCurrentMinPrice(clampedValue);
    };

    const handleMaxPriceChange = (value: number) => {
        const normalizedValue = Number.isNaN(value) ? maxAvailablePrice : value;
        const clampedValue = Math.max(Math.min(normalizedValue, maxAvailablePrice), currentMinPrice);
        setCurrentMaxPrice(clampedValue);
    };

    const resetAllFilters = () => {
        setCurrentMinPrice(minAvailablePrice);
        setCurrentMaxPrice(maxAvailablePrice);
        setSelectedLandmarks([]);
        setSelectedDate(null);
    };

    return (
        <MainLayout>
            <SectionContainer className="recommendation-experience bg-[var(--rec-background)] pt-6 pb-16 md:pt-8">
                <RecommendationHero hero={HERO_CONTENT} />

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                    <RecommendationFilters
                        landmarks={LANDMARKS}
                        nearby={NEARBY_INSIGHT}
                        selectedDate={selectedDate}
                        selectedLandmarks={selectedLandmarks}
                        currentMinPrice={currentMinPrice}
                        currentMaxPrice={currentMaxPrice}
                        minPriceValue={minAvailablePrice}
                        maxPriceValue={maxAvailablePrice}
                        onToggleLandmark={handleToggleLandmark}
                        onMinPriceChange={handleMinPriceChange}
                        onMaxPriceChange={handleMaxPriceChange}
                        onRemoveDate={() => setSelectedDate(null)}
                        onRemovePrice={() => {
                            setCurrentMinPrice(minAvailablePrice);
                            setCurrentMaxPrice(maxAvailablePrice);
                        }}
                        onResetAll={resetAllFilters}
                    />

                    <section id="recommendations" className="space-y-5 lg:col-span-9">
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                            <div className="max-w-xl flex-1">
                                <RecommendationVisitDateFilter selectedDate={selectedDate} onSelectDate={setSelectedDate} />
                            </div>

                            <div className="w-full lg:w-[320px]">
                                <div className="flex items-center gap-3 rounded-full bg-white/85 px-5 shadow-[0_12px_40px_rgba(27,28,25,0.06)] backdrop-blur-2xl">
                                    <span className="shrink-0 text-sm font-semibold text-[var(--rec-on-surface)]">Sort By:</span>
                                    <div className="relative min-w-0 flex-1">
                                        <select
                                            value={sortBy}
                                            onChange={(event) => setSortBy(event.target.value as typeof sortBy)}
                                            className="w-full cursor-pointer appearance-none border-none bg-transparent py-3 pr-8 text-sm font-semibold text-[var(--rec-on-surface)] outline-none"
                                        >
                                            <option value="recommended">Recommended</option>
                                            <option value="price-low">Price Low to High</option>
                                            <option value="price-high">Price High to Low</option>
                                            <option value="name">Name (A-Z)</option>
                                        </select>
                                        <ChevronDown className="pointer-events-none absolute top-1/2 right-0 h-4 w-4 -translate-y-1/2 text-[var(--rec-primary)]" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <RecommendationList destinations={filteredDestinations} />
                    </section>
                </div>
            </SectionContainer>
        </MainLayout>
    );
}

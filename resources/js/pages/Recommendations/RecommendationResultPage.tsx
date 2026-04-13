import { format, parseISO } from 'date-fns';
import { id as indonesianLocale } from 'date-fns/locale';
import { ChevronDown, Leaf } from 'lucide-react';
import { useEffect, useState } from 'react';

import SectionContainer from '@/components/common/SectionContainer';
import type { HomeDestinationCategory, HomeDestinationFilter } from '@/features/home/types';
import RecommendationFilters from '@/features/recommendations/components/RecommendationFilters';
import RecommendationHero from '@/features/recommendations/components/RecommendationHero';
import RecommendationList from '@/features/recommendations/components/RecommendationList';
import RecommendationVisitDateFilter from '@/features/recommendations/components/RecommendationVisitDateFilter';
import type { LandmarkOption, NearbyInsight, RecommendationDestination, RecommendationHeroContent } from '@/features/recommendations/types';
import MainLayout from '@/layouts/MainLayout';

interface RecommendationResultPageProps {
    filters?: {
        date?: string | null;
        category?: Exclude<HomeDestinationCategory, 'all'> | null;
    };
    categories: HomeDestinationFilter[];
    destinations: RecommendationDestination[];
    landmarks: LandmarkOption[];
    heroContentBase: RecommendationHeroContent;
    nearbyInsight: NearbyInsight;
}

function getInitialSelectedDate(date: string | null | undefined) {
    if (!date) {
        return null;
    }

    const parsedDate = parseISO(date);

    return Number.isNaN(parsedDate.getTime()) ? null : parsedDate;
}

function buildFilterQuery(selectedDate: Date | null, selectedCategory: HomeDestinationCategory) {
    const searchParams = new URLSearchParams();

    if (selectedDate) {
        searchParams.set('date', format(selectedDate, 'yyyy-MM-dd'));
    }

    if (selectedCategory !== 'all') {
        searchParams.set('category', selectedCategory);
    }

    return searchParams.toString();
}

export default function RecommendationResultPage({
    filters,
    categories,
    destinations,
    landmarks,
    heroContentBase,
    nearbyInsight,
}: RecommendationResultPageProps) {
    const initialCategory = filters?.category === 'buah' || filters?.category === 'bunga' ? filters.category : 'all';
    const minAvailablePrice = 0;
    const maxAvailablePrice = Math.max(...destinations.map((destination) => destination.priceValue));
    const [currentMinPrice, setCurrentMinPrice] = useState(minAvailablePrice);
    const [currentMaxPrice, setCurrentMaxPrice] = useState(maxAvailablePrice);
    const [selectedLandmarks, setSelectedLandmarks] = useState<string[]>([]);
    const [selectedDate, setSelectedDate] = useState<Date | null>(getInitialSelectedDate(filters?.date));
    const [selectedCategory, setSelectedCategory] = useState<HomeDestinationCategory>(initialCategory);
    const [sortBy, setSortBy] = useState<'recommended' | 'price-low' | 'price-high' | 'name'>('recommended');
    const activeCategoryLabel = categories.find((category) => category.key === selectedCategory)?.label ?? 'Semua';
    const heroContent: RecommendationHeroContent = {
        ...heroContentBase,
        monthLabel: selectedDate ? format(selectedDate, 'MMMM yyyy', { locale: indonesianLocale }) : heroContentBase.monthLabel,
        categoryLabel: selectedCategory === 'all' ? 'Wisata Buah & Bunga' : activeCategoryLabel,
    };

    useEffect(() => {
        const query = buildFilterQuery(selectedDate, selectedCategory);
        const nextUrl = query ? `/destinations?${query}` : '/destinations';

        window.history.replaceState(window.history.state, '', nextUrl);
    }, [selectedCategory, selectedDate]);

    const filteredDestinations = destinations
        .filter((destination) => {
            const matchesPrice = destination.priceValue >= currentMinPrice && destination.priceValue <= currentMaxPrice;
            const matchesCategory = selectedCategory === 'all' || destination.filterCategory === selectedCategory;
            const matchesLandmark = selectedLandmarks.length === 0 || destination.landmarks.some((landmark) => selectedLandmarks.includes(landmark));
            const matchesDate = selectedDate === null || destination.seasonMonths.includes(selectedDate.getMonth());

            return matchesPrice && matchesCategory && matchesLandmark && matchesDate;
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
        setSelectedCategory('all');
    };

    return (
        <MainLayout>
            <SectionContainer className="recommendation-experience bg-[var(--rec-background)] pt-6 pb-16 md:pt-8">
                <RecommendationHero hero={heroContent} />

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                    <RecommendationFilters
                        landmarks={landmarks}
                        nearby={nearbyInsight}
                        selectedDate={selectedDate}
                        selectedCategory={selectedCategory}
                        categories={categories}
                        selectedLandmarks={selectedLandmarks}
                        currentMinPrice={currentMinPrice}
                        currentMaxPrice={currentMaxPrice}
                        minPriceValue={minAvailablePrice}
                        maxPriceValue={maxAvailablePrice}
                        onToggleLandmark={handleToggleLandmark}
                        onMinPriceChange={handleMinPriceChange}
                        onMaxPriceChange={handleMaxPriceChange}
                        onRemoveDate={() => setSelectedDate(null)}
                        onRemoveCategory={() => setSelectedCategory('all')}
                        onRemovePrice={() => {
                            setCurrentMinPrice(minAvailablePrice);
                            setCurrentMaxPrice(maxAvailablePrice);
                        }}
                        onResetAll={resetAllFilters}
                    />

                    <section id="recommendations" className="space-y-5 lg:col-span-9">
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                            <div className="flex max-w-xl flex-1 flex-col gap-3 xl:flex-row">
                                <RecommendationVisitDateFilter selectedDate={selectedDate} onSelectDate={setSelectedDate} />

                                <div className="inline-flex max-w-full rounded-[1.75rem] p-2 transition">
                                    <div className="relative flex min-h-[48px] w-full max-w-full items-center gap-4 rounded-full border border-[var(--rec-outline-variant)]/24 bg-[var(--rec-surface-lowest)] px-5 py-3 xl:min-w-[250px]">
                                        <Leaf className="h-5 w-5 shrink-0 text-[var(--rec-primary)]" />
                                        <div className="min-w-0 flex-1">
                                            <select
                                                value={selectedCategory}
                                                onChange={(event) => setSelectedCategory(event.target.value as HomeDestinationCategory)}
                                                className="w-full cursor-pointer appearance-none border-none bg-transparent pr-8 text-sm font-semibold whitespace-nowrap text-[var(--rec-on-surface)] outline-none"
                                            >
                                                {categories.map((category) => (
                                                    <option key={category.key} value={category.key}>
                                                        {category.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <ChevronDown className="pointer-events-none mr-2 h-5 w-5 shrink-0 text-[var(--rec-primary)]" />
                                    </div>
                                </div>
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

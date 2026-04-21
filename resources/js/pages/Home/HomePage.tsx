import { useState } from 'react';

import HeroSection from '@/features/home/components/HeroSection';
import HighlandRhythmSection from '@/features/home/components/HighlandRhythmSection';
import JourneySection from '@/features/home/components/JourneySection';
import PopularDestinationsSection from '@/features/home/components/PopularDestinationsSection';
import SeasonalSpotlightsSection from '@/features/home/components/SeasonalSpotlightsSection';
import VisitorMapSection from '@/features/home/components/VisitorMapSection';
import type { HomeDestination, HomeDestinationCategory, HomeDestinationFilter } from '@/features/home/types';
import MainLayout from '@/layouts/MainLayout';

interface HomePageProps {
    filters: HomeDestinationFilter[];
    featuredDestinations: HomeDestination[];
}

function filterFeaturedDestinations(destinations: HomeDestination[], category: HomeDestinationCategory) {
    if (category === 'buah' || category === 'bunga') {
        return destinations.filter((destination) => destination.category === category);
    }

    const fruit = destinations.filter((destination) => destination.category === 'buah').slice(0, 3);
    const flower = destinations.filter((destination) => destination.category === 'bunga').slice(0, 3);

    return [...fruit, ...flower];
}

export default function HomePage({ filters, featuredDestinations }: HomePageProps) {
    const [activeCategory, setActiveCategory] = useState<HomeDestinationCategory>(filters[0]?.key ?? 'all');
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const visibleDestinations = filterFeaturedDestinations(featuredDestinations, activeCategory);

    return (
        <MainLayout>
            <div className="home-bloom-page overflow-hidden bg-[var(--app-surface)] text-[var(--app-text)]">
                <HeroSection selectedDate={selectedDate} onSelectDate={setSelectedDate} filters={filters} />
                <JourneySection />
                <SeasonalSpotlightsSection />
                <PopularDestinationsSection
                    activeCategory={activeCategory}
                    filters={filters}
                    featuredDestinations={visibleDestinations}
                    onCategoryChange={setActiveCategory}
                />
                <HighlandRhythmSection />
                <VisitorMapSection />
            </div>
        </MainLayout>
    );
}

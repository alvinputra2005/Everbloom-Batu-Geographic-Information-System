import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

import NearbyMapCard from '@/features/recommendations/components/NearbyMapCard';
import RecommendationLandmarkFilter from '@/features/recommendations/components/RecommendationLandmarkFilter';
import RecommendationActiveFilters from '@/features/recommendations/components/RecommendationActiveFilters';
import RecommendationPriceFilter from '@/features/recommendations/components/RecommendationPriceFilter';
import type { LandmarkOption, NearbyInsight } from '@/features/recommendations/types';

interface RecommendationFiltersProps {
    landmarks: LandmarkOption[];
    nearby: NearbyInsight;
    selectedDate: Date | null;
    selectedLandmarks: string[];
    currentMinPrice: number;
    currentMaxPrice: number;
    minPriceValue: number;
    maxPriceValue: number;
    onToggleLandmark: (landmarkId: string) => void;
    onMinPriceChange: (value: number) => void;
    onMaxPriceChange: (value: number) => void;
    onRemoveDate: () => void;
    onRemovePrice: () => void;
    onResetAll: () => void;
}

type FilterSectionKey = 'price' | 'landmarks';

function FilterToggle({
    title,
    isOpen,
    onClick,
}: {
    title: string;
    isOpen: boolean;
    onClick: () => void;
}) {
    return (
        <button type="button" onClick={onClick} className="flex w-full items-center justify-between p-5 text-left">
            <span className="font-bold text-[var(--rec-on-surface)]">{title}</span>
            <ChevronDown className={`h-4 w-4 text-[var(--rec-on-surface-variant)] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
    );
}

export default function RecommendationFilters({
    landmarks,
    nearby,
    selectedDate,
    selectedLandmarks,
    currentMinPrice,
    currentMaxPrice,
    minPriceValue,
    maxPriceValue,
    onToggleLandmark,
    onMinPriceChange,
    onMaxPriceChange,
    onRemoveDate,
    onRemovePrice,
    onResetAll,
}: RecommendationFiltersProps) {
    const [openSections, setOpenSections] = useState<Record<FilterSectionKey, boolean>>({
        price: true,
        landmarks: true,
    });

    const toggleSection = (section: FilterSectionKey) => {
        setOpenSections((current) => ({
            ...current,
            [section]: !current[section],
        }));
    };

    return (
        <aside className="space-y-6 self-start lg:sticky lg:top-28 lg:col-span-3">
            <RecommendationActiveFilters
                selectedDate={selectedDate}
                selectedLandmarks={selectedLandmarks}
                landmarks={landmarks}
                currentMinPrice={currentMinPrice}
                currentMaxPrice={currentMaxPrice}
                minPriceValue={minPriceValue}
                maxPriceValue={maxPriceValue}
                onRemoveDate={onRemoveDate}
                onRemoveLandmark={onToggleLandmark}
                onRemovePrice={onRemovePrice}
                onResetAll={onResetAll}
            />

            <div className="overflow-hidden rounded-xl border border-[var(--rec-outline-variant)]/30 bg-white shadow-sm">
                <FilterToggle title="Price" isOpen={openSections.price} onClick={() => toggleSection('price')} />
                <RecommendationPriceFilter
                    isOpen={openSections.price}
                    minPriceValue={minPriceValue}
                    maxPriceValue={maxPriceValue}
                    currentMinPrice={currentMinPrice}
                    currentMaxPrice={currentMaxPrice}
                    onMinPriceChange={onMinPriceChange}
                    onMaxPriceChange={onMaxPriceChange}
                />
            </div>

            <div className="overflow-hidden rounded-xl border border-[var(--rec-outline-variant)]/30 bg-white shadow-sm">
                <FilterToggle title="Nearby Landmarks" isOpen={openSections.landmarks} onClick={() => toggleSection('landmarks')} />
                <RecommendationLandmarkFilter
                    isOpen={openSections.landmarks}
                    landmarks={landmarks}
                    selectedLandmarks={selectedLandmarks}
                    onToggleLandmark={onToggleLandmark}
                />
            </div>

            <NearbyMapCard nearby={nearby} />
        </aside>
    );
}

import type { HomeDestinationCategory, HomeDestinationFilter } from '@/features/home/types';
import { X } from 'lucide-react';
import { format } from 'date-fns';
import { id as indonesianLocale } from 'date-fns/locale';
import { motion } from 'motion/react';

import type { LandmarkOption } from '@/features/recommendations/types';

interface RecommendationActiveFiltersProps {
    selectedDate: Date | null;
    selectedCategory: HomeDestinationCategory;
    categories: HomeDestinationFilter[];
    selectedLandmarks: string[];
    landmarks: LandmarkOption[];
    currentMinPrice: number;
    currentMaxPrice: number;
    minPriceValue: number;
    maxPriceValue: number;
    onRemoveDate: () => void;
    onRemoveCategory: () => void;
    onRemoveLandmark: (landmarkId: string) => void;
    onRemovePrice: () => void;
    onResetAll: () => void;
}

function formatRupiah(value: number) {
    return `Rp ${new Intl.NumberFormat('id-ID').format(value)}`;
}

export default function RecommendationActiveFilters({
    selectedDate,
    selectedCategory,
    categories,
    selectedLandmarks,
    landmarks,
    currentMinPrice,
    currentMaxPrice,
    minPriceValue,
    maxPriceValue,
    onRemoveDate,
    onRemoveCategory,
    onRemoveLandmark,
    onRemovePrice,
    onResetAll,
}: RecommendationActiveFiltersProps) {
    const activeLandmarkItems = landmarks.filter((landmark) => selectedLandmarks.includes(landmark.id));
    const hasPriceFilter = currentMinPrice > minPriceValue || currentMaxPrice < maxPriceValue;
    const activeCategory = categories.find((category) => category.key === selectedCategory);
    const hasCategoryFilter = selectedCategory !== 'all';
    const hasAnyFilter = Boolean(selectedDate) || hasCategoryFilter || activeLandmarkItems.length > 0 || hasPriceFilter;

    if (!hasAnyFilter) {
        return null;
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="ambient-bloom rounded-[2rem] border border-[var(--rec-outline-variant)]/18 bg-white p-5"
        >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <h3 className="text-l font-bold text-[var(--rec-on-surface)]">Filter Aktif</h3>
                </div>
                <button
                    type="button"
                    onClick={onResetAll}
                    className="text-s font-bold text-[#0b72e7] transition-opacity hover:opacity-80"
                >
                    Atur Ulang
                </button>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
                {selectedDate ? (
                    <FilterChip
                        label={`Tanggal: ${format(selectedDate, 'dd MMM yyyy', { locale: indonesianLocale })}`}
                        onRemove={onRemoveDate}
                    />
                ) : null}

                {hasCategoryFilter && activeCategory ? <FilterChip label={`Kategori: ${activeCategory.label}`} onRemove={onRemoveCategory} /> : null}

                {hasPriceFilter ? (
                    <FilterChip
                        label={`HTM ${formatRupiah(currentMinPrice)} - ${formatRupiah(currentMaxPrice)}`}
                        onRemove={onRemovePrice}
                    />
                ) : null}

                {activeLandmarkItems.map((landmark) => (
                    <FilterChip
                        key={landmark.id}
                        label={landmark.name}
                        onRemove={() => onRemoveLandmark(landmark.id)}
                    />
                ))}
            </div>
        </motion.div>
    );
}

function FilterChip({ label, onRemove }: { label: string; onRemove: () => void }) {
    return (
        <span className="inline-flex items-center gap-2 rounded-full border border-[var(--rec-outline-variant)]/26 bg-[#eef3f8] px-4 py-3 text-sm font-medium text-[var(--rec-on-surface)]">
            {label}
            <button
                type="button"
                onClick={onRemove}
                className="flex h-5 w-5 items-center justify-center rounded-full text-[var(--rec-on-surface-variant)] transition-colors hover:bg-white"
                aria-label={`Hapus filter ${label}`}
            >
                <X className="h-3.5 w-3.5" />
            </button>
        </span>
    );
}

import { Link } from '@inertiajs/react';
import { Ban, CheckCircle, Flower2, Leaf, Map as MapIcon, ShoppingBasket, Star, Utensils } from 'lucide-react';
import { motion } from 'motion/react';

import type { RecommendationDestination } from '@/features/recommendations/types';

interface DestinationCardProps {
    destination: RecommendationDestination;
}

const cardVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.35,
            ease: 'easeOut',
        },
    },
};

export default function DestinationCard({ destination }: DestinationCardProps) {
    const isPeak = destination.status === 'PEAK';
    const isAvailable = destination.status === 'AVAILABLE';
    const isOffSeason = destination.status === 'OFF-SEASON';

    return (
        <motion.article
            variants={cardVariants}
            className="ambient-bloom group flex h-full flex-col rounded-xl border border-[var(--rec-outline-variant)]/10 bg-[var(--rec-surface-lowest)] p-3"
        >
            <div className="relative mb-3 h-48 overflow-hidden rounded-lg">
                <img
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    src={destination.image}
                    alt={destination.name}
                    referrerPolicy="no-referrer"
                />
                <div className="absolute top-2 right-2">
                    <span
                        className={`flex items-center gap-1 rounded-full px-2 py-1 text-[9px] font-bold ${
                            isPeak
                                ? 'bg-[var(--rec-primary)] text-white'
                                : isAvailable
                                  ? 'bg-[var(--rec-secondary-container)] text-[var(--rec-on-secondary-container)]'
                                  : 'bg-[var(--rec-surface-highest)] text-[var(--rec-on-surface-variant)]'
                        }`}
                    >
                        {isPeak ? <Star className="h-3 w-3 fill-current" /> : null}
                        {isAvailable ? <CheckCircle className="h-3 w-3 fill-current" /> : null}
                        {isOffSeason ? <Ban className="h-3 w-3" /> : null}
                        {destination.status} STATUS
                    </span>
                </div>
            </div>

            <div className="flex flex-1 flex-col px-1">
                <div className="mb-2">
                    <div className="mb-1 flex items-center gap-1.5">
                        {destination.categoryIcon === 'eco' ? <Leaf className="h-3.5 w-3.5 text-[var(--rec-secondary)]" /> : null}
                        {destination.categoryIcon === 'local_florist' ? <Flower2 className="h-3.5 w-3.5 text-[var(--rec-tertiary)]" /> : null}
                        {destination.categoryIcon === 'nutrition' ? <Utensils className="h-3.5 w-3.5 text-red-600" /> : null}
                        <span
                            className={`text-[10px] font-bold tracking-tight uppercase ${
                                destination.categoryIcon === 'eco'
                                    ? 'text-[var(--rec-secondary)]'
                                    : destination.categoryIcon === 'local_florist'
                                      ? 'text-[var(--rec-tertiary)]'
                                      : 'text-red-600'
                            }`}
                        >
                            {destination.category}
                        </span>
                    </div>
                    <h2 className="text-lg leading-tight font-bold text-[var(--rec-on-surface)]">{destination.name}</h2>
                </div>

                <div className="mb-4 space-y-1.5 text-[11px]">
                    <div className="flex items-center justify-between text-[var(--rec-on-surface-variant)]">
                        <div className="flex items-center gap-1.5">
                            <span className="font-bold">HTM:</span>
                            <span>{destination.price}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <span className="font-bold">Hours:</span>
                            <span>{destination.hours}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-1.5 text-[var(--rec-on-surface-variant)]">
                        <ShoppingBasket className="h-3.5 w-3.5" />
                        <span>{destination.specialty}</span>
                    </div>
                </div>

                <div className="mt-auto flex gap-2">
                    <Link
                        href={destination.detailHref}
                        className="chlorophyll-gradient flex flex-1 items-center justify-center rounded-lg py-2.5 text-xs font-bold text-white transition-all hover:opacity-90"
                    >
                        Lihat Detail
                    </Link>
                    <Link
                        href={destination.mapHref}
                        aria-label={`Lihat peta ${destination.name}`}
                        className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--rec-surface-high)] text-[var(--rec-on-surface-variant)] transition-colors hover:bg-[var(--rec-surface-highest)]"
                    >
                        <MapIcon className="h-5 w-5" />
                    </Link>
                </div>
            </div>
        </motion.article>
    );
}

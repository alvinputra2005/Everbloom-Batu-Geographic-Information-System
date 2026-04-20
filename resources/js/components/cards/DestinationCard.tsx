import { Link } from '@inertiajs/react';
import { Ban, CheckCircle, Flower2, Leaf, ShoppingBasket, Star, Utensils } from 'lucide-react';
import { motion } from 'motion/react';

import DestinationRouteButton from '@/components/navigation/DestinationRouteButton';
import type { RecommendationDestination } from '@/features/recommendations/types';

interface DestinationCardProps {
    destination: RecommendationDestination;
    index: number;
    hasEnteredView: boolean;
}

const hiddenState = { opacity: 0, y: 24 };
const visibleState = { opacity: 1, y: 0 };

function getStatusLabel(status: RecommendationDestination['status']) {
    if (status === 'PEAK') {
        return 'Puncak Musim';
    }

    if (status === 'AVAILABLE') {
        return 'Tersedia';
    }

    return 'Luar Musim';
}

export default function DestinationCard({ destination, index, hasEnteredView }: DestinationCardProps) {
    const isPeak = destination.status === 'PEAK';
    const isAvailable = destination.status === 'AVAILABLE';
    const isOffSeason = destination.status === 'OFF-SEASON';

    return (
        <motion.article
            layout
            initial={hasEnteredView ? false : hiddenState}
            animate={hasEnteredView ? visibleState : hiddenState}
            transition={{
                duration: 0.35,
                ease: 'easeOut',
                delay: hasEnteredView ? Math.min(index * 0.06, 0.3) : 0,
                layout: {
                    duration: 0.25,
                    ease: 'easeOut',
                },
            }}
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
                        {getStatusLabel(destination.status)}
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
                            <span className="font-bold">Jam:</span>
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
                    <DestinationRouteButton
                        destinationName={destination.name}
                        coordinates={destination.coordinates}
                        mapHref={destination.mapHref}
                        navigationHref={destination.navigationHref}
                        variant="icon"
                    />
                </div>
            </div>
        </motion.article>
    );
}

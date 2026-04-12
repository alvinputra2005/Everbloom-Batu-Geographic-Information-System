import { Link } from '@inertiajs/react';
import { CheckCircle, Clock, Leaf, Map as MapIcon, ShoppingBasket, Star } from 'lucide-react';
import { motion } from 'motion/react';

import type { RecommendationDestination } from '@/features/recommendations/types';

interface DestinationCardProps {
    destination: RecommendationDestination;
    index: number;
}

export default function DestinationCard({ destination, index }: DestinationCardProps) {
    return (
        <motion.article
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ delay: index * 0.1 }}
            className="ambient-bloom group flex flex-col gap-6 rounded-[1.75rem] bg-[var(--rec-surface-lowest)] p-4 md:flex-row"
        >
            <div className="relative h-64 w-full overflow-hidden rounded-[1.25rem] md:h-auto md:w-72">
                <img
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    src={destination.image}
                    alt={destination.name}
                    referrerPolicy="no-referrer"
                />

                {(destination.isHighlyRecommended || destination.isGreatSeasonalChoice) && (
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                        {destination.isHighlyRecommended ? (
                            <span className="flex items-center gap-1 rounded-full bg-[var(--rec-primary-container)] px-3 py-1 text-[10px] font-bold text-[var(--rec-on-primary-container)]">
                                <Star size={12} fill="currentColor" />
                                Highly Recommended
                            </span>
                        ) : null}

                        {destination.isGreatSeasonalChoice ? (
                            <span className="flex items-center gap-1 rounded-full bg-[var(--rec-secondary-container)] px-3 py-1 text-[10px] font-bold text-[var(--rec-on-secondary-container)]">
                                <CheckCircle size={12} />
                                Great Seasonal Choice
                            </span>
                        ) : null}
                    </div>
                )}
            </div>

            <div className="flex flex-1 flex-col gap-2 py-2 pr-0 md:pr-4">
                <div>
                    <div className="mb-2 flex items-start justify-between gap-4">
                        <div>
                            <h2 className="text-2xl leading-tight font-bold text-[var(--rec-on-surface)]">{destination.name}</h2>
                            <div className="mt-1 flex items-center gap-2">
                                <Leaf size={14} className="text-[var(--rec-secondary)]" />
                                <span className="text-xs font-semibold tracking-[0.22em] text-[var(--rec-secondary)] uppercase">
                                    {destination.type}
                                </span>
                            </div>
                        </div>

                        <div className="text-right">
                            <p className="text-[10px] font-bold text-[var(--rec-on-surface-variant)] uppercase">HTM</p>
                            <p className="text-lg font-bold text-[var(--rec-primary)]">{destination.price}</p>
                        </div>
                    </div>

                    <p className="mb-6 text-sm leading-relaxed text-[var(--rec-on-surface-variant)]">{destination.description}</p>

                    <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--rec-surface-high)] text-[var(--rec-primary)]">
                                <Clock size={16} />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-[var(--rec-on-surface-variant)] uppercase">Hours</p>
                                <p className="text-xs font-bold text-[var(--rec-on-surface)]">{destination.hours}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--rec-surface-high)] text-[var(--rec-primary)]">
                                <ShoppingBasket size={16} />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-[var(--rec-on-surface-variant)] uppercase">Commodity</p>
                                <p className="text-xs font-bold text-[var(--rec-on-surface)]">{destination.commodity}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex gap-3">
                    <Link
                        href={destination.detailHref}
                        className="chlorophyll-gradient flex flex-1 items-center justify-center gap-2 rounded-[1.25rem] py-3 text-sm font-bold text-white transition-opacity hover:opacity-90"
                    >
                        Lihat Detail
                    </Link>

                    <Link
                        href={destination.mapHref}
                        aria-label={`Lihat peta ${destination.name}`}
                        className="flex h-12 w-12 items-center justify-center rounded-[1.25rem] bg-[var(--rec-surface-high)] text-[var(--rec-on-surface-variant)] transition-colors hover:bg-[var(--rec-surface-highest)]"
                    >
                        <MapIcon size={20} />
                    </Link>
                </div>
            </div>
        </motion.article>
    );
}

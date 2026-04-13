import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

import DestinationCard from '@/components/common/DestinationCard';
import { destinationFilters } from '@/features/home/data';
import type { HomeDestination, HomeDestinationCategory, HomeDestinationFilter } from '@/features/home/types';

interface PopularDestinationsSectionProps {
    activeCategory: HomeDestinationCategory;
    featuredDestinations: HomeDestination[];
    onCategoryChange: (category: HomeDestinationCategory) => void;
}

export default function PopularDestinationsSection({
    activeCategory,
    featuredDestinations,
    onCategoryChange,
}: PopularDestinationsSectionProps) {
    const filters = destinationFilters as HomeDestinationFilter[];

    return (
        <section id="recommendations" className="mx-auto mb-24 max-w-7xl px-6">
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45 }}
                className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
            >
                <div>
                    <h2 className="mt-2 text-4xl font-bold">Destinasi Populer</h2>
                    <p className="mt-3 max-w-2xl text-[var(--app-text-muted)]">
                        Tampilkan destinasi buah dan bunga terbaik di Batu dengan foto lokal yang sudah disesuaikan agar tampil seragam.
                    </p>
                </div>
                <Link
                    href={`/destinations${activeCategory === 'all' ? '' : `?category=${activeCategory}`}`}
                    className="flex items-center gap-2 font-bold text-[var(--app-primary)] transition-all hover:gap-3"
                >
                    Lihat Semua <ArrowRight className="h-5 w-5" />
                </Link>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.45, delay: 0.08 }}
                className="mb-8 flex flex-wrap gap-3"
            >
                {filters.map((filter) => (
                    <button
                        key={filter.key}
                        type="button"
                        onClick={() => onCategoryChange(filter.key)}
                        className={`rounded-full border px-5 py-2.5 text-sm font-semibold transition ${
                            activeCategory === filter.key
                                ? 'border-[var(--app-primary)] bg-[var(--app-primary)] text-white shadow-lg shadow-[color:rgba(19,82,39,0.15)]'
                                : 'border-stone-200 bg-white text-[var(--app-text-muted)] hover:border-[var(--app-primary)] hover:text-[var(--app-primary)]'
                        }`}
                    >
                        {filter.label}
                    </button>
                ))}
            </motion.div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                {featuredDestinations.map((destination, index) => (
                    <motion.div
                        key={destination.slug}
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.45, delay: index * 0.08 }}
                    >
                        <DestinationCard destination={destination} />
                    </motion.div>
                ))}
            </div>
        </section>
    );
}

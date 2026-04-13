import { MapPin, Star } from 'lucide-react';
import { motion } from 'motion/react';

import type { DestinationDetail } from '@/features/destination/data';

interface DestinationHeroProps {
    destination: DestinationDetail;
}

const statusBadgeClassNames = {
    peak: 'bg-[var(--detail-primary-container)] text-[var(--detail-on-primary-container)]',
    available: 'bg-[color:rgba(255,255,255,0.2)] text-white backdrop-blur-md',
    'off-season': 'bg-[color:rgba(68,64,60,0.7)] text-white',
} as const;

export default function DestinationHero({ destination }: DestinationHeroProps) {
    return (
        <header className="relative h-[60vh] w-full overflow-hidden md:h-[75vh]">
            <img alt={destination.imageAlt} className="h-full w-full object-cover" src={destination.image} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute right-0 bottom-0 left-0 mx-auto w-full max-w-7xl p-8 md:p-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-4 flex flex-wrap gap-3"
                >
                    <span
                        className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold tracking-[0.2em] uppercase ${statusBadgeClassNames[destination.statusTone]}`}
                    >
                        <Star size={14} fill="currentColor" /> {destination.statusLabel}
                    </span>
                    <span className="rounded-full bg-white/20 px-4 py-1.5 text-xs font-bold tracking-[0.2em] text-white uppercase backdrop-blur-md">
                        {destination.categoryLabel}
                    </span>
                </motion.div>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="mb-4 text-4xl font-extrabold leading-tight text-white md:text-6xl"
                >
                    {destination.title}
                </motion.h1>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex flex-wrap items-center gap-6"
                >
                    <div className="flex items-center gap-2 text-white/90">
                        <MapPin size={18} className="text-[var(--detail-tertiary-fixed)]" />
                        <span className="font-medium">{destination.locationLabel}</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/90">
                        <Star size={18} className="text-yellow-400" fill="currentColor" />
                        <span className="font-bold">{destination.rating}</span>
                        <span className="text-white/60">{destination.reviewsLabel}</span>
                    </div>
                </motion.div>
            </div>
        </header>
    );
}

import { motion } from 'motion/react';

import type { RecommendationHeroContent } from '@/features/recommendations/types';

interface RecommendationHeroProps {
    hero: RecommendationHeroContent;
}

export default function RecommendationHero({ hero }: RecommendationHeroProps) {
    return (
        <header className="ambient-bloom relative mb-12 flex min-h-[300px] flex-col justify-between gap-6 overflow-hidden rounded-[2rem] p-8 md:flex-row md:items-center">
            <div className="absolute inset-0 z-0">
                <img src={hero.image} alt={hero.imageAlt} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-black/40" />
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full bg-white px-4 py-1.5 text-xs font-bold tracking-[0.22em] text-[var(--rec-primary)] uppercase">
                        {hero.monthLabel}
                    </span>
                    <span className="rounded-full border border-white/30 bg-white/20 px-4 py-1.5 text-xs font-bold tracking-[0.22em] text-white uppercase backdrop-blur-md">
                        {hero.categoryLabel}
                    </span>
                </div>

                <h1 className="max-w-xl text-3xl leading-tight font-extrabold tracking-tight text-white md:text-5xl">{hero.title}</h1>

                <p className="max-w-xl text-sm leading-relaxed text-white/90 md:text-base">{hero.description}</p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="ambient-bloom relative z-10 max-w-xs rounded-[1.75rem] border border-white/20 bg-white/10 p-6 backdrop-blur-xl"
            >
                <div className="mb-3 flex flex-wrap items-center gap-3">
                    <span className="rounded-full bg-white px-3 py-1 text-[10px] font-bold tracking-[0.22em] text-[var(--rec-primary)] uppercase">
                        {hero.monthLabel}
                    </span>
                    <span className="rounded-full border border-white/30 bg-white/20 px-3 py-1 text-[10px] font-bold tracking-[0.22em] text-white uppercase backdrop-blur-md">
                        {hero.insightLabel}
                    </span>
                </div>
                <p className="text-xs leading-relaxed text-white/90">{hero.insightText}</p>
            </motion.div>
        </header>
    );
}

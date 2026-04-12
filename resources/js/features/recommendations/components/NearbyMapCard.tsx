import { NearbyInsight } from '@/features/recommendations/types';
import { motion } from 'motion/react';

interface NearbyMapCardProps {
    nearby: NearbyInsight;
}

export default function NearbyMapCard({ nearby }: NearbyMapCardProps) {
    return (
        <motion.a
            href={nearby.href}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            className="ambient-bloom group relative block overflow-hidden rounded-[2rem] bg-[var(--rec-surface-lowest)] p-4"
        >
            <div className="mb-4 h-40 overflow-hidden rounded-[1.25rem] grayscale transition-all duration-500 group-hover:grayscale-0">
                <img src={nearby.image} alt={nearby.imageAlt} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <h4 className="mb-1 text-sm font-bold text-[var(--rec-on-surface)]">{nearby.title}</h4>
            <p className="text-xs text-[var(--rec-on-surface-variant)]">{nearby.description}</p>
            <p className="mt-3 text-xs font-bold tracking-[0.24em] text-[var(--rec-primary)] uppercase">{nearby.countLabel}</p>
        </motion.a>
    );
}

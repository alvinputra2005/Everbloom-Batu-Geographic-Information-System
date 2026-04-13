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
            className="ambient-bloom group relative block overflow-hidden rounded-xl border border-[var(--rec-outline-variant)]/30 bg-white shadow-sm"
        >
            <div className="h-48 overflow-hidden grayscale transition-all duration-500 group-hover:grayscale-0">
                <img src={nearby.image} alt={nearby.imageAlt} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <div className="p-5">
                <h4 className="mb-1 text-sm font-bold text-[var(--rec-on-surface)]">{nearby.title}</h4>
                <p className="text-[11px] leading-relaxed text-[var(--rec-on-surface-variant)]">{nearby.description}</p>
            </div>
        </motion.a>
    );
}

import { useEffect, useRef, useState } from 'react';

import { useInView } from 'motion/react';

import DestinationCard from '@/components/cards/DestinationCard';
import type { RecommendationDestination } from '@/features/recommendations/types';

interface RecommendationListProps {
    destinations: RecommendationDestination[];
}

export default function RecommendationList({ destinations }: RecommendationListProps) {
    const listRef = useRef<HTMLDivElement | null>(null);
    const isInView = useInView(listRef, { once: true, amount: 0.12 });
    const [hasEnteredView, setHasEnteredView] = useState(false);

    useEffect(() => {
        if (isInView) {
            setHasEnteredView(true);
        }
    }, [isInView]);

    if (destinations.length === 0) {
        return (
            <div className="rounded-xl border border-dashed border-[var(--rec-outline-variant)]/40 bg-white p-8 text-center">
                <h3 className="text-lg font-bold text-[var(--rec-on-surface)]">Tidak ada destinasi yang cocok</h3>
                <p className="mt-2 text-sm text-[var(--rec-on-surface-variant)]">
                    Ubah filter harga, landmark, atau tanggal kunjungan untuk melihat lebih banyak hasil.
                </p>
            </div>
        );
    }

    return (
        <div ref={listRef} className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {destinations.map((destination, index) => (
                <DestinationCard key={destination.id} destination={destination} index={index} hasEnteredView={hasEnteredView} />
            ))}
        </div>
    );
}

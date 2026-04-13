import { useEffect, useState } from 'react';

import { motion } from 'motion/react';

import DestinationCard from '@/components/cards/DestinationCard';
import type { RecommendationDestination } from '@/features/recommendations/types';

interface RecommendationListProps {
    destinations: RecommendationDestination[];
}

const rowVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.1,
        },
    },
};

function getColumnCount() {
    if (typeof window === 'undefined') {
        return 1;
    }

    if (window.innerWidth >= 1280) {
        return 3;
    }

    if (window.innerWidth >= 768) {
        return 2;
    }

    return 1;
}

export default function RecommendationList({ destinations }: RecommendationListProps) {
    const [columnCount, setColumnCount] = useState(1);

    useEffect(() => {
        const updateColumnCount = () => {
            setColumnCount(getColumnCount());
        };

        updateColumnCount();
        window.addEventListener('resize', updateColumnCount);

        return () => {
            window.removeEventListener('resize', updateColumnCount);
        };
    }, []);

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

    const destinationRows: RecommendationDestination[][] = [];

    for (let index = 0; index < destinations.length; index += columnCount) {
        destinationRows.push(destinations.slice(index, index + columnCount));
    }

    return (
        <div className="space-y-6">
            {destinationRows.map((row, rowIndex) => (
                <motion.div
                    key={`recommendation-row-${rowIndex}`}
                    variants={rowVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.35 }}
                    className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3"
                >
                    {row.map((destination) => (
                        <DestinationCard key={destination.id} destination={destination} />
                    ))}
                </motion.div>
            ))}
        </div>
    );
}

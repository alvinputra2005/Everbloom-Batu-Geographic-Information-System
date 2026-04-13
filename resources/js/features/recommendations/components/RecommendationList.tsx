import DestinationCard from '@/components/cards/DestinationCard';
import type { RecommendationDestination } from '@/features/recommendations/types';

interface RecommendationListProps {
    destinations: RecommendationDestination[];
}

export default function RecommendationList({ destinations }: RecommendationListProps) {
    if (destinations.length === 0) {
        return (
            <div className="rounded-xl border border-dashed border-[var(--rec-outline-variant)]/40 bg-white p-8 text-center">
                <h3 className="text-lg font-bold text-[var(--rec-on-surface)]">Tidak ada destinasi yang cocok</h3>
                <p className="mt-2 text-sm text-[var(--rec-on-surface-variant)]">Ubah filter harga, landmark, atau tanggal kunjungan untuk melihat lebih banyak hasil.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {destinations.map((destination, index) => (
                <DestinationCard key={destination.id} destination={destination} index={index} />
            ))}
        </div>
    );
}

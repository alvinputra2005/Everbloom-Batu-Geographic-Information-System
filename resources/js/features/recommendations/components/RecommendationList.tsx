import DestinationCard from '@/components/cards/DestinationCard';
import type { RecommendationDestination } from '@/features/recommendations/types';

interface RecommendationListProps {
    destinations: RecommendationDestination[];
}

export default function RecommendationList({ destinations }: RecommendationListProps) {
    return (
        <>
            {destinations.map((destination, index) => (
                <DestinationCard key={destination.id} destination={destination} index={index} />
            ))}
        </>
    );
}

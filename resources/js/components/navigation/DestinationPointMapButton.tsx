import type { DestinationCoordinates } from '@/features/destination/types';
import { lazy, Suspense, useEffect, useState } from 'react';

const DestinationPointMapButtonClient = lazy(() => import('./DestinationPointMapButtonClient'));

interface DestinationPointMapButtonProps {
    destinationName: string;
    coordinates: DestinationCoordinates;
    address: string;
    className?: string;
}

export default function DestinationPointMapButton(props: DestinationPointMapButtonProps) {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return (
            <button
                type="button"
                disabled
                className={props.className ?? 'flex flex-1 items-center justify-center rounded-xl border-2 border-[var(--detail-primary)] px-4 py-3'}
            >
                Lihat Peta
            </button>
        );
    }

    return (
        <Suspense fallback={null}>
            <DestinationPointMapButtonClient {...props} />
        </Suspense>
    );
}

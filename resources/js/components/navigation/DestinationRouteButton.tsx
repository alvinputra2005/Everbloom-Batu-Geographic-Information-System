import type { DestinationCoordinates } from '@/features/destination/types';
import { cn } from '@/lib/utils';
import { Navigation } from 'lucide-react';
import { lazy, Suspense, useEffect, useState } from 'react';

const DestinationRouteButtonClient = lazy(() => import('./DestinationRouteButtonClient'));

interface DestinationRouteButtonProps {
    destinationName: string;
    coordinates: DestinationCoordinates;
    mapHref: string;
    navigationHref: string;
    variant?: 'icon' | 'full';
    className?: string;
}

export default function DestinationRouteButton(props: DestinationRouteButtonProps) {
    const [isClient, setIsClient] = useState(false);

    const fallbackClassName =
        props.variant === 'full'
            ? 'chlorophyll-gradient flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-3 font-bold text-white shadow-md'
            : 'flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--rec-surface-high)] text-[var(--rec-on-surface-variant)]';

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return (
            <button type="button" disabled aria-label={`Cari rute ke ${props.destinationName}`} className={cn(fallbackClassName, props.className)}>
                <Navigation size={16} />
                {props.variant === 'full' ? 'Navigasi' : null}
            </button>
        );
    }

    return (
        <Suspense fallback={null}>
            <DestinationRouteButtonClient {...props} />
        </Suspense>
    );
}

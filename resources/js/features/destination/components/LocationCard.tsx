import { Map as MapIcon, MapPin } from 'lucide-react';

import DestinationPointMapButton from '@/components/navigation/DestinationPointMapButton';
import DestinationRouteButton from '@/components/navigation/DestinationRouteButton';
import type { DestinationDetail } from '@/features/destination/types';

interface LocationCardProps {
    destination: DestinationDetail;
}

export default function LocationCard({ destination }: LocationCardProps) {
    return (
        <div className="overflow-hidden rounded-4xl border border-[var(--detail-surface-high)] bg-[var(--detail-surface-lowest)] p-6 shadow-sm">
            <h3 className="mb-4 flex items-center gap-2 text-lg font-bold">
                <MapIcon className="text-[var(--detail-tertiary)]" size={20} /> Lokasi Presisi
            </h3>
            <div className="relative mb-4 h-52 overflow-hidden rounded-lg bg-[var(--detail-surface-highest)] md:h-56">
                <img alt={destination.mapImageAlt} className="h-full w-full object-cover opacity-60 grayscale" src={destination.mapImage} />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="rounded-full bg-[var(--detail-primary)] p-3 text-white shadow-lg">
                        <MapPin size={24} fill="currentColor" />
                    </div>
                </div>
            </div>
            <p className="text-sm leading-relaxed text-[var(--detail-on-surface-variant)]">{destination.address}</p>
            <div className="mt-6 flex gap-3">
                <DestinationPointMapButton destinationName={destination.title} coordinates={destination.coordinates} address={destination.address} />
                <DestinationRouteButton
                    destinationName={destination.title}
                    coordinates={destination.coordinates}
                    mapHref={destination.mapHref}
                    navigationHref={destination.navigationHref}
                    variant="full"
                />
            </div>
        </div>
    );
}

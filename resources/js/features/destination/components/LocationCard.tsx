import { Link } from '@inertiajs/react';
import { Map as MapIcon, MapPin, Navigation } from 'lucide-react';

import type { DestinationDetail } from '@/features/destination/types';

interface LocationCardProps {
    destination: DestinationDetail;
}

export default function LocationCard({ destination }: LocationCardProps) {
    return (
        <div className="overflow-hidden rounded-xl border border-[var(--detail-surface-high)] bg-[var(--detail-surface-lowest)] p-6 shadow-sm">
            <h3 className="mb-4 flex items-center gap-2 text-lg font-bold">
                <MapIcon className="text-[var(--detail-tertiary)]" size={20} /> Lokasi Presisi
            </h3>
            <div className="relative mb-4 aspect-square overflow-hidden rounded-lg bg-[var(--detail-surface-highest)]">
                <img alt={destination.mapImageAlt} className="h-full w-full object-cover opacity-60 grayscale" src={destination.mapImage} />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="rounded-full bg-[var(--detail-primary)] p-3 text-white shadow-lg">
                        <MapPin size={24} fill="currentColor" />
                    </div>
                </div>
            </div>
            <p className="text-sm leading-relaxed text-[var(--detail-on-surface-variant)]">{destination.address}</p>
            <div className="mt-6 flex gap-3">
                <Link
                    href={destination.mapHref}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl border-2 border-[var(--detail-primary)] bg-white px-4 py-3 font-bold text-[var(--detail-primary)] transition-colors hover:bg-[var(--detail-primary-fixed)]"
                >
                    <MapIcon size={16} /> View Map
                </Link>
                <Link
                    href={destination.navigationHref}
                    className="chlorophyll-gradient flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-3 font-bold text-white shadow-md transition-all hover:scale-[1.02]"
                >
                    <Navigation size={16} /> Navigate
                </Link>
            </div>
        </div>
    );
}

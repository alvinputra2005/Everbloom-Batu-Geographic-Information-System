import { Car, Tent, Utensils, Waves, Wifi } from 'lucide-react';

import type { DestinationDetail } from '@/features/destination/types';

interface FacilityListProps {
    destination: DestinationDetail;
}

const facilityIcons = {
    car: Car,
    utensils: Utensils,
    waves: Waves,
    tent: Tent,
    wifi: Wifi,
} as const;

export default function FacilityList({ destination }: FacilityListProps) {
    return (
        <section className="space-y-6">
            <h2 className="text-2xl font-bold text-[var(--detail-on-surface)]">Fasilitas & Layanan</h2>
            <div className="flex flex-wrap gap-4">
                {destination.facilities.map((facility, index) => {
                    const Icon = facilityIcons[facility.icon];

                    return (
                        <div
                            key={index}
                            className="cursor-default rounded-full border border-[var(--detail-surface-high)] bg-white px-6 py-4 shadow-sm transition-colors hover:border-[var(--detail-primary)]"
                        >
                            <div className="flex items-center gap-3">
                                <Icon className="text-[var(--detail-primary)]" size={20} />
                                <span className="font-medium text-[var(--detail-on-surface)]">{facility.label}</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}

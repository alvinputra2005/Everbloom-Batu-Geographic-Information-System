import { Clock, CreditCard, Sprout, Users } from 'lucide-react';

import type { DestinationDetail } from '@/features/destination/data';

interface DestinationInfoProps {
    destination: DestinationDetail;
}

const statIcons = {
    ticket: CreditCard,
    clock: Clock,
    sprout: Sprout,
    users: Users,
} as const;

export default function DestinationInfo({ destination }: DestinationInfoProps) {
    return (
        <section className="rounded-t-xl rounded-b-lg bg-[var(--detail-surface-lowest)] p-8 shadow-sm md:p-12">
            <h2 className="mb-6 text-2xl font-bold text-[var(--detail-on-surface)]">Tentang Destinasi</h2>
            <p className="mb-8 text-lg leading-relaxed text-[var(--detail-on-surface-variant)]">{destination.description}</p>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {destination.stats.map((stat, index) => {
                    const Icon = statIcons[stat.icon];

                    return (
                        <div key={index} className="rounded-lg bg-[var(--detail-surface-low)] p-6 text-center">
                            <Icon className="mx-auto mb-2 text-[var(--detail-primary)]" size={32} />
                            <div className="text-xs font-bold text-[var(--detail-outline)] uppercase">{stat.label}</div>
                            <div className="text-lg font-bold text-[var(--detail-on-surface)]">{stat.value}</div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}

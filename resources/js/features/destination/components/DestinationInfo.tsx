import { Clock, Sprout, Users, Wallet } from 'lucide-react';
import { motion } from 'motion/react';
import { Fragment } from 'react';

import type { DestinationDetail } from '@/features/destination/types';
import { cn } from '@/lib/utils';

interface DestinationInfoProps {
    destination: DestinationDetail;
}

const statIcons = {
    ticket: Wallet,
    clock: Clock,
    sprout: Sprout,
    users: Users,
} as const;

export default function DestinationInfo({ destination }: DestinationInfoProps) {
    return (
        <div className="space-y-6">
            <section className="rounded-4xl bg-[var(--detail-surface-lowest)] p-8 shadow-xl md:p-12">
                <h2 className="mb-6 text-2xl font-bold text-[var(--detail-on-surface)]">Tentang Destinasi</h2>
                <p className="text-lg leading-relaxed text-[var(--detail-on-surface-variant)]">{destination.description}</p>
            </section>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="grid grid-cols-2 overflow-hidden rounded-[2rem] border border-[var(--detail-surface-high)] bg-white shadow-lg md:flex md:items-center md:justify-around md:rounded-full"
            >
                {destination.stats.map((stat, index) => {
                    const Icon = statIcons[stat.icon];
                    const isLeftColumn = index % 2 === 0;
                    const isTopRow = index < 2;
                    const isLastItem = index === destination.stats.length - 1;

                    return (
                        <Fragment key={index}>
                            <div
                                className={cn(
                                    'flex-1 px-4 py-5 text-center md:py-2',
                                    isLeftColumn && 'border-r border-[var(--detail-surface-high)] md:border-r-0',
                                    isTopRow && 'border-b border-[var(--detail-surface-high)] md:border-b-0',
                                )}
                            >
                                <Icon className="mx-auto mb-1 text-[var(--detail-primary)]" size={20} />
                                <div className="text-[10px] font-bold tracking-wider text-[var(--detail-outline)] uppercase">{stat.label}</div>
                                <div className="text-base font-bold text-[var(--detail-on-surface)] md:text-lg">{stat.value}</div>
                            </div>
                            {!isLastItem ? <div className="hidden h-12 w-px bg-[var(--detail-surface-high)] md:block" /> : null}
                        </Fragment>
                    );
                })}
            </motion.div>
        </div>
    );
}

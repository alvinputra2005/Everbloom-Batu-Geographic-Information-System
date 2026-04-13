import { Leaf, ShoppingBasket, Sun } from 'lucide-react';

import type { DestinationDetail } from '@/features/destination/types';

interface SeasonalConditionPanelProps {
    destination: DestinationDetail;
}

const monthToneClassNames = {
    primary: 'bg-[var(--detail-primary)]',
    secondary: 'bg-[var(--detail-secondary-fixed)]',
    surface: 'bg-[var(--detail-surface-high)]',
} as const;

export default function SeasonalConditionPanel({ destination }: SeasonalConditionPanelProps) {
    return (
        <section className="rounded-xl border border-[var(--detail-primary-fixed-dim)]/20 bg-[color:rgba(197,232,188,0.1)] p-8 pb-24 md:p-12">
            <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                <div>
                    <h2 className="text-2xl font-bold text-[var(--detail-primary)]">Kondisi Musim & Waktu Kunjungan</h2>
                    <p className="text-[var(--detail-on-surface-variant)]">Update terkini: {destination.seasonal.updatedAt}</p>
                </div>
                <div className="flex items-center gap-3 rounded-full bg-[var(--detail-primary-container)] px-6 py-3 font-bold text-[var(--detail-on-primary-container)]">
                    <Leaf size={20} /> {destination.seasonal.highlightLabel}
                </div>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div className="space-y-4">
                    <div className="flex items-start gap-4 rounded-lg bg-white/50 p-4">
                        <Sun className="shrink-0 text-[var(--detail-primary)]" size={24} />
                        <div>
                            <h4 className="font-bold text-[var(--detail-on-surface)]">Cuaca Terbaik</h4>
                            <p className="text-sm text-[var(--detail-on-surface-variant)]">{destination.seasonal.weatherDescription}</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4 rounded-lg bg-white/50 p-4">
                        <ShoppingBasket className="shrink-0 text-[var(--detail-primary)]" size={24} />
                        <div>
                            <h4 className="font-bold text-[var(--detail-on-surface)]">Kualitas Buah</h4>
                            <p className="text-sm text-[var(--detail-on-surface-variant)]">{destination.seasonal.produceDescription}</p>
                        </div>
                    </div>
                </div>
                <div className="rounded-lg bg-[var(--detail-surface-lowest)] p-6 shadow-sm">
                    <div className="mb-4 flex items-center justify-between">
                        <span className="font-bold text-[var(--detail-on-surface)]">Peak Months 2026</span>
                        <div className="flex gap-1">
                            <div className="h-3 w-3 rounded-full bg-[var(--detail-primary)]" />
                            <div className="h-3 w-3 rounded-full bg-[var(--detail-secondary-fixed)]" />
                        </div>
                    </div>
                    <div className="grid grid-cols-6 gap-2">
                        {destination.seasonal.peakMonths.map((item, index) => (
                            <div key={index} className="flex flex-col items-center">
                                <span className="mb-1 text-[10px] font-bold text-[var(--detail-outline)] uppercase">{item.label}</span>
                                <div
                                    className={`w-full rounded-sm ${monthToneClassNames[item.tone]} ${item.active ? 'outline outline-2 outline-offset-2 outline-[var(--detail-primary)]' : ''}`}
                                    style={{ height: `${item.height}px` }}
                                />
                            </div>
                        ))}
                    </div>
                    <p className="mt-4 text-center text-[11px] font-medium text-[var(--detail-on-surface-variant)]">
                        Bulan berwarna gelap menunjukkan masa panen raya
                    </p>
                </div>
            </div>
        </section>
    );
}

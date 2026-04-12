import { Leaf, ShoppingBasket, Sun } from 'lucide-react';

const peakMonths = [
    { m: 'Jan', h: 32, c: 'bg-[var(--detail-surface-high)]' },
    { m: 'Feb', h: 48, c: 'bg-[var(--detail-secondary-fixed)]' },
    { m: 'Mar', h: 80, c: 'bg-[var(--detail-primary)]' },
    { m: 'Apr', h: 96, c: 'bg-[var(--detail-primary)]' },
    { m: 'Mei', h: 80, c: 'bg-[var(--detail-primary)]', active: true },
    { m: 'Jun', h: 64, c: 'bg-[var(--detail-secondary-fixed)]' },
];

export default function SeasonalConditionPanel() {
    return (
        <section className="rounded-xl border border-[var(--detail-primary-fixed-dim)]/20 bg-[color:rgba(197,232,188,0.1)] p-8 pb-24 md:p-12">
            <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                <div>
                    <h2 className="text-2xl font-bold text-[var(--detail-primary)]">Kondisi Musim & Waktu Kunjungan</h2>
                    <p className="text-[var(--detail-on-surface-variant)]">Update terkini: Mei 2024</p>
                </div>
                <div className="flex items-center gap-3 rounded-full bg-[var(--detail-primary-container)] px-6 py-3 font-bold text-[var(--detail-on-primary-container)]">
                    <Leaf size={20} /> Musim Panen Apel
                </div>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div className="space-y-4">
                    <div className="flex items-start gap-4 rounded-lg bg-white/50 p-4">
                        <Sun className="shrink-0 text-[var(--detail-primary)]" size={24} />
                        <div>
                            <h4 className="font-bold text-[var(--detail-on-surface)]">Cuaca Terbaik</h4>
                            <p className="text-sm text-[var(--detail-on-surface-variant)]">
                                Langit cerah dengan suhu berkisar 18°C - 24°C. Sangat ideal untuk aktivitas outdoor.
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4 rounded-lg bg-white/50 p-4">
                        <ShoppingBasket className="shrink-0 text-[var(--detail-primary)]" size={24} />
                        <div>
                            <h4 className="font-bold text-[var(--detail-on-surface)]">Kualitas Buah</h4>
                            <p className="text-sm text-[var(--detail-on-surface-variant)]">
                                Apel Manalagi dan Rome Beauty sedang dalam masa kematangan sempurna.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="rounded-lg bg-[var(--detail-surface-lowest)] p-6 shadow-sm">
                    <div className="mb-4 flex items-center justify-between">
                        <span className="font-bold text-[var(--detail-on-surface)]">Peak Months 2024</span>
                        <div className="flex gap-1">
                            <div className="h-3 w-3 rounded-full bg-[var(--detail-primary)]" />
                            <div className="h-3 w-3 rounded-full bg-[var(--detail-secondary-fixed)]" />
                        </div>
                    </div>
                    <div className="grid grid-cols-6 gap-2">
                        {peakMonths.map((item, index) => (
                            <div key={index} className="flex flex-col items-center">
                                <span className="mb-1 text-[10px] font-bold text-[var(--detail-outline)] uppercase">{item.m}</span>
                                <div
                                    className={`w-full rounded-sm ${item.c} ${item.active ? 'outline outline-2 outline-offset-2 outline-[var(--detail-primary)]' : ''}`}
                                    style={{ height: `${item.h}px` }}
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

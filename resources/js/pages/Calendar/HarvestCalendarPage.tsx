import { useEffect, useMemo, useState } from 'react';

import { motion } from 'motion/react';
import {
    CalendarDays,
    CheckCircle2,
    CloudRain,
    Droplets,
    Sprout,
    Thermometer,
} from 'lucide-react';

import type { MobileBottomNavItem } from '@/components/common/MobileBottomNav';
import type { NavbarItem } from '@/components/common/Navbar';
import MainLayout from '@/layouts/MainLayout';

type CategoryKey = 'fruits' | 'flowers';
type SeasonTone = 'available' | 'peak';

interface SeasonRange {
    startMonth: number;
    startDay: number;
    endMonth: number;
    endDay: number;
    tone: SeasonTone;
}

interface Commodity {
    name: string;
    category: CategoryKey;
    note: string;
    ranges: SeasonRange[];
}

interface InsightMonth {
    id: number;
    label: string;
    shortLabel: string;
    title: string;
    description: string;
    rainfall: string;
    temperature: string;
    humidity: string;
    harvestIntensity: number;
    bloomIntensity: number;
}

const navbarItems: NavbarItem[] = [
    { label: 'Beranda', href: '/' },
    { label: 'Rekomendasi', href: '/#recommendations' },
    { label: 'Kalender', href: '/calendar', active: true },
    { label: 'Tentang', href: '/#about' },
];

const mobileNavItems: MobileBottomNavItem[] = [
    { label: 'Beranda', href: '/', icon: 'home' },
    { label: 'Rekomendasi', href: '/#recommendations', icon: 'explore' },
    { label: 'Kalender', href: '/calendar', icon: 'calendar', active: true },
    { label: 'Tentang', href: '/#about', icon: 'about' },
];

interface HarvestCalendarPageProps {
    insightMonths: InsightMonth[];
    commodities: Commodity[];
}

function getDaysInMonth(month: number) {
    return new Date(2026, month + 1, 0).getDate();
}

function getFirstDayOfMonth(month: number) {
    return new Date(2026, month, 1).getDay();
}

function isWithinRange(month: number, day: number, range: SeasonRange) {
    if (month < range.startMonth || month > range.endMonth) {
        return false;
    }

    if (month === range.startMonth && day < range.startDay) {
        return false;
    }

    if (month === range.endMonth && day > range.endDay) {
        return false;
    }

    return true;
}

function getToneForDay(month: number, day: number, ranges: SeasonRange[]) {
    if (ranges.some((range) => range.tone === 'peak' && isWithinRange(month, day, range))) {
        return 'peak';
    }

    if (ranges.some((range) => range.tone === 'available' && isWithinRange(month, day, range))) {
        return 'available';
    }

    return null;
}

function MetricRow({
    icon,
    label,
    value,
    tone,
}: {
    icon: React.ReactNode;
    label: string;
    value: string;
    tone: string;
}) {
    return (
        <div className="flex items-center gap-4 rounded-[1.4rem] border border-stone-100 bg-white p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[color:rgba(19,82,39,0.08)] text-[var(--app-primary)]">
                {icon}
            </div>
            <div className="flex-1">
                <p className="text-sm font-semibold text-[var(--app-text-muted)]">{label}</p>
                <p className="text-lg font-bold text-[var(--app-text)]">{value}</p>
            </div>
            <span className="text-sm font-bold text-[var(--app-primary-strong)]">{tone}</span>
        </div>
    );
}

function IntensityBar({ label, value }: { label: string; value: number }) {
    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between text-sm font-bold uppercase tracking-[0.2em] text-[var(--app-text-muted)]">
                <span>{label}</span>
                <span className="text-[var(--app-primary)]">{value}%</span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-stone-200">
                <div className="h-full rounded-full bg-[var(--app-primary)]" style={{ width: `${value}%` }} />
            </div>
        </div>
    );
}

export default function HarvestCalendarPage({ insightMonths, commodities }: HarvestCalendarPageProps) {
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [selectedCategory, setSelectedCategory] = useState<CategoryKey>('fruits');
    const [selectedCommodityName, setSelectedCommodityName] = useState(() => commodities.find((commodity) => commodity.category === 'fruits')?.name ?? '');

    const insight = insightMonths[selectedMonth];
    const filteredCommodities = useMemo(
        () => commodities.filter((commodity) => commodity.category === selectedCategory),
        [commodities, selectedCategory],
    );
    const selectedCommodity = useMemo(
        () => filteredCommodities.find((commodity) => commodity.name === selectedCommodityName) ?? filteredCommodities[0],
        [filteredCommodities, selectedCommodityName],
    );
    const calendarCells = useMemo(() => {
        const totalDays = getDaysInMonth(selectedMonth);
        const firstDay = getFirstDayOfMonth(selectedMonth);
        const leadingEmpty = Array.from({ length: firstDay }, (_, index) => ({ key: `empty-start-${index}`, day: null }));
        const days = Array.from({ length: totalDays }, (_, index) => ({
            key: `day-${index + 1}`,
            day: index + 1,
        }));
        const filledCount = leadingEmpty.length + days.length;
        const trailingCount = filledCount % 7 === 0 ? 0 : 7 - (filledCount % 7);
        const trailingEmpty = Array.from({ length: trailingCount }, (_, index) => ({ key: `empty-end-${index}`, day: null }));

        return [...leadingEmpty, ...days, ...trailingEmpty];
    }, [selectedMonth]);

    const weekdayLabels = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];

    const commodityOptions = useMemo(() => filteredCommodities.map((commodity) => commodity.name), [filteredCommodities]);

    useEffect(() => {
        if (!commodityOptions.includes(selectedCommodityName) && commodityOptions.length > 0) {
            setSelectedCommodityName(commodityOptions[0]);
        }
    }, [commodityOptions, selectedCommodityName]);

    const calendarSummary = selectedCommodity
        ? selectedCommodity.category === 'fruits'
            ? `Kalender panen ${selectedCommodity.name.toLowerCase()} untuk ${insight.label}.`
            : `Kalender mekar ${selectedCommodity.name.toLowerCase()} untuk ${insight.label}.`
        : `Kalender musim ${insight.label}.`;

    return (
        <MainLayout navbarItems={navbarItems} mobileBottomNavItems={mobileNavItems}>
            <div className="calendar-rhythms-page bg-[var(--app-surface)]">
                <section className="mx-auto max-w-7xl px-4 pt-8 pb-24 md:px-8">
                    <header className="mb-12">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-4 text-4xl font-bold tracking-tight text-[var(--app-primary)] md:text-6xl"
                        >
                            Kalender Musim Agro Batu
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.08 }}
                            className="max-w-3xl text-lg leading-relaxed text-[var(--app-text-muted)]"
                        >
                            Pilih bulan kunjunganmu untuk melihat ritme panen buah dan masa mekar bunga dalam format tanggal yang lebih nyata.
                            Warna hijau muda menunjukkan musim aktif, sedangkan hijau tua menandai periode puncak.
                        </motion.p>
                    </header>

                    <section className="calendar-hide-scrollbar -mx-4 mb-10 overflow-x-auto px-4">
                        <div className="flex min-w-max gap-3 pb-4">
                            {insightMonths.map((month) => (
                                <button
                                    key={month.id}
                                    type="button"
                                    onClick={() => setSelectedMonth(month.id)}
                                    className={`rounded-full px-6 py-3 text-base font-bold transition-all ${
                                        selectedMonth === month.id
                                            ? 'bg-[var(--app-primary)] text-white shadow-lg shadow-[color:rgba(19,82,39,0.22)]'
                                            : 'bg-white text-[var(--app-text-muted)] shadow-[0_10px_30px_rgba(27,28,25,0.06)] hover:text-[var(--app-primary)]'
                                    }`}
                                >
                                    {month.label}
                                </button>
                            ))}
                        </div>
                    </section>

                    <div className="mb-8 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
                        <div className="flex flex-wrap gap-3 rounded-full bg-white p-2 shadow-[0_10px_30px_rgba(27,28,25,0.06)]">
                            <button
                                type="button"
                                onClick={() => setSelectedCategory('fruits')}
                                className={`rounded-full px-6 py-2.5 font-semibold transition ${
                                    selectedCategory === 'fruits'
                                        ? 'bg-[var(--app-primary)] text-white'
                                        : 'text-[var(--app-text-muted)] hover:text-[var(--app-primary)]'
                                }`}
                            >
                                Buah
                            </button>
                            <button
                                type="button"
                                onClick={() => setSelectedCategory('flowers')}
                                className={`rounded-full px-6 py-2.5 font-semibold transition ${
                                    selectedCategory === 'flowers'
                                        ? 'bg-[var(--app-primary)] text-white'
                                        : 'text-[var(--app-text-muted)] hover:text-[var(--app-primary)]'
                                }`}
                            >
                                Bunga
                            </button>
                        </div>
                        <div className="flex flex-wrap items-center gap-3 text-sm font-semibold text-[var(--app-text-muted)]">
                            <div className="flex items-center gap-2">
                                <span className="h-4 w-4 rounded border border-stone-200 bg-white" />
                                Tidak tersedia
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="h-4 w-4 rounded bg-[color:rgba(19,82,39,0.24)]" />
                                Tersedia
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="h-4 w-4 rounded bg-[var(--app-primary)]" />
                                Panen puncak
                            </div>
                        </div>
                    </div>

                    <div className="grid gap-8 xl:grid-cols-[1.45fr_0.95fr]">
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.12 }}
                            transition={{ duration: 0.45 }}
                            className="overflow-hidden rounded-[2rem] border border-stone-200 bg-white shadow-[0_18px_45px_rgba(27,28,25,0.08)]"
                        >
                            <div className="border-b border-stone-100 px-6 py-5">
                                <div className="flex flex-col gap-4">
                                    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                                        <div>
                                            <h3 className="text-2xl font-bold text-[var(--app-text)]">{selectedCommodity?.name ?? 'Kalender Musim'} {insight.label}</h3>
                                            <p className="mt-1 text-sm text-[var(--app-text-muted)]">{calendarSummary}</p>
                                        </div>
                                        <div className="inline-flex items-center gap-2 rounded-full bg-[var(--app-surface-muted)] px-4 py-2 text-sm font-semibold text-[var(--app-primary)]">
                                            <CalendarDays className="h-4 w-4" />
                                            {getDaysInMonth(selectedMonth)} hari
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                                        <div className="flex flex-wrap gap-2">
                                            {commodityOptions.map((commodityName) => (
                                                <button
                                                    key={commodityName}
                                                    type="button"
                                                    onClick={() => setSelectedCommodityName(commodityName)}
                                                    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                                                        selectedCommodityName === commodityName
                                                            ? 'bg-[var(--app-primary)] text-white'
                                                            : 'bg-[var(--app-surface-muted)] text-[var(--app-text-muted)] hover:text-[var(--app-primary)]'
                                                    }`}
                                                >
                                                    {commodityName}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="grid grid-cols-7 gap-2">
                                    {weekdayLabels.map((label) => (
                                        <div
                                            key={label}
                                            className="flex h-10 items-center justify-center rounded-xl bg-[var(--app-surface-muted)] text-sm font-bold text-[var(--app-text-muted)]"
                                        >
                                            {label}
                                        </div>
                                    ))}

                                    {calendarCells.map((cell) => {
                                        if (!cell.day) {
                                            return <div key={cell.key} className="h-24 rounded-2xl border border-transparent bg-transparent" />;
                                        }

                                        const tone = selectedCommodity ? getToneForDay(selectedMonth, cell.day, selectedCommodity.ranges) : null;

                                        return (
                                            <div
                                                key={cell.key}
                                                className={`relative h-24 rounded-2xl border p-3 transition ${
                                                    tone === 'peak'
                                                        ? 'border-[var(--app-primary)] bg-[var(--app-primary)] text-white shadow-[0_12px_24px_rgba(19,82,39,0.16)]'
                                                        : tone === 'available'
                                                          ? 'border-[color:rgba(19,82,39,0.08)] bg-[color:rgba(19,82,39,0.18)] text-[var(--app-primary)]'
                                                          : 'border-stone-200 bg-white text-[var(--app-text-muted)]'
                                                }`}
                                            >
                                                <span className="text-3xl font-bold">{cell.day}</span>
                                                <span
                                                    className={`absolute right-3 bottom-3 text-[11px] font-semibold uppercase ${
                                                        tone === 'peak'
                                                            ? 'text-white/85'
                                                            : tone === 'available'
                                                              ? 'text-[var(--app-primary)]'
                                                              : 'text-stone-400'
                                                    }`}
                                                >
                                                    {tone === 'peak' ? 'Peak' : tone === 'available' ? 'Available' : 'Off'}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="grid gap-4 border-t border-stone-100 bg-[var(--app-surface-muted)] px-6 py-5 md:grid-cols-2">
                                <div className="rounded-[1.3rem] bg-white p-4">
                                    <div className="flex items-center gap-3">
                                        <CheckCircle2 className="h-5 w-5 text-[var(--app-primary)]" />
                                        <p className="font-semibold text-[var(--app-text)]">Cara baca kalender</p>
                                    </div>
                                    <p className="mt-2 text-sm leading-relaxed text-[var(--app-text-muted)]">
                                        Tanggal berwarna menunjukkan periode aktif. Hijau muda berarti tersedia, hijau tua menandakan peak season untuk komoditas yang dipilih.
                                    </p>
                                </div>
                                <div className="rounded-[1.3rem] bg-white p-4">
                                    <div className="flex items-center gap-3">
                                        <Sprout className="h-5 w-5 text-[var(--app-primary)]" />
                                        <p className="font-semibold text-[var(--app-text)]">Filter komoditas</p>
                                    </div>
                                    <p className="mt-2 text-sm leading-relaxed text-[var(--app-text-muted)]">
                                        Pilih kategori lalu pilih jenis buah atau bunga agar highlight kalender fokus pada satu komoditas yang ingin kamu pantau.
                                    </p>
                                </div>
                            </div>
                        </motion.section>

                        <motion.aside
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.45, delay: 0.08 }}
                            className="rounded-[2rem] border border-stone-200 bg-white p-8 shadow-[0_18px_45px_rgba(27,28,25,0.08)]"
                        >
                            <div className="mb-6 inline-flex rounded-full bg-[var(--app-primary)] px-5 py-2 text-xs font-bold tracking-[0.24em] text-white uppercase">
                                Monthly Insight
                            </div>
                            <h2 className="text-3xl font-bold text-[var(--app-text)]">{insight.title}</h2>
                            <p className="mt-4 text-lg leading-relaxed text-[var(--app-text-muted)]">{insight.description}</p>

                            <div className="mt-8 space-y-4">
                                <MetricRow
                                    icon={<CloudRain className="h-5 w-5" />}
                                    label="Curah hujan"
                                    value={insight.rainfall}
                                    tone={insight.harvestIntensity >= 75 ? 'Terkendali' : 'Dinamis'}
                                />
                                <MetricRow
                                    icon={<Thermometer className="h-5 w-5" />}
                                    label="Suhu rata-rata"
                                    value={insight.temperature}
                                    tone="Stabil"
                                />
                                <MetricRow
                                    icon={<Droplets className="h-5 w-5" />}
                                    label="Kelembapan"
                                    value={insight.humidity}
                                    tone={insight.bloomIntensity >= 80 ? 'Optimal' : 'Nyaman'}
                                />
                            </div>

                            <div className="mt-8 space-y-5 border-t border-stone-100 pt-6">
                                <IntensityBar label="Harvest Intensity" value={insight.harvestIntensity} />
                                <IntensityBar label="Blooms Intensity" value={insight.bloomIntensity} />
                            </div>
                        </motion.aside>
                    </div>
                </section>
            </div>
        </MainLayout>
    );
}

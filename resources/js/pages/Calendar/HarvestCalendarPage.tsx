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

const insightMonths: InsightMonth[] = [
    {
        id: 0,
        label: 'Januari',
        shortLabel: 'Jan',
        title: 'Januari cocok untuk kebun yang tetap aktif saat musim hujan',
        description:
            'Awal tahun biasanya punya curah hujan tinggi di kawasan Batu. Aktivitas buah tetap ada, tetapi kebun bunga yang tahan udara lembap biasanya terlihat lebih segar.',
        rainfall: 'Tinggi (musim hujan aktif)',
        temperature: '18 - 23 C',
        humidity: '83%',
        harvestIntensity: 58,
        bloomIntensity: 72,
    },
    {
        id: 1,
        label: 'Februari',
        shortLabel: 'Feb',
        title: 'Februari masih basah, cocok untuk kunjungan yang lebih santai',
        description:
            'Kelembapan masih tinggi dan beberapa komoditas buah tetap tersedia. Periode ini bagus untuk wisata yang tidak terlalu padat dengan suasana kebun yang masih hijau.',
        rainfall: 'Sedang ke tinggi',
        temperature: '18 - 24 C',
        humidity: '82%',
        harvestIntensity: 60,
        bloomIntensity: 74,
    },
    {
        id: 2,
        label: 'Maret',
        shortLabel: 'Mar',
        title: 'Maret menjadi masa transisi menuju kondisi kebun yang lebih stabil',
        description:
            'Curah hujan mulai turun perlahan. Beberapa bunga mulai masuk fase tampil optimal, sementara kebun buah masih terjaga produktivitasnya untuk wisata petik.',
        rainfall: 'Menengah',
        temperature: '18 - 24 C',
        humidity: '79%',
        harvestIntensity: 64,
        bloomIntensity: 76,
    },
    {
        id: 3,
        label: 'April',
        shortLabel: 'Apr',
        title: 'April sering jadi masa kebun terlihat segar dan nyaman dikunjungi',
        description:
            'Udara masih sejuk, hujan mulai berkurang, dan banyak area wisata terasa nyaman untuk eksplorasi. Masa ini cocok untuk kombinasi kunjungan buah dan bunga.',
        rainfall: 'Menengah ke rendah',
        temperature: '18 - 25 C',
        humidity: '76%',
        harvestIntensity: 68,
        bloomIntensity: 80,
    },
    {
        id: 4,
        label: 'Mei',
        shortLabel: 'Mei',
        title: 'Mei mulai masuk periode yang lebih kering dan stabil',
        description:
            'Kondisi lapangan biasanya lebih bersahabat untuk perjalanan keluarga. Beberapa komoditas masuk masa aktif dengan kualitas visual kebun yang tetap menarik.',
        rainfall: 'Rendah ke menengah',
        temperature: '17 - 24 C',
        humidity: '73%',
        harvestIntensity: 74,
        bloomIntensity: 79,
    },
    {
        id: 5,
        label: 'Juni',
        shortLabel: 'Jun',
        title: 'Juni adalah awal musim favorit untuk wisata agro Batu',
        description:
            'Udara cenderung lebih kering dan sejuk. Ini biasanya menjadi awal periode kuat untuk kunjungan buah serta beberapa taman bunga dengan kondisi taman yang rapi.',
        rainfall: 'Rendah',
        temperature: '17 - 23 C',
        humidity: '70%',
        harvestIntensity: 82,
        bloomIntensity: 76,
    },
    {
        id: 6,
        label: 'Juli',
        shortLabel: 'Jul',
        title: 'Juli punya momentum kuat untuk panen dan wisata keluarga',
        description:
            'Musim kering di dataran tinggi Batu biasanya membuat akses kebun lebih nyaman. Beberapa komoditas buah dan bunga tampil baik untuk wisata, foto, dan aktivitas petik.',
        rainfall: 'Rendah (musim kering)',
        temperature: '16 - 23 C',
        humidity: '68%',
        harvestIntensity: 86,
        bloomIntensity: 74,
    },
    {
        id: 7,
        label: 'Agustus',
        shortLabel: 'Agu',
        title: 'Agustus sering menjadi salah satu bulan paling ideal untuk berkunjung',
        description:
            'Hari cenderung cerah dengan kelembapan yang lebih terkontrol. Ini mendukung pengalaman wisata petik dan menjadikan lanskap kebun lebih nyaman untuk jelajah.',
        rainfall: 'Rendah',
        temperature: '17 - 24 C',
        humidity: '67%',
        harvestIntensity: 88,
        bloomIntensity: 72,
    },
    {
        id: 8,
        label: 'September',
        shortLabel: 'Sep',
        title: 'September menjaga ritme panen sambil mulai menyiapkan transisi akhir tahun',
        description:
            'Banyak kebun masih aktif dan cuaca relatif nyaman. Bulan ini cocok untuk wisatawan yang ingin pengalaman lebih tenang sebelum akhir tahun makin ramai.',
        rainfall: 'Rendah ke menengah',
        temperature: '18 - 25 C',
        humidity: '69%',
        harvestIntensity: 84,
        bloomIntensity: 75,
    },
    {
        id: 9,
        label: 'Oktober',
        shortLabel: 'Okt',
        title: 'Oktober sering terasa paling seimbang untuk buah dan bunga',
        description:
            'Transisi menuju hujan ringan membuat sebagian lahan tetap nyaman, sementara beberapa komoditas bunga mulai terlihat lebih hidup. Bulan ini pas untuk kunjungan campuran.',
        rainfall: 'Menengah',
        temperature: '18 - 25 C',
        humidity: '73%',
        harvestIntensity: 80,
        bloomIntensity: 82,
    },
    {
        id: 10,
        label: 'November',
        shortLabel: 'Nov',
        title: 'November membawa kebun ke fase lembap dengan bunga yang mulai menonjol',
        description:
            'Hujan mulai lebih sering turun. Beberapa bunga merespons kondisi lembap dengan baik, sementara wisata buah tetap ada tetapi lebih dipengaruhi cuaca harian.',
        rainfall: 'Menengah ke tinggi',
        temperature: '18 - 24 C',
        humidity: '79%',
        harvestIntensity: 68,
        bloomIntensity: 86,
    },
    {
        id: 11,
        label: 'Desember',
        shortLabel: 'Des',
        title: 'Desember cocok untuk pengunjung yang mencari suasana kebun yang segar',
        description:
            'Akhir tahun identik dengan hujan lebih rutin dan kelembapan tinggi. Lanskap bunga biasanya tampak subur, sementara aktivitas panen buah lebih selektif tergantung komoditas.',
        rainfall: 'Tinggi',
        temperature: '18 - 23 C',
        humidity: '84%',
        harvestIntensity: 56,
        bloomIntensity: 88,
    },
];

const commodities: Commodity[] = [
    {
        name: 'Apel',
        category: 'fruits',
        note: 'Paling ramai saat kemarau sejuk.',
        ranges: [
            { startMonth: 0, startDay: 1, endMonth: 2, endDay: 31, tone: 'available' },
            { startMonth: 5, startDay: 1, endMonth: 10, endDay: 30, tone: 'available' },
            { startMonth: 6, startDay: 10, endMonth: 8, endDay: 20, tone: 'peak' },
        ],
    },
    {
        name: 'Jeruk',
        category: 'fruits',
        note: 'Umumnya aktif pada pertengahan tahun.',
        ranges: [
            { startMonth: 1, startDay: 1, endMonth: 4, endDay: 30, tone: 'available' },
            { startMonth: 7, startDay: 1, endMonth: 11, endDay: 31, tone: 'available' },
            { startMonth: 4, startDay: 10, endMonth: 6, endDay: 31, tone: 'peak' },
        ],
    },
    {
        name: 'Strawberry',
        category: 'fruits',
        note: 'Relatif tersedia panjang, terutama di greenhouse.',
        ranges: [
            { startMonth: 0, startDay: 1, endMonth: 11, endDay: 31, tone: 'available' },
            { startMonth: 5, startDay: 15, endMonth: 8, endDay: 15, tone: 'peak' },
        ],
    },
    {
        name: 'Jambu Kristal',
        category: 'fruits',
        note: 'Panennya relatif stabil sepanjang tahun.',
        ranges: [{ startMonth: 0, startDay: 1, endMonth: 11, endDay: 31, tone: 'available' }],
    },
    {
        name: 'Buah Naga',
        category: 'fruits',
        note: 'Cenderung kuat pada kemarau hingga awal hujan.',
        ranges: [
            { startMonth: 3, startDay: 1, endMonth: 9, endDay: 31, tone: 'available' },
            { startMonth: 6, startDay: 1, endMonth: 7, endDay: 31, tone: 'peak' },
        ],
    },
    {
        name: 'Krisan',
        category: 'flowers',
        note: 'Budidaya dataran tinggi bisa panen bertahap hampir sepanjang tahun.',
        ranges: [
            { startMonth: 0, startDay: 1, endMonth: 11, endDay: 31, tone: 'available' },
            { startMonth: 8, startDay: 15, endMonth: 11, endDay: 15, tone: 'peak' },
        ],
    },
    {
        name: 'Hortensia',
        category: 'flowers',
        note: 'Menarik saat area lembap dan suhu tetap sejuk.',
        ranges: [
            { startMonth: 2, startDay: 1, endMonth: 8, endDay: 30, tone: 'available' },
            { startMonth: 3, startDay: 10, endMonth: 6, endDay: 31, tone: 'peak' },
        ],
    },
    {
        name: 'Bunga Matahari',
        category: 'flowers',
        note: 'Lebih kuat saat cahaya matahari melimpah.',
        ranges: [
            { startMonth: 2, startDay: 1, endMonth: 8, endDay: 15, tone: 'available' },
            { startMonth: 3, startDay: 1, endMonth: 6, endDay: 31, tone: 'peak' },
        ],
    },
    {
        name: 'Aster',
        category: 'flowers',
        note: 'Cukup fleksibel di suhu Batu yang sejuk.',
        ranges: [
            { startMonth: 0, startDay: 1, endMonth: 11, endDay: 31, tone: 'available' },
            { startMonth: 6, startDay: 1, endMonth: 10, endDay: 31, tone: 'peak' },
        ],
    },
    {
        name: 'Dahlia',
        category: 'flowers',
        note: 'Tampil baik saat suhu sejuk dan tanah tidak terlalu becek.',
        ranges: [
            { startMonth: 1, startDay: 1, endMonth: 10, endDay: 30, tone: 'available' },
            { startMonth: 5, startDay: 1, endMonth: 8, endDay: 30, tone: 'peak' },
        ],
    },
];

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

export default function HarvestCalendarPage() {
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [selectedCategory, setSelectedCategory] = useState<CategoryKey>('fruits');
    const [selectedCommodityName, setSelectedCommodityName] = useState('Apel');

    const insight = insightMonths[selectedMonth];
    const filteredCommodities = useMemo(
        () => commodities.filter((commodity) => commodity.category === selectedCategory),
        [selectedCategory],
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

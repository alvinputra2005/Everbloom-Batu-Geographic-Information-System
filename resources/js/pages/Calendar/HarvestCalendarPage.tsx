import { useState } from 'react';

import { motion } from 'motion/react';
import {
    Apple,
    Calendar,
    BellRing,
    CheckCircle2,
    Circle,
    CircleDot,
    CloudRain,
    Droplets,
    Flower,
    Flower2,
    Leaf,
    Minus,
    Mountain,
    Sparkles,
    Sprout,
    Star,
    Sun,
} from 'lucide-react';

import type { MobileBottomNavItem } from '@/components/common/MobileBottomNav';
import type { NavbarItem } from '@/components/common/Navbar';
import MainLayout from '@/layouts/MainLayout';

const navbarItems: NavbarItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Recommendations', href: '#recommendations' },
    { label: 'Map', href: '#map' },
    { label: 'Calendar', href: '#', active: true },
    { label: 'About', href: '#about' },
];

const mobileNavItems: MobileBottomNavItem[] = [
    { label: 'Home', href: '/', icon: 'home' },
    { label: 'Explore', href: '#recommendations', icon: 'explore' },
    { label: 'Map', href: '#map', icon: 'map' },
    { label: 'Calendar', href: '#', icon: 'calendar', active: true },
    { label: 'About', href: '#about', icon: 'about' },
];

const months = [
    { name: 'July', icon: <Sun className="h-4 w-4" /> },
    { name: 'August' },
    { name: 'September' },
    { name: 'October' },
    { name: 'November' },
    { name: 'December' },
    { name: 'January' },
    { name: 'February' },
    { name: 'March' },
    { name: 'April' },
    { name: 'May' },
    { name: 'June' },
];

const commodities = {
    fruits: [
        {
            name: 'Apel (Manalagi/Rome)',
            icon: <Leaf className="h-4 w-4" />,
            status: ['off', 'available', 'available', 'peak', 'peak', 'off'],
            color: 'bg-[var(--color-primary-fixed)] text-[var(--app-primary)]',
        },
        {
            name: 'Jeruk (Siam Honey)',
            icon: <Circle className="h-4 w-4" />,
            status: ['available', 'peak', 'available', 'off', 'available', 'peak'],
            color: 'bg-[var(--color-secondary-container)] text-[var(--color-secondary)]',
        },
        {
            name: 'Strawberry',
            icon: <CircleDot className="h-4 w-4" />,
            status: ['peak', 'off', 'off', 'available', 'available', 'peak'],
            color: 'bg-[var(--color-error-container)] text-[var(--color-error)]',
        },
        {
            name: 'Jambu (Kristal)',
            icon: <Circle className="h-4 w-4" />,
            status: ['available', 'available', 'available', 'available', 'available', 'available'],
            color: 'bg-[var(--color-surface-container-highest)] text-[var(--app-primary)]',
        },
        {
            name: 'Buah Naga',
            icon: <Droplets className="h-4 w-4" />,
            status: ['peak', 'available', 'off', 'off', 'off', 'peak'],
            color: 'bg-[var(--color-error-container)] text-[var(--color-error)]',
        },
        {
            name: 'Sayuran (Brokoli, Kubis)',
            icon: <Apple className="h-4 w-4" />,
            status: ['available', 'available', 'available', 'available', 'available', 'available'],
            color: 'bg-[var(--color-primary-fixed)] text-[var(--app-primary)]',
        },
    ],
    flowers: [
        {
            name: 'Bunga Krisan',
            icon: <Flower2 className="h-4 w-4" />,
            status: ['available', 'available', 'peak', 'available', 'peak', 'available'],
            color: 'bg-[var(--color-tertiary-container)] text-[var(--color-on-tertiary-container)]',
        },
        {
            name: 'Aster & Dahlia',
            icon: <Flower className="h-4 w-4" />,
            status: ['available', 'available', 'available', 'peak', 'available', 'available'],
            color: 'bg-[var(--color-secondary-container)] text-[var(--color-secondary)]',
        },
        {
            name: 'Hortensia',
            icon: <CloudRain className="h-4 w-4" />,
            status: ['off', 'off', 'available', 'peak', 'available', 'off'],
            color: 'bg-[var(--color-tertiary-fixed-dim)] text-[var(--color-tertiary)]',
        },
        {
            name: 'Marigold & Celosia',
            icon: <Sparkles className="h-4 w-4" />,
            status: ['available', 'available', 'available', 'available', 'peak', 'available'],
            color: 'bg-[var(--color-primary-fixed)] text-[var(--app-primary)]',
        },
        {
            name: 'Mawar & Matahari',
            icon: <Flower2 className="h-4 w-4" />,
            status: ['available', 'peak', 'off', 'off', 'available', 'peak'],
            color: 'bg-[var(--color-secondary-container)] text-[var(--color-on-secondary-container)]',
        },
        {
            name: 'Anggrek & Petunia',
            icon: <Sprout className="h-4 w-4" />,
            status: ['available', 'available', 'available', 'available', 'available', 'available'],
            color: 'bg-[var(--color-error-container)] text-[var(--color-error)]',
        },
        {
            name: 'Kaktus',
            icon: <Flower2 className="h-4 w-4" />,
            status: ['available', 'available', 'available', 'available', 'available', 'available'],
            color: 'bg-[var(--color-surface-container-highest)] text-[var(--app-primary)]',
        },
    ],
};

function StatusIcon({ status }: { status: string }) {
    if (status === 'peak') {
        return (
            <div className="inline-flex rounded-full bg-[var(--app-primary-strong)] p-2">
                <Star className="h-4 w-4 fill-current text-white" />
            </div>
        );
    }

    if (status === 'available') {
        return <CheckCircle2 className="h-5 w-5 text-[var(--color-secondary)]" />;
    }

    return <Minus className="h-5 w-5 text-[var(--color-outline)]" />;
}

export default function HarvestCalendarPage() {
    const [selectedMonth, setSelectedMonth] = useState('July');

    return (
        <MainLayout navbarItems={navbarItems} mobileBottomNavItems={mobileNavItems}>
            <div className="calendar-rhythms-page">
                <section className="mx-auto max-w-7xl px-4 pt-8 pb-24 md:px-8">
                    <header className="mb-12">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-4 text-5xl font-bold tracking-tight text-[var(--app-primary)] md:text-7xl"
                        >
                            Harvest Rhythms
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="max-w-2xl text-lg leading-relaxed text-[var(--app-text-muted)]"
                        >
                            Plan your journey through the orchards of Batu. Align your visit with the peak blooming and
                            fruiting cycles of our regional heritage.
                        </motion.p>
                    </header>

                    <section className="calendar-hide-scrollbar -mx-4 mb-12 overflow-x-auto px-4">
                        <div className="flex min-w-max gap-4 pb-4">
                            {months.map((month) => (
                                <button
                                    key={month.name}
                                    type="button"
                                    onClick={() => setSelectedMonth(month.name)}
                                    className={`flex items-center gap-2 rounded-full px-8 py-4 font-bold transition-all ${
                                        selectedMonth === month.name
                                            ? 'bg-[var(--app-primary)] text-white shadow-lg shadow-[color:rgba(19,82,39,0.2)]'
                                            : 'bg-[var(--color-surface-container-low)] text-[var(--app-text-muted)] hover:bg-[var(--color-surface-container-high)]'
                                    }`}
                                >
                                    <span className="text-lg">{month.name}</span>
                                    {month.icon}
                                </button>
                            ))}
                        </div>
                    </section>

                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                        <div className="flex flex-col gap-8 lg:col-span-4">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className="relative overflow-hidden rounded-t-xl rounded-b-md bg-[var(--color-surface-container-low)] p-8"
                            >
                                <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-[var(--app-primary)]/5 transition-transform duration-700 group-hover:scale-150" />
                                <div className="relative z-10">
                                    <span className="mb-6 inline-block rounded-full bg-[var(--app-primary-strong)] px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[var(--color-on-primary)]">
                                        Monthly Insight
                                    </span>
                                    <h3 className="mb-4 text-2xl font-bold text-[var(--app-text)]">
                                        Why {selectedMonth} is Special
                                    </h3>
                                    <p className="mb-6 leading-relaxed text-[var(--app-text-muted)]">
                                        The mist clears early, leaving the air crisp and dry. This is the sweetness peak
                                        for Malang Apples. The lack of rain concentrates the sugars, making them
                                        incredibly crunchy.
                                    </p>
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-4 rounded-lg bg-[var(--color-surface-container-lowest)] p-4">
                                            <Droplets className="h-6 w-6 text-[var(--color-tertiary)]" />
                                            <div>
                                                <p className="text-xs font-bold uppercase text-[var(--app-text-muted)]">
                                                    Rainfall
                                                </p>
                                                <p className="text-sm font-semibold">Low (20mm) - Dry Skies</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4 rounded-lg bg-[var(--color-surface-container-lowest)] p-4">
                                            <Mountain className="h-6 w-6 text-[var(--app-primary)]" />
                                            <div>
                                                <p className="text-xs font-bold uppercase text-[var(--app-text-muted)]">
                                                    Field Condition
                                                </p>
                                                <p className="text-sm font-semibold">Firm & Accessible</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="group relative aspect-square overflow-hidden rounded-t-xl rounded-b-md"
                            >
                                <img
                                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCi9VP9Y0XV57M9Rzp3q-fHQxrRQbnnK8Atc2DH18tdauvMoG8nr2qhdLZnvZXrjixhUMOGjrBSxH0kq-io25gUqjo9Yg6BKY7c_yJBxgvYnKDxZ47cKNVDvSpbdCNieIz8ML5o63fHtCjc5AhXApCgmmwLjoVNzSHbMK1sHGo8m_N-pJHlkK8tg7euV-o73JwcUQub9a-JVl6PVGMfq_ujrTP9rEc5otICnRIznsmOjPOasBFnuMptBwjMoTpcqByVp0-XeuVwQ7Qb"
                                    alt="Malang Manalagi Apple"
                                    referrerPolicy="no-referrer"
                                />
                                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-transparent to-transparent p-8">
                                    <p className="mb-1 text-sm font-bold uppercase tracking-tighter text-[var(--color-secondary-fixed)]">
                                        Now at Peak
                                    </p>
                                    <h4 className="text-3xl font-extrabold text-white">Malang Manalagi</h4>
                                </div>
                            </motion.div>
                        </div>

                        <div className="lg:col-span-8">
                            <div className="mb-8 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
                                <div className="calendar-hide-scrollbar flex max-w-full gap-2 overflow-x-auto rounded-full bg-[var(--color-surface-container-low)] p-1.5">
                                    <button
                                        type="button"
                                        className="whitespace-nowrap rounded-full bg-white px-6 py-2 font-bold text-[var(--app-primary)] shadow-sm"
                                    >
                                        All
                                    </button>
                                    <button
                                        type="button"
                                        className="whitespace-nowrap rounded-full px-6 py-2 text-[var(--app-text-muted)] transition-all hover:bg-[var(--color-surface-container-highest)]"
                                    >
                                        Fruits & Veggies
                                    </button>
                                    <button
                                        type="button"
                                        className="whitespace-nowrap rounded-full px-6 py-2 text-[var(--app-text-muted)] transition-all hover:bg-[var(--color-surface-container-highest)]"
                                    >
                                        Flowers
                                    </button>
                                </div>
                                <div className="flex flex-wrap gap-6">
                                    <div className="flex items-center gap-2">
                                        <Star className="h-4 w-4 fill-current text-[var(--app-primary)]" />
                                        <span className="text-xs font-bold uppercase text-[var(--app-text-muted)]">
                                            Peak
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <CheckCircle2 className="h-4 w-4 text-[var(--color-secondary)]" />
                                        <span className="text-xs font-bold uppercase text-[var(--app-text-muted)]">
                                            Available
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Minus className="h-4 w-4 text-[var(--color-outline)]" />
                                        <span className="text-xs font-bold uppercase text-[var(--app-text-muted)]">
                                            Off-Season
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="overflow-x-auto rounded-xl bg-[var(--color-surface-container-lowest)] shadow-xl shadow-black/5"
                            >
                                <table className="min-w-[800px] w-full border-collapse text-left">
                                    <thead>
                                        <tr className="bg-[var(--color-surface-container-low)]">
                                            <th className="w-48 p-6 text-xs font-bold uppercase text-[var(--app-text-muted)]">
                                                Commodity
                                            </th>
                                            <th className="p-6 text-center text-xs font-bold uppercase text-[var(--app-text-muted)]">
                                                Jan
                                            </th>
                                            <th className="p-6 text-center text-xs font-bold uppercase text-[var(--app-text-muted)]">
                                                Mar
                                            </th>
                                            <th className="p-6 text-center text-xs font-bold uppercase text-[var(--app-text-muted)]">
                                                May
                                            </th>
                                            <th className="p-6 text-center text-xs font-bold uppercase text-[var(--app-text-muted)]">
                                                Jul
                                            </th>
                                            <th className="p-6 text-center text-xs font-bold uppercase text-[var(--app-text-muted)]">
                                                Sep
                                            </th>
                                            <th className="p-6 text-center text-xs font-bold uppercase text-[var(--app-text-muted)]">
                                                Nov
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[var(--color-surface-container-low)]">
                                        <tr className="bg-[color:rgba(245,244,239,0.3)]">
                                            <td
                                                className="px-6 py-3 text-[10px] font-extrabold uppercase tracking-widest text-[var(--app-primary)]/60"
                                                colSpan={7}
                                            >
                                                Fruits & Vegetables
                                            </td>
                                        </tr>
                                        {commodities.fruits.map((item) => (
                                            <tr
                                                key={item.name}
                                                className="group transition-colors hover:bg-[var(--color-surface-container-low)]"
                                            >
                                                <td className="p-6">
                                                    <div className="flex items-center gap-4">
                                                        <div
                                                            className={`flex h-8 w-8 items-center justify-center rounded-full ${item.color}`}
                                                        >
                                                            {item.icon}
                                                        </div>
                                                        <span className="text-sm font-bold">{item.name}</span>
                                                    </div>
                                                </td>
                                                {item.status.map((status, index) => (
                                                    <td key={`${item.name}-${index}`} className="p-6 text-center">
                                                        <StatusIcon status={status} />
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                        <tr className="bg-[color:rgba(245,244,239,0.3)]">
                                            <td
                                                className="px-6 py-3 text-[10px] font-extrabold uppercase tracking-widest text-[var(--app-primary)]/60"
                                                colSpan={7}
                                            >
                                                Flowers
                                            </td>
                                        </tr>
                                        {commodities.flowers.map((item) => (
                                            <tr
                                                key={item.name}
                                                className="group transition-colors hover:bg-[var(--color-surface-container-low)]"
                                            >
                                                <td className="p-6">
                                                    <div className="flex items-center gap-4">
                                                        <div
                                                            className={`flex h-8 w-8 items-center justify-center rounded-full ${item.color}`}
                                                        >
                                                            {item.icon}
                                                        </div>
                                                        <span className="text-sm font-bold">{item.name}</span>
                                                    </div>
                                                </td>
                                                {item.status.map((status, index) => (
                                                    <td key={`${item.name}-${index}`} className="p-6 text-center">
                                                        <StatusIcon status={status} />
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                <div className="bg-[color:rgba(245,244,239,0.5)] p-8">
                                    <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
                                        <div className="flex items-center gap-3">
                                            <div className="rounded-lg bg-[var(--color-tertiary-container)] p-2 text-[var(--color-on-tertiary-container)]">
                                                <Calendar className="h-6 w-6" />
                                            </div>
                                            <p className="text-sm font-medium">
                                                Next peak cycle starts in{' '}
                                                <span className="font-bold text-[var(--app-primary)]">14 days</span>{' '}
                                                (Batu Apples)
                                            </p>
                                        </div>
                                        <button
                                            type="button"
                                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--app-primary)] px-8 py-3 font-bold text-white transition-all hover:opacity-90 md:w-auto"
                                        >
                                            Get Harvest Alerts
                                            <BellRing className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>
            </div>
        </MainLayout>
    );
}

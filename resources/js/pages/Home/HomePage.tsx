import type { ReactNode } from 'react';

import { motion } from 'motion/react';
import {
    AlertTriangle,
    ArrowRight,
    Calendar,
    Check,
    ChevronDown,
    CloudRain,
    Heart,
    Leaf,
    MapPin,
    Minus,
    Search,
    Star,
    Sun,
} from 'lucide-react';

import MainLayout from '@/layouts/MainLayout';

type DestinationStatus = 'Peak Status' | 'Available' | 'Off-Season';

interface DestinationCardProps {
    image: string;
    title: string;
    location: string;
    tags: string;
    status: DestinationStatus;
    time: string;
}

interface EventCardProps {
    image: string;
    date: string;
    title: string;
    desc: string;
}

interface JourneyStep {
    icon: ReactNode;
    title: string;
    desc: string;
    color: string;
}

const journeySteps: JourneyStep[] = [
    {
        icon: <Search className="h-8 w-8 text-[var(--app-primary)]" />,
        title: '1. Check Status',
        desc: "Our real-time dashboard tracks soil moisture and crop maturity across Batu's major farms.",
        color: 'bg-[color:rgba(19,82,39,0.1)]',
    },
    {
        icon: <Calendar className="h-8 w-8 text-[var(--app-primary-strong)]" />,
        title: '2. Book Your Slot',
        desc: 'Pick a date within the peak harvest window to ensure the best picking experience.',
        color: 'bg-[color:rgba(47,107,61,0.12)]',
    },
    {
        icon: <Leaf className="h-8 w-8 text-emerald-600" />,
        title: '3. Harvest Nature',
        desc: 'Arrive at the destination and enjoy fresh, sun-ripened Batu apples directly from the tree.',
        color: 'bg-emerald-100',
    },
];

const destinations: DestinationCardProps[] = [
    {
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDaAM0qafZVLQZXpFXeLnRvWi3OzK7OQ6hAkKlncF51DYSHLC9jpwh6ZjPFhP2hBNxfZmWkGYS2MJ_Tto8qxQp5uIGI6LM8r7RqheAF1WSd-3wDH3rcZKWuzQud9VNZvZgWZ9DrICqte_Swq3wx9gavqIISCuRAOS2Meg4p_kgPXSSZfxljOohBmn3bkPbMckRM8cOt8nOXaDjj9BB20rNV0vs4g4MEP_vrhGwpHVILprtoRvYuKEPU6ktZwSGqgn_Ki9JAXNUvpvQO',
        title: 'Kusuma Agro',
        location: 'Sisir, Batu',
        tags: 'Panen Apel & Jeruk',
        status: 'Peak Status',
        time: 'Buka 08:00',
    },
    {
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBze8ZrGGq0_UX2v66n7d0n_Qyj0RqImKVLlYAb0xxWExdOMb8HCiqMdCVUdC6MkBEPPT-ivkinyvw-YcHLRpWIM90h6XIcULpbZLTikva3YGVwGEh7W9WxkajwOSURqKzFOhej4fPwISCHR3cuO9aT-q1TVckXmY83DmpIGshNQ6V14tugxC3sagZklsvns7MhiLYznV-mmETm-IdkphzzpHyKel6pjArlZGAXnX4rTR6GqYPsgborwpRYr0wiQ23T4nfkZCrlphkN',
        title: 'Taman Bunga Selecta',
        location: 'Tulungrejo, Batu',
        tags: 'Krisan & Hydrangea',
        status: 'Available',
        time: 'Buka 07:00',
    },
    {
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAZVrasORG6iz89TS8zo-k9D9fHTrrGUMOruGTRVJUVyZk17hdHXz7n1VB9_FIs-O7lrJo4ux5JLr19HkktHJpdm6nBfGWYb07PpEotDzQv9VXYnZdPghkuC6Bt-GmDKqb-79NGbylVCihxDA2GU4tjq93bFJb2MyNROJCHBhnnPyMxr-Tg67AyXYr6e1n-0SnsVwiGdfRIXox6_jJUzU3kVlvivIp2T6LSP-RW25RQbqKGrMtscKMMnI3P1uGkgGbI5AwTFJvWc64o',
        title: 'Petik Apel Kebun 8',
        location: 'Bumiaji, Batu',
        tags: 'Apel Manalagi',
        status: 'Peak Status',
        time: 'Buka 08:30',
    },
    {
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAwvikEcBc2N80Twp5OwNb1PVJpwQ1WdOg9Bto7qc9zO7Lm36trcXjXCiI8eNExA7briqSniQ233OaoLrc0NG3BQ0zW1XdF5hazjgYh-g8tRzx6Zwfk9zTs_WAVbB0ahEqxoaGeZ59avzua9smriQeA0qIx0Im6ip3DQ9NsvO_tkgO1umYXGeOyIhlwLJAjYdH8XftNzJ3bTjdA65vXjwk-SWYT4Zy8koCrt0zyTX2S2e86trSonU8tWFMY3R8uVRH92gftvbyBEGsL',
        title: 'Lumbung Strawberry',
        location: 'Pandanrejo, Batu',
        tags: 'Greenhouse Strawberries',
        status: 'Off-Season',
        time: 'Buka 09:00',
    },
    {
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuArz5JM_uU384fOPpbcvPZlJ231vseJnKF3eD3Zp-pyX-3u-wox2tlernSaihLG2msDiNdnD4nV4PzknzeBNhiy-OHdlCOBAPkmq9rIftTDfz-gEWXMELf6AMKjOSe0vwp1mNE29ct_caGG7UqPx14svl9B52EPUt_spS31gJdc-Icp05mqhCdP-g30OdZKOXsKlMAWK_OWrW8NnjjDXyXoPzh-tfblSEPlbWfBCKyy_Bnbcv0JEvcFuwY1dqYWJxVAQzfi5iqNzkOY',
        title: 'Eco-Farm Batu',
        location: 'Oro-Oro Ombo',
        tags: 'Edukasi Ternak',
        status: 'Available',
        time: 'Buka 08:00',
    },
];

const events: EventCardProps[] = [
    {
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDbW5XH9e_0BfmAWVhYr_tq5isqx4Bmw2Zw16DDuLykVVZPGuvfj8qSPONSoNN8_RQ-pQ6x-T5nozskSV6Jj53kAoa8mrYkGFUtf18pEoTuRbjdFtp6EniLnRpWW18ARfLrXlT5-Vj2HxjYFga2qDTNuCxq6KNbykYRJOXTgBtiZtkrrjQpzdTfxvnVgWpxpDKSkQzGJ1MGerkq-OfJa3DHQrPHST-7iy7LOh8FP6hBVw-xoNxI-j8MGkBrMl8oFFoljTiu-fZfd19U',
        date: '15 July - 20 July',
        title: 'Annual Apple Harvest Festival',
        desc: 'Celebrate the peak harvest with local farmers, music, and picking contests.',
    },
    {
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBze8ZrGGq0_UX2v66n7d0n_Qyj0RqImKVLlYAb0xxWExdOMb8HCiqMdCVUdC6MkBEPPT-ivkinyvw-YcHLRpWIM90h6XIcULpbZLTikva3YGVwGEh7W9WxkajwOSURqKzFOhej4fPwISCHR3cuO9aT-q1TVckXmY83DmpIGshNQ6V14tugxC3sagZklsvns7MhiLYznV-mmETm-IdkphzzpHyKel6pjArlZGAXnX4rTR6GqYPsgborwpRYr0wiQ23T4nfkZCrlphkN',
        date: 'August 1st',
        title: 'Grand Selecta Flower Opening',
        desc: 'Be the first to see the new garden layout for the Chrysanthemum season.',
    },
    {
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCgT4XyxfOKNvzYlnQQL8c2EJ4mXR9fWxl64oliYiWb7N5tA9iCvZDPj2bIsh0bspRSWXilEqg2trwXWf4mbIKqzQhYPzePv6221ZqQHGg0p6FED8yQnfMXh9wqFL8Fh7fVPq3vd4NdovLIizGpbvwvugNyPoKwweZfcvNA37mKIBqonJr-ND013o-VZRT82bc8PNn2EoAX7SY4xSCm0phQyNSEvfXnKrLyW0bYjuKB5vYZv-21zgaGQwb3r-cibR_1ghra6Q4zE6-a',
        date: 'Every Weekend',
        title: 'Organic Farm-to-Table Workshop',
        desc: 'Learn how to grow your own Batu-quality herbs and vegetables at home.',
    },
];

function DestinationCard({ image, title, location, tags, status, time }: DestinationCardProps) {
    return (
        <motion.article
            whileHover={{ y: -8 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="home-bloom-card group overflow-hidden rounded-[2rem] border border-stone-100 bg-white"
        >
            <div className="relative h-48 overflow-hidden">
                <img
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    src={image}
                    alt={title}
                    referrerPolicy="no-referrer"
                />
                <div
                    className={`absolute top-3 right-3 flex items-center gap-1 rounded-full px-3 py-1 text-[10px] font-bold uppercase ${
                        status === 'Peak Status'
                            ? 'bg-[var(--app-primary)] text-white'
                            : status === 'Available'
                              ? 'bg-[var(--app-chip)] text-[var(--app-primary)]'
                              : 'bg-stone-200 text-stone-600'
                    }`}
                >
                    {status === 'Peak Status' ? <Star className="h-3 w-3 fill-current" /> : null}
                    {status === 'Available' ? <Check className="h-3 w-3" /> : null}
                    {status === 'Off-Season' ? <Minus className="h-3 w-3" /> : null}
                    {status}
                </div>
            </div>
            <div className="p-5">
                <h3 className="mb-1 text-lg font-bold text-[var(--app-text)]">{title}</h3>
                <p className="mb-3 flex items-center gap-1 text-sm text-[var(--app-text-muted)]">
                    <MapPin className="h-4 w-4" /> {location}
                </p>
                <div className="flex items-center justify-between gap-4">
                    <span className="text-xs font-bold text-[var(--app-primary-strong)]">{tags}</span>
                    <span className="text-xs text-[var(--app-text-muted)]">{time}</span>
                </div>
            </div>
        </motion.article>
    );
}

function EventCard({ image, date, title, desc }: EventCardProps) {
    return (
        <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.45 }}
            className="home-bloom-card group relative overflow-hidden rounded-[2rem] border border-stone-100 bg-white"
        >
            <div className="h-64 overflow-hidden">
                <img
                    src={image}
                    alt={title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                />
            </div>
            <div className="p-6">
                <div className="mb-2 flex items-center gap-2 text-sm font-bold text-[var(--app-primary)]">
                    <Calendar className="h-4 w-4" />
                    {date}
                </div>
                <h3 className="mb-2 text-xl font-bold text-[var(--app-text)]">{title}</h3>
                <p className="mb-4 text-sm text-[var(--app-text-muted)]">{desc}</p>
                <button type="button" className="flex items-center gap-1 font-bold text-[var(--app-primary)] hover:underline">
                    Learn More <ArrowRight className="h-4 w-4" />
                </button>
            </div>
        </motion.article>
    );
}

export default function HomePage() {
    return (
        <MainLayout>
            <div className="home-bloom-page overflow-hidden bg-[var(--app-surface)] text-[var(--app-text)]">
                <section className="relative -mt-20 flex min-h-[85vh] items-center justify-center overflow-hidden px-6 pt-20 sm:px-8">
                    <div className="absolute inset-0 z-0">
                        <div className="absolute inset-0 z-10 bg-[linear-gradient(180deg,rgba(250,249,244,0)_0%,rgba(250,249,244,0.22)_55%,rgba(250,249,244,1)_100%)]" />
                        <img
                            className="h-full w-full object-cover"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDwLhuMosBTipjZ3CDGaYP5ufns7vppRPml7D21vLlAG3GKY8JEcUP7ZMgGuSrqnaMRUiNic8XbvW5iwkWfcyjYlrWqRBljGeiZTYvMjqgcdaY9U2a8B6QGFcbr-rVbbjLfAzoISeCPvNwR1BEn7hY4zL9BOrnVK_Xb8BInUVlS9QYNy_7NHKL7XNc1uecmNIIKqCq1WfT8RSk646-ZgkkwGQfLoqmK6zFXMmonb9vGWFC0pY4MemO0duWrb1-EacZXsmV8PtNzQjbY"
                            alt="Batu City Valley"
                            referrerPolicy="no-referrer"
                        />
                    </div>

                    <div className="relative z-20 mx-auto max-w-4xl text-center">
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="mb-6 inline-block rounded-full bg-[var(--app-chip)] px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--app-primary)]"
                        >
                            Discovery Batu
                        </motion.span>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1, duration: 0.5 }}
                            className="mb-6 text-5xl font-bold leading-[1.1] tracking-tight text-[var(--app-text)] md:text-7xl"
                        >
                            Find the best time to visit <span className="italic text-[var(--app-primary)]">agrotourism</span>{' '}
                            destinations.
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="mx-auto mb-10 max-w-2xl text-lg font-medium text-[var(--app-text-muted)] md:text-xl"
                        >
                            Batu&apos;s harvest cycles are as unique as its mountain air. Discover which orchards are at peak bloom today.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3, duration: 0.45 }}
                            className="ambient-bloom flex flex-col items-center gap-4 rounded-[2rem] bg-white/80 p-4 backdrop-blur-2xl md:flex-row md:p-6"
                        >
                            <div className="relative w-full text-left md:flex-1">
                                <Calendar className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-[var(--app-primary)]" />
                                <input
                                    className="w-full rounded-full border-none bg-stone-100/60 py-4 pr-4 pl-12 text-[var(--app-text)] outline-none ring-0 placeholder:text-[color:rgba(68,72,61,0.65)] focus:ring-2 focus:ring-[color:rgba(19,82,39,0.16)]"
                                    placeholder="Select visit date"
                                    type="text"
                                />
                            </div>
                            <div className="relative w-full text-left md:flex-1">
                                <Leaf className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-[var(--app-primary)]" />
                                <select className="w-full cursor-pointer appearance-none rounded-full border-none bg-stone-100/60 py-4 pr-10 pl-12 text-[var(--app-text)] outline-none ring-0 focus:ring-2 focus:ring-[color:rgba(19,82,39,0.16)]">
                                    <option>All Categories</option>
                                    <option>Fruit Orchards</option>
                                    <option>Flower Gardens</option>
                                    <option>Vegetable Farms</option>
                                </select>
                                <ChevronDown className="pointer-events-none absolute top-1/2 right-4 h-5 w-5 -translate-y-1/2 text-[var(--app-primary)]" />
                            </div>
                            <button
                                type="button"
                                className="chlorophyll-gradient w-full rounded-[1.25rem] px-10 py-4 font-bold text-white shadow-lg shadow-[color:rgba(19,82,39,0.2)] transition-all hover:translate-y-0.5 md:w-auto"
                            >
                                Get Recommendations
                            </button>
                        </motion.div>
                    </div>
                </section>

                <section className="mx-auto max-w-7xl px-8 py-24">
                    <div className="mb-16 text-center">
                        <h2 className="mb-4 text-3xl font-bold md:text-4xl">Your Journey to the Orchard</h2>
                        <p className="text-[var(--app-text-muted)]">Simple steps to planning your perfect harvest day.</p>
                    </div>
                    <div className="grid gap-12 md:grid-cols-3">
                        {journeySteps.map((step, index) => (
                            <motion.div
                                key={step.title}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.4 }}
                                transition={{ duration: 0.45, delay: index * 0.08 }}
                                whileHover={{ y: -5 }}
                                className="group"
                            >
                                <div className={`mb-6 flex h-16 w-16 items-center justify-center rounded-[1.5rem] ${step.color} transition-transform group-hover:scale-110`}>
                                    {step.icon}
                                </div>
                                <h3 className="mb-3 text-xl font-bold">{step.title}</h3>
                                <p className="leading-relaxed text-[var(--app-text-muted)]">{step.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                <section id="calendar" className="mx-auto mb-24 max-w-7xl px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.25 }}
                        transition={{ duration: 0.45 }}
                        className="ambient-bloom flex flex-col items-center justify-between gap-8 rounded-[2rem] border border-stone-200 bg-stone-100 p-10 md:flex-row"
                    >
                        <div className="flex-1 space-y-4">
                            <h2 className="text-3xl font-bold text-[var(--app-primary)]">The Rhythm of the Highlands</h2>
                            <p className="text-lg text-[var(--app-text-muted)]">
                                Batu&apos;s agrotourism is dictated by a delicate balance of tropical rainfall and highland cooling. From the peak apple harvests of April-June to the vibrant chrysanthemum blooms of late year, discover the perfect season for your visit.
                            </p>
                        </div>
                        <button
                            type="button"
                            className="whitespace-nowrap rounded-full bg-[var(--app-primary)] px-8 py-4 font-bold text-white shadow-lg shadow-[color:rgba(19,82,39,0.2)] transition-all hover:bg-[var(--app-primary-strong)]"
                        >
                            View Full Calendar
                        </button>
                    </motion.div>
                </section>

                <section id="recommendations" className="mx-auto mb-24 max-w-7xl px-6">
                    <div className="mb-10 flex items-end justify-between gap-4">
                        <div>
                            <span className="text-sm font-bold uppercase tracking-[0.3em] text-[var(--app-primary)]">
                                Explore Batu
                            </span>
                            <h2 className="mt-2 text-4xl font-bold">Destinasi Populer</h2>
                        </div>
                        <button
                            type="button"
                            className="flex items-center gap-2 font-bold text-[var(--app-primary)] transition-all hover:gap-3"
                        >
                            Lihat Semua <ArrowRight className="h-5 w-5" />
                        </button>
                    </div>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5">
                        {destinations.map((destination) => (
                            <DestinationCard key={destination.title} {...destination} />
                        ))}
                    </div>
                </section>

                <section id="map" className="mx-auto mb-24 max-w-7xl px-6">
                    <div className="mb-10">
                        <span className="text-sm font-bold uppercase tracking-[0.3em] text-[var(--app-primary)]">
                            Don&apos;t Miss Out
                        </span>
                        <h2 className="mt-2 text-4xl font-bold">Upcoming Harvest Events</h2>
                    </div>
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                        {events.map((event) => (
                            <EventCard key={event.title} {...event} />
                        ))}
                    </div>
                </section>

                <section className="mx-auto mb-24 max-w-7xl px-6">
                    <div className="flex flex-col items-center gap-12 lg:flex-row">
                        <motion.div
                            initial={{ opacity: 0, x: -32 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.5 }}
                            className="space-y-8 lg:w-1/2"
                        >
                            <div>
                                <h2 className="mb-6 text-4xl font-bold">Smart Seasonal Guide</h2>
                                <p className="text-lg leading-relaxed text-[var(--app-text-muted)]">
                                    Batu&apos;s agrotourism is dictated by a delicate balance of tropical rainfall and highland cooling. Understanding the <b>Crop Cycle</b> is key to finding the sweetest fruit.
                                </p>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-start gap-4 rounded-r-[2rem] rounded-l-full border-l-4 border-[var(--app-primary)] bg-stone-100 p-6">
                                    <div className="rounded-full bg-[color:rgba(19,82,39,0.1)] p-3">
                                        <CloudRain className="h-6 w-6 text-[var(--app-primary)]" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold">November – March (Wet Season)</h4>
                                        <p className="mt-1 text-sm text-[var(--app-text-muted)]">
                                            High rainfall encourages rapid growth. Best for visiting flowering gardens and indoor strawberry farms.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4 rounded-r-[2rem] rounded-l-full border-l-4 border-[var(--app-primary-strong)] bg-stone-100 p-6">
                                    <div className="rounded-full bg-[color:rgba(47,107,61,0.1)] p-3">
                                        <Sun className="h-6 w-6 text-[var(--app-primary-strong)]" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold">June – August (Peak Harvest)</h4>
                                        <p className="mt-1 text-sm text-[var(--app-text-muted)]">
                                            Cool, dry nights produce the highest sugar content in apples. This is the absolute peak season for visitors.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 32 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.5 }}
                            className="group relative lg:w-1/2"
                        >
                            <div className="relative overflow-hidden rounded-[3rem] shadow-2xl">
                                <img
                                    alt="Batu Seasonal Harvest Fruits"
                                    className="aspect-[1.2/1] w-full object-cover"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDaAM0qafZVLQZXpFXeLnRvWi3OzK7OQ6hAkKlncF51DYSHLC9jpwh6ZjPFhP2hBNxfZmWkGYS2MJ_Tto8qxQp5uIGI6LM8r7RqheAF1WSd-3wDH3rcZKWuzQud9VNZvZgWZ9DrICqte_Swq3wx9gavqIISCuRAOS2Meg4p_kgPXSSZfxljOohBmn3bkPbMckRM8cOt8nOXaDjj9BB20rNV0vs4g4MEP_vrhGwpHVILprtoRvYuKEPU6ktZwSGqgn_Ki9JAXNUvpvQO"
                                    referrerPolicy="no-referrer"
                                />
                                <div className="absolute right-6 bottom-6 left-6 flex gap-4">
                                    <div className="flex-1 rounded-[1.5rem] bg-white/90 p-4 backdrop-blur-md">
                                        <div className="text-2xl font-bold text-[var(--app-primary)]">18°C</div>
                                        <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--app-text-muted)]">
                                            Avg Temp
                                        </div>
                                    </div>
                                    <div className="flex-1 rounded-[1.5rem] bg-white/90 p-4 backdrop-blur-md">
                                        <div className="text-2xl font-bold text-[var(--app-primary)]">250mm</div>
                                        <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--app-text-muted)]">
                                            Monthly Rain
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                <section id="about" className="mx-auto mb-24 max-w-7xl px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.25 }}
                        transition={{ duration: 0.45 }}
                        className="flex flex-col items-center justify-between gap-8 rounded-[3rem] border border-[color:rgba(19,82,39,0.1)] bg-[color:rgba(19,82,39,0.05)] p-8 md:flex-row md:p-12"
                    >
                        <div className="max-w-2xl text-center md:text-left">
                            <div className="mb-4 flex items-center justify-center gap-3 md:justify-start">
                                <Heart className="h-8 w-8 text-[var(--app-primary)]" />
                                <h2 className="text-3xl font-bold">Community & Facility Care</h2>
                            </div>
                            <p className="text-lg text-[var(--app-text-muted)]">
                                Help us maintain the beauty of Batu&apos;s agrotourism destinations. Our community thrives when we care for one another and our shared environment. Report any damaged facilities or public issues here to help us keep our gardens pristine.
                            </p>
                        </div>
                        <button
                            type="button"
                            className="chlorophyll-gradient flex items-center gap-2 whitespace-nowrap rounded-[1.25rem] px-8 py-4 font-bold text-white shadow-lg shadow-[color:rgba(19,82,39,0.2)] transition-all hover:translate-y-0.5"
                        >
                            <AlertTriangle className="h-5 w-5" />
                            Lapor Kerusakan Fasilitas
                        </button>
                    </motion.div>
                </section>
            </div>
        </MainLayout>
    );
}

import { Head } from '@inertiajs/react';
import { motion } from 'motion/react';
import { Banknote, CalendarDays, Cpu, Leaf, LineChart } from 'lucide-react';

import type { MobileBottomNavItem } from '@/components/common/MobileBottomNav';
import type { NavbarItem } from '@/components/common/Navbar';
import MainLayout from '@/layouts/MainLayout';

const navbarItems: NavbarItem[] = [
    { label: 'Beranda', href: '/' },
    { label: 'Destinasi', href: '/destinations' },
    { label: 'Kalender', href: '/calendar' },
    { label: 'Tentang', href: '/tentang', active: true },
];

const mobileNavItems: MobileBottomNavItem[] = [
    { label: 'Beranda', href: '/', icon: 'home' },
    { label: 'Destinasi', href: '/destinations', icon: 'explore' },
    { label: 'Kalender', href: '/calendar', icon: 'calendar' },
    { label: 'Tentang', href: '/tentang', icon: 'about', active: true },
];

const IMAGES = {
    hero: '/images/Ladang-Bunga-Matahari.avif',
    farmer:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAKLJS_qyET-2KaTZCbz8Gonr-ZXsyTc3bws1gtRIWvhOF7NkCkH5pSeWvv8EJsHaHaATNQ_r_o9GbWcFDXRNHPc62IPvlr2qAtucOS8I7zenoTdD44hY2wyYJ2dU7eOwb27Dc_iN0mMTc2NrQVVpUuR2ShdofDAzoJii2pKKcCYDH0DdDJZomHGc-QW3kuPo0jPNFhqAYjQcoGAQRXMAGMOJ1deCVqOovWRQhYg5UShsFfrFWn_q-2isX8KoEDwbPOxT2RHYYE7lIn',
    apple: '/images/apel.jpg',
    recommendation: '/images/5-Rekomendasi-Spot-Wisata-Bertema-Kebun-di-Malang-dan-Batu.jpg',
};

const intelligenceCards = [
    {
        icon: LineChart,
        iconClassName: 'text-sky-500',
        iconBgClassName: 'bg-sky-50',
        title: 'Real-time Data',
        description: 'Sinkronisasi cuaca dan curah hujan harian untuk memprediksi kematangan buah.',
    },
    {
        icon: CalendarDays,
        iconClassName: 'text-[var(--app-primary)]',
        iconBgClassName: 'bg-[color:rgba(177,242,184,0.4)]',
        title: 'Siklus Musiman',
        description: 'Panduan visual fase pertumbuhan, mulai dari tunas hingga siap panen.',
    },
    {
        icon: Cpu,
        iconClassName: 'text-orange-500',
        iconBgClassName: 'bg-orange-50',
        title: 'AI Recommendation',
        description: 'Rekomendasi kebun yang dipersonalisasi berdasarkan preferensi buah dan durasi kunjung.',
    },
];

function AboutBadge({ children }: { children: string }) {
    return (
        <span className="inline-flex rounded-full bg-[color:rgba(177,242,184,0.8)] px-3 py-1 text-[11px] font-bold tracking-tight text-[var(--app-primary)] sm:px-4 sm:py-1.5 sm:text-sm">
            {children}
        </span>
    );
}

export default function AboutPage() {
    return (
        <MainLayout navbarItems={navbarItems} mobileBottomNavItems={mobileNavItems}>
            <Head title="Tentang Everbloom" />

            <div className="bg-[var(--app-surface)] text-[var(--app-text)]">
                <main className="mx-auto flex max-w-7xl flex-col gap-16 px-4 pt-6 pb-16 sm:px-6 md:gap-24 md:pt-8 lg:px-8">
                    <section>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.75 }}
                            className="group relative overflow-hidden rounded-[2rem] md:rounded-[3rem]"
                        >
                            <img
                                src={IMAGES.hero}
                                alt="Ladang bunga matahari di Batu"
                                className="h-[320px] w-full scale-[1.02] object-cover blur-[1.5px] transition-transform duration-1000 group-hover:scale-105 sm:h-[420px] lg:h-[600px]"
                            />
                            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,24,12,0.72)_0%,rgba(7,24,12,0.52)_38%,rgba(7,24,12,0.26)_100%)]" />
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,rgba(0,0,0,0.16),transparent_48%)]" />

                            <div className="absolute inset-0 flex items-center px-6 py-8 sm:px-8 lg:px-10">
                                <div className="max-w-2xl text-white">
                                    <h1 className="text-4xl font-bold tracking-tight text-white drop-shadow-[0_8px_24px_rgba(0,0,0,0.32)] sm:text-5xl lg:text-7xl">
                                        Tentang Kami
                                    </h1>
                                    <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/95 drop-shadow-[0_6px_18px_rgba(0,0,0,0.28)] sm:text-base lg:text-lg">
                                        Everbloom adalah jembatan digital antara petualang dan kekayaan agrikultur Kota Batu. Kami hadir
                                        untuk melestarikan warisan alam sambil memberikan pengalaman wisata yang cerdas dan berkelanjutan.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </section>

                    <section>
                        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.45 }}
                                className="space-y-6 md:space-y-8"
                            >
                                <AboutBadge>Misi Kami</AboutBadge>
                                <h2 className="max-w-xl text-3xl font-bold leading-tight text-[var(--app-primary)] sm:text-4xl lg:text-5xl">
                                    Mendorong Pariwisata Berkelanjutan & Memberdayakan Petani Lokal
                                </h2>
                                <div className="max-w-xl space-y-5 text-sm leading-relaxed text-[var(--app-text-muted)] sm:text-base">
                                    <p>
                                        Kami percaya bahwa setiap kunjungan harus memberikan dampak positif. Melalui Everbloom, kami
                                        memprioritaskan kolaborasi langsung dengan kelompok tani setempat untuk memastikan ekonomi berputar di
                                        akar rumput.
                                    </p>

                                    <div className="space-y-4">
                                        <div className="flex items-start gap-3">
                                            <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[color:rgba(19,82,39,0.08)] text-[var(--app-primary)]">
                                                <Leaf className="h-4 w-4" />
                                            </div>
                                            <p>Edukasi praktik pertanian ramah lingkungan kepada pengunjung.</p>
                                        </div>

                                        <div className="flex items-start gap-3">
                                            <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[color:rgba(19,82,39,0.08)] text-[var(--app-primary)]">
                                                <Banknote className="h-4 w-4" />
                                            </div>
                                            <p>Distribusi pendapatan yang adil bagi pemilik kebun dan pemandu lokal.</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.45 }}
                                className="overflow-hidden rounded-[2rem] bg-white p-3 shadow-[0_16px_42px_rgba(27,28,25,0.08)] sm:rounded-[2.5rem] sm:p-4"
                            >
                                <img
                                    src={IMAGES.farmer}
                                    alt="Ilustrasi petani lokal"
                                    className="aspect-square w-full rounded-[1.5rem] object-cover sm:rounded-[2rem]"
                                    referrerPolicy="no-referrer"
                                />
                            </motion.div>
                        </div>
                    </section>

                    <section className="-mx-4 bg-[linear-gradient(180deg,rgba(248,248,246,0.95)_0%,rgba(245,245,242,1)_100%)] px-4 py-14 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 lg:py-20">
                        <div className="mx-auto max-w-5xl text-center">
                            <h2 className="text-3xl font-bold text-[var(--app-primary)] sm:text-4xl">Kecerdasan di Balik Panen</h2>
                            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[var(--app-text-muted)] sm:text-base">
                                Kami menggunakan data real-time untuk memastikan Anda tiba di waktu terbaik saat bunga mekar atau buah siap petik.
                            </p>
                        </div>

                        <div className="mx-auto mt-10 grid max-w-7xl gap-5 md:grid-cols-3 md:gap-6 lg:mt-14 lg:gap-8">
                            {intelligenceCards.map((card, index) => {
                                const Icon = card.icon;

                                return (
                                    <motion.div
                                        key={card.title}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.08, duration: 0.35 }}
                                        className="flex flex-col items-center gap-5 rounded-[1.75rem] bg-white px-6 py-8 text-center shadow-[0_12px_40px_-12px_rgba(0,0,0,0.08)] sm:rounded-[2rem] sm:px-8 sm:py-10"
                                    >
                                        <div className={`flex h-14 w-14 items-center justify-center rounded-full ${card.iconBgClassName}`}>
                                            <Icon className={`h-7 w-7 ${card.iconClassName}`} />
                                        </div>
                                        <div className="space-y-2">
                                            <h3 className="text-lg font-bold text-[var(--app-text)] sm:text-xl">{card.title}</h3>
                                            <p className="text-sm leading-relaxed text-[var(--app-text-muted)]">{card.description}</p>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </section>

                    <section>
                        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
                            <div className="space-y-6 md:space-y-8">
                                <h2 className="max-w-xl text-3xl font-bold leading-tight text-[var(--app-primary)] sm:text-4xl lg:text-5xl">
                                    Mengapa Batu Begitu Istimewa?
                                </h2>
                                <p className="max-w-xl text-sm leading-relaxed text-[var(--app-text-muted)] sm:text-base lg:text-lg">
                                    Terletak di ketinggian 700-1100 mdpl, Kota Batu memiliki tanah vulkanik yang kaya nutrisi dan iklim sejuk
                                    yang unik. Ini adalah salah satu kawasan terbaik untuk tumbuhnya apel, stroberi, jeruk, dan ragam
                                    agrowisata musiman lainnya.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
                                <motion.div whileHover={{ scale: 1.02 }} className="overflow-hidden rounded-[2rem] shadow-[0_18px_45px_rgba(27,28,25,0.12)] sm:mt-10">
                                    <img src={IMAGES.apple} alt="Kebun apel Batu" className="h-full w-full object-cover" />
                                </motion.div>
                                <motion.div whileHover={{ scale: 1.02 }} className="overflow-hidden rounded-[2rem] shadow-[0_18px_45px_rgba(27,28,25,0.12)] sm:mb-10">
                                    <img
                                        src={IMAGES.recommendation}
                                        alt="Rekomendasi spot wisata kebun"
                                        className="h-full w-full object-cover"
                                    />
                                </motion.div>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </MainLayout>
    );
}
